# FPE Claude Plugin

Portable Claude Code plugin with one FPE-branded design skill. No MCP server, hooks, executables or third-party runtime dependencies.

Install or test locally with `claude --plugin-dir ./plugins/claude` from a checkout of the repository. Use the downloadable package as supported by your Claude client. The `skills/fpe-design/SKILL.md` instructions refer to canonical FPE tokens and brand assets in the repository.

The plugin contains brand guidance and is not a vector/renderer replacement. It cannot validate a design by itself without access to the relevant project and screenshots.

## Brand icon

The plugin includes `assets/fpe-icon-dark.svg` (white FPE monogram on black) for the directory listing, with a light equivalent and editable SVG masters. The manifest points to the dark SVG. Claude Code may ignore directory icon metadata outside the supported listing surfaces.
