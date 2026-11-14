import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const token = JSON.parse(read('tokens/fpe.tokens.json'));
const registry = JSON.parse(read('registry.json'));
const color = (v) => v.$value.startsWith('{color.') ? token.color[v.$value.slice(7,-1)].$value : v.$value;
const luminance = (hex) => {
  const components = [1,3,5].map((i) => parseInt(hex.slice(i,i+2),16)/255);
  const linear = components.map((v) => v <= 0.04045 ? v/12.92 : ((v+0.055)/1.055)**2.4);
  return linear[0]*0.2126 + linear[1]*0.7152 + linear[2]*0.0722;
};
const ratio = (a,b) => (Math.max(luminance(a),luminance(b))+0.05)/(Math.min(luminance(a),luminance(b))+0.05);
test('semantic themes have identical roles and WCAG AA primary-action contrast', () => {
  assert.deepEqual(Object.keys(token.semantic.light).sort(),Object.keys(token.semantic.dark).sort());
  for (const mode of ['light','dark']) {
    const v = token.semantic[mode];
    assert.ok(ratio(color(v.primary),color(v['primary-foreground']))>=4.5,`${mode} primary text contrast`);
    assert.ok(ratio(color(v.background),color(v.foreground))>=4.5,`${mode} page text contrast`);
    assert.ok(ratio(color(v.background),color(v['muted-foreground']))>=4.5,`${mode} muted text contrast`);
  }
});
test('generated CSS exposes all 32 semantic roles in light and dark',()=>{
  const css=read('css/fpe-theme.css');
  for(const [mode,colors] of Object.entries(token.semantic)) {
    for(const [name,value] of Object.entries(colors)) assert.ok(css.includes(`--${name}: ${color(value).toUpperCase()}`),`${mode}: ${name}`);
  }
  assert.ok(css.includes('@theme inline'));
  assert.ok(css.includes('--color-background: var(--background)'));
  assert.ok(css.includes('--color-sidebar-ring: var(--sidebar-ring)'));
});
test('all logo variants have one common path, no stroke and correct color',()=>{
  const src=['fpe-mark.svg','fpe-mark-white.svg','fpe-mark-black.svg'].map(n=>read(`assets/brand/${n}`));
  const paths=src.map(s=>s.match(/ d="([^"]+)"\s*\/>/)?.[1]);
  assert.ok(paths.every(Boolean));
  assert.equal(new Set(paths).size,1);
  assert.ok(src.every(s=>s.includes('fill-rule="evenodd"')));
  assert.ok(src.every(s=>!s.includes('<line')&&!s.includes('stroke=')));
  assert.ok(src[0].includes('#F23D9F'));assert.ok(src[1].includes('#FFFFFF'));assert.ok(src[2].includes('#000000'));
});
test('all GitHub registry source files exist and types match',()=>{
  assert.equal(registry.name,'fpe-design-system');
  assert.equal(new Set(registry.items.map(x=>x.name)).size,registry.items.length);
  assert.deepEqual(registry.items.map(x=>x.name),['fpe-theme','fpe-logo','fpe-hero']);
  assert.equal(registry.items[0].type,'registry:theme');
  for (const item of registry.items) {
    for (const file of item.files||[]) assert.ok(existsSync(new URL(`../${file.path}`,import.meta.url)),file.path);
    const generated=JSON.parse(read(`dist/r/${item.name}.json`));
    assert.equal(generated.name,item.name);
    assert.ok(generated.files?.every(f=>typeof f.content==='string')??true);
  }
});
test('offline HTML embeds styles, behavior and three SVG colors',()=>{
  const html=read('dist/offline.html');
  assert.ok(html.includes('id="theme-toggle"'));
  assert.ok(html.includes('id="main"'));
  assert.ok(html.includes('data:image/svg+xml;base64,'));
  assert.ok(html.includes('navigator.clipboard.writeText'));
  assert.ok(!html.includes('src="app.js"'));
  assert.ok(!html.includes('href="styles.css"'));
});
test('reduced motion, semantic interaction and security build files exist',()=>{
  assert.match(read('css/fpe-motion.css'),/prefers-reduced-motion:\s*reduce/);
  assert.match(read('site/styles.css'),/prefers-reduced-motion:\s*reduce/);
  assert.match(read('site/index.html'),/class="skip-link"/);
  assert.match(read('site/index.html'),/aria-live="polite"/);
  assert.match(read('netlify.toml'),/Content-Security-Policy/);
  assert.match(read('netlify.toml'),/publish = "dist"/);
});
test('ChatGPT and Claude packages expose the same named FPE skill',()=>{
  const a=read('plugins/claude/skills/fpe-design/SKILL.md');
  const b=read('plugins/chatgpt/skills/fpe-design/SKILL.md');
  assert.equal(a,b);
  assert.ok(a.startsWith('---\nname: fpe-design\n'));
  assert.equal(JSON.parse(read('plugins/chatgpt/plugin.json')).name,'fpe-design-system');
  assert.equal(JSON.parse(read('plugins/claude/.claude-plugin/plugin.json')).name,'fpe-design-system');
});

test('Claude and ChatGPT plugins use the canonical FPE monogram in appropriate light/dark assets',()=>{
  const master = read('assets/brand/fpe-mark.svg').match(/ d="([^"]+)"\s*\/>/)?.[1];
  assert.ok(master);
  const cgpt = JSON.parse(read('plugins/chatgpt/plugin.json'));
  const claude = JSON.parse(read('plugins/claude/.claude-plugin/plugin.json'));
  const rootVersion = JSON.parse(read('package.json')).version;
  assert.equal(cgpt.version, rootVersion);
  assert.equal(claude.version, rootVersion);
  assert.equal(claude.icon, './assets/fpe-icon-dark.svg');
  const ui = cgpt.extensions['com.openai'].interface;
  for (const [prop, name, bg, fg] of [
    ['logo', 'fpe-icon-light', '#FFFFFF', '#000000'],
    ['logoDark', 'fpe-icon-dark', '#000000', '#FFFFFF'],
    ['composerIcon', 'fpe-icon-light', '#FFFFFF', '#000000'],
    ['composerIconDark', 'fpe-icon-dark', '#000000', '#FFFFFF']
  ]) {
    assert.equal(ui[prop], `./assets/${name}.svg`);
    for (const dir of ['chatgpt', 'claude']) {
      const svg = read(`plugins/${dir}/assets/${name}.svg`);
      assert.ok(svg.includes(`d="${master}"`), `${dir}/${name} geometry`);
      assert.ok(svg.includes(`fill="${bg}"`), `${dir}/${name} background`);
      assert.ok(svg.includes(`fill="${fg}"`), `${dir}/${name} foreground`);
    }
  }
  assert.equal(claude.icon, './assets/fpe-icon-dark.svg');
});

test('CalVer is synchronized across root, tokens and both plugin manifests',()=>{
  const pkg=JSON.parse(read('package.json'));
  const claude=JSON.parse(read('plugins/claude/.claude-plugin/plugin.json'));
  const chatgpt=JSON.parse(read('plugins/chatgpt/plugin.json'));
  const v=pkg.version;
  const match=/^(20\d{2})\.(1[0-2]|[1-9])\.([1-9]\d*)$/.exec(v);
  assert.ok(match, `Expected YYYY.M.RELEASE without zero-padding: ${v}`);
  assert.equal(token['#version'], v);
  assert.equal(claude.version,v);
  assert.equal(chatgpt.version,v);
  assert.match(read('docs/versioning.md'),/YYYY\.M\.RELEASE/);
  assert.ok(read('site/index.html').includes(`<meta name="fpe-version" content="${v}" />`), 'Website metadata version must match CalVer');
});

test('FPE digital identity uses fuchsia, black and white without legacy accent colors', () => {
  const html = read('site/index.html');
  const styles = read('site/styles.css');
  const theme = read('css/fpe-theme.css');
  const skill = read('plugins/chatgpt/skills/fpe-design/SKILL.md');
  const colors = token.color;
  for (const legacy of ['mint', 'mint-soft', 'mint-deep', 'lime', 'cloud', 'ink-raised']) {
    assert.ok(!(legacy in colors), `Legacy ${legacy} must not be in FPE digital palette`);
  }
  assert.equal(colors.ink.$value, '#000000');
  assert.equal(colors.paper.$value, '#FFFFFF');
  assert.equal(colors.pink.$value, '#F23D9F');
  assert.ok(!/mint|lime/i.test(html + styles + theme + skill));
  assert.ok(!/eyebrow|art-ring|art-coordinate|terminal-dots|ticker|readiness/i.test(html));
  assert.match(styles, /background: var\(--fpe-gradient-brand\)/);
  assert.match(theme, /--fpe-gradient-brand: linear-gradient\(/);
  assert.ok(styles.includes('.hero-preview {'));
  assert.ok(!styles.includes('clip-path:polygon('));
  assert.equal(token.radius.base.$value, '4px');
  assert.equal(registry.items[0].cssVars.theme.radius, '4px');
});


test('IBM Plex loads explicitly and display typography remains readable', () => {
  const html = read('site/index.html');
  const css = read('site/styles.css');
  const config = read('netlify.toml');
  assert.match(html, /fonts\.googleapis\.com\/css2\?family=IBM\+Plex\+Mono/);
  assert.match(html, /family=IBM\+Plex\+Sans/);
  assert.match(config, /font-src 'self' https:\/{2}fonts\.gstatic\.com/);
  assert.match(css, /h1 \{[^}]*line-height: var\(--fpe-leading-display\)/);
  assert.match(css, /\.section-heading h2 \{[^}]*line-height: var\(--fpe-leading-heading\)/);
  assert.doesNotMatch(css, /letter-spacing:\s*-(?:\.07|\.08|\.09|\.1)\d*em/);
  assert.doesNotMatch(html, /<h[12][^>]*>[^<]*<br\s*\/?>(?![\s\S]*$)/);
  assert.match(html, /id="preview-action"/);
  assert.match(html, /href="#components">View components<\/a>/);
});

test('FPE typography tokens are applied consistently to HTML and shadcn React specimens', () => {
  const source = read('site/styles.css');
  const generated = read('css/fpe-theme.css');
  const hero = read('registry/fpe-hero.tsx');
  for (const type of ['display', 'heading', 'subheading', 'body']) {
    assert.ok(generated.includes(`--fpe-size-${type}: ${token.typography.size[type].$value};`));
    assert.ok(generated.includes(`--fpe-weight-${type}: ${token.typography.weight[type].$value};`));
    const tracking = token.typography.tracking[type].$value;
    const leading = token.typography.leading[type].$value;
    assert.ok(generated.includes(`--fpe-tracking-${type}: ${tracking};`));
    assert.ok(generated.includes(`--fpe-leading-${type}: ${leading};`));
  }
  assert.match(source, /font-kerning: normal/);
  assert.match(source, /h1 \{[^}]*letter-spacing: var\(--fpe-tracking-display\)/);
  assert.match(source, /\.section-heading h2 \{[^}]*letter-spacing: var\(--fpe-tracking-heading\)/);
  assert.match(hero, /leading-\[1\.13\]/);
  assert.match(hero, /tracking-\[-\.02em\]/);
  assert.ok(existsSync(new URL('../docs/typography.md', import.meta.url)));
});

test('every generated FPE page carries the correctly matched monochrome François credit', () => {
  const master = read('assets/brand/fpe-mark.svg').match(/ d="([^"]+)"\s*\/>/)?.[1];
  const page = read('site/index.html');
  const offline = read('dist/offline.html');
  const component = read('registry/fpe-logo.tsx');
  for (const html of [page, read('dist/index.html'), offline]) {
    assert.match(html, /<footer class="site-footer section-wrap"><span class="design-credit">Designed by François<svg/);
    assert.doesNotMatch(html, /class="footer-brand"|DESIGN SYSTEM 2026\.11\.1<\/span>/);
    assert.match(html, /class="design-credit-mark"/);
    assert.ok(html.includes(`d="${master}"`), 'Credit uses the canonical brand geometry');
    assert.match(html, /fill="currentColor"/);
  }
  const footerStyles = read('site/styles.css');
  assert.match(footerStyles, /\.design-credit \{[^}]*align-items: baseline;/);
  assert.match(footerStyles, /\.design-credit-mark \{[^}]*height: 9px;/);
  assert.match(footerStyles, /\.design-credit-mark \{[^}]*fill: currentColor;/);
  assert.match(component, /inline-flex items-baseline/);
  assert.match(component, /h-\[9px\]/);
  assert.match(component, /export function FpeCredit/);
  assert.match(component, /variant === "inherit" \? "currentColor"/);
  assert.match(component, /Designed by François/);
  assert.doesNotMatch(component, /<span[^>]*>\s*François\s*<\/span>/);
  assert.match(read('docs/typography.md'), /Designed by François/);
});

test('Claude and ChatGPT design guidance includes consistent IBM Plex and FPE credit rules', () => {
  const a=read('plugins/claude/skills/fpe-design/SKILL.md');
  const b=read('plugins/chatgpt/skills/fpe-design/SKILL.md');
  assert.equal(a,b);
  assert.match(a,/Designed by François/);
  assert.match(a,/currentColor/);
  assert.match(a,/IBM Plex Sans/);
  assert.match(a,/tokens\/fpe\.tokens\.json/);
});


test('FPE branding uses accessible gradients, never a flat fuchsia fill',()=>{
  const source = read('site/styles.css');
  const html = read('site/index.html');
  const built = read('css/fpe-theme.css');
  const react = read('registry/fpe-hero.tsx');
  const logo = read('assets/brand/fpe-mark-gradient.svg');
  const orig = read('assets/brand/fpe-mark.svg');
  for (const name of ['brand','brand-hover','hero','ink-light','ink-dark']) {
    assert.ok(token.gradient[name], name);
    assert.ok(built.includes(`--fpe-gradient-${name}: linear-gradient(`), name);
  }
  for (const mode of ['light','dark']) {
    const primary = color(token.semantic[mode].primary);
    assert.notEqual(primary, '#F23D9F');
    assert.ok(ratio(primary,color(token.semantic[mode]['primary-foreground'])) >= 4.5);
  }
  const hexStops = (name) => [...token.gradient[name].$value.matchAll(/\{color\.([\w-]+)\}/g)].map((m) => token.color[m[1]].$value);
  for (const stop of hexStops('brand')) assert.ok(ratio('#000000',stop) >= 4.5, `black text vs ${stop}`);
  for (const stop of hexStops('ink-light')) assert.ok(ratio('#FFFFFF',stop) >= 4.5, `light background text vs ${stop}`);
  for (const stop of hexStops('ink-dark')) assert.ok(ratio('#000000',stop) >= 4.5, `dark background text vs ${stop}`);
  for (const stop of hexStops('hero')) assert.ok(ratio('#FFFFFF',stop) >= 4.5, `white logo/caption vs ${stop}`);
  assert.ok(!source.includes('background: var(--fpe-pink)'));
  assert.ok(!source.includes('color: var(--fpe-pink)'));
  assert.ok(!source.includes('accent-color: var(--fpe-pink)'));
  assert.ok(!html.includes('style="--swatch:var(--fpe-pink)"'));
  assert.match(html, /fpe-mark-gradient\.svg/);
  assert.ok(logo.includes(orig.match(/ d="([^"]+)"\s*\/>/)?.[1]));
  assert.match(react, /--fpe-gradient-brand/);
  const cssRule = registry.items[0].css?.['@layer base']?.[':root'];
  assert.ok(cssRule);
  for (const [name, obj] of Object.entries(token.gradient)) {
    const expanded=obj.$value.replace(/\{color\.([\w-]+)\}/g,(_,key)=>token.color[key].$value);
    assert.equal(cssRule[`--fpe-gradient-${name}`],expanded,`registry:${name}`);
  }
  assert.match(html, /rel="icon" href="assets\/brand\/fpe-mark-gradient\.svg"/);
  assert.equal(read('plugins/chatgpt/skills/fpe-design/SKILL.md'),read('plugins/claude/skills/fpe-design/SKILL.md'));
});

test('approved primary actions use a real gradient keyline, not a filled gradient', () => {
  const css = read('site/styles.css');
  const hero = read('registry/fpe-hero.tsx');
  const docs = read('docs/accessibility.md');
  assert.match(css, /\.button-primary \{[^}]*linear-gradient\(var\(--background\), var\(--background\)\) padding-box, var\(--fpe-gradient-brand\) border-box/);
  assert.match(css, /\.button-primary:hover \{[^}]*linear-gradient\(var\(--card\), var\(--card\)\) padding-box/);
  assert.match(css, /\.button-primary > \[aria-hidden="true"\] \{[^}]*background: var\(--fpe-gradient-brand\)/);
  assert.doesNotMatch(css, /\.button-primary::after \{/);
  assert.match(hero, /linear-gradient\(var\(--background\), var\(--background\)\) padding-box/);
  assert.match(hero, /border-transparent/);
  assert.match(docs, /1px perimeter/);
});
