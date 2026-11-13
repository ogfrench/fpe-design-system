# FPE calendar versioning (CalVer)

FPE uses **`YYYY.M.RELEASE`**, a three-number form of CalVer that is also syntactically valid as a strict semantic version. For example, the first November 2026 release is **`2026.11.3`**, followed by `2026.11.4` for an additional release that same month. The first December 2026 release is `2026.12.1`. March 2027 is `2027.3.1`, **not** `2027.03.1`, because leading-zero numeric segments are rejected by SemVer-based plugin and npm parsers.

The final component is a **monthly release sequence**, not a patch indicator or a calendar day. A new year or month resets the sequence to 1. A publication must not reuse a released version. Tags use `vYYYY.M.RELEASE` and must refer to a reviewed source commit.

## Single release identity

The same version must appear in all of:

- `package.json`
- `tokens/fpe.tokens.json` (`#version`)
- `plugins/chatgpt/plugin.json`
- `plugins/claude/.claude-plugin/plugin.json`
- Generated source and plugin archive filenames
- The account-hosted ChatGPT plugin release **once published**

Use `npm run check` and `npm run package` to validate synchronization and generate artifacts before publication. The ChatGPT packaging tool may automatically bump a version when it is unchanged; explicit CalVer increments are mandatory to avoid accidental SemVer-style bumps. Publish only a monotonically increasing version.

## Compatibility and scope

Calendar versions identify **when** a coherent set of assets was released, not whether a consumer can safely upgrade. Because the date does not encode breaking changes, document them in a release note, including token renames, API changes, registry installation changes, and migrations. The shadcn, Next.js, Vite, Base UI, and Radix support matrix is independent of CalVer and must be tested for each release.

The first public release intentionally ships a documented **foundation** with locally verified responsive HTML, tokens, registry schema, package integrity, and accessible baseline. Clean-install Next.js/Vite compatibility, true hosted-font rendering, real-plugin host installation, and production Netlify deployment remain independent acceptance gates and are not claimed by a foundation release. Future releases need new version numbers and full integration tests before expanding compatibility claims.
