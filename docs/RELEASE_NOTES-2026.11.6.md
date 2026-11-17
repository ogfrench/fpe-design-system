## What's new in 2026.11.6

- Fix Claude hosted-plugin uploads by shipping a root `.claude-plugin/plugin.json`, one `fpe-design` skill, and supported text references only. Brand SVGs and CSS are retained as text references instead of unsupported package assets.
- Rename the Claude download to `fpe-design-system-v2026.11.6.zip` (without a `-claude` suffix). Preserve the existing `fpe-design-system` plugin identity.
- Add an archive-structure regression test and align the version, release checksums, and release workflow with the new filename.

## Evidence limits

The archive is verified locally and in CI for manifest path, text-only component layout, version parity, ZIP integrity and checksums. Actual upload and activation in the Claude host remain unverified until a consumer uploads this release.
