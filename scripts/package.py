"""Package the FPE source and standalone Claude/ChatGPT skills plugins."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
import os

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'out'
OUT.mkdir(exist_ok=True)
EXCLUDE = {'dist', 'out', '__pycache__', '.git', 'node_modules'}

def source_files():
    for path in sorted(ROOT.rglob('*')):
        if any(part in EXCLUDE for part in path.relative_to(ROOT).parts):
            continue
        if path.is_symlink():
            raise ValueError(f'Symlinked package entry is not permitted: {path}')
        if not path.is_file():
            continue
        if path.suffix in {'.zip', '.pyc', '.png'}:
            continue
        yield path


def pack(name, entries):
    dest = OUT / name
    with ZipFile(dest, 'w', ZIP_DEFLATED) as archive:
        for arcname, data in entries:
            archive.writestr(arcname, data)
    with ZipFile(dest) as archive:
        bad = archive.testzip()
        assert bad is None, f'Invalid ZIP entry {bad}'
    print(f'{dest.name}: {dest.stat().st_size} bytes, {len(entries)} files')
    return dest

version = json.loads((ROOT / 'package.json').read_text())['version']
source = [(str(path.relative_to(ROOT)), path.read_bytes()) for path in source_files()]
pack(f'fpe-design-system-source-v{version}.zip', source)
claude = []
for path in (ROOT / 'plugins/claude').rglob('*'):
    if path.is_symlink():
        raise ValueError(f'Symlinked Claude plugin entry: {path}')
    if path.suffix == '.png':
        continue
    if path.is_file():
        claude.append((str(path.relative_to(ROOT / 'plugins/claude')), path.read_bytes()))
for name, data in source:
    if name == 'tokens/fpe.tokens.json' or name.startswith('css/') or name.startswith('assets/brand/') or name.startswith('docs/'):
        claude.append(('skills/fpe-design/references/' + name, data))
pack(f'fpe-claude-v{version}.zip', sorted(claude))
chatgpt = []
for path in (ROOT / 'plugins/chatgpt').rglob('*'):
    if path.is_symlink():
        raise ValueError(f'Symlinked ChatGPT plugin entry: {path}')
    if path.suffix == '.png':
        continue
    if path.is_file():
        chatgpt.append((str(path.relative_to(ROOT / 'plugins/chatgpt')), path.read_bytes()))
for name, data in source:
    if name.startswith('plugins/'):
        continue
    chatgpt.append(('skills/fpe-design/references/source/' + name, data))
pack(f'fpe-chatgpt-v{version}.zip', sorted(chatgpt))

from hashlib import sha256
artifacts = [OUT / f'fpe-design-system-source-v{version}.zip', OUT / f'fpe-claude-v{version}.zip', OUT / f'fpe-chatgpt-v{version}.zip']
checksum_path = OUT / f'SHA256SUMS-{version}.txt'
checksum_path.write_text(''.join(f'{sha256(item.read_bytes()).hexdigest()}  {item.name}\n' for item in artifacts))
print(f'{checksum_path.name}: SHA256 for {len(artifacts)} release assets')
