# Agent engineering entrypoint

Start at the [FPE Product Passport](docs/product-passport/README.md). Verify all pointers against the actual source, generated outputs, tests and current release configuration.

The [DUNE Engineering handbook](https://github.com/ogfrench/agentic-coding-setup/blob/main/docs/dune.md) and [Agentic Workflow plugin](https://github.com/ogfrench/agentic-coding-setup/tree/main/plugins/agent-workflow) provide the engineering method, not installed privileges or a second architecture.

## FPE paved path

1. Choose the owning capability: token generation, static reference UI, shadcn registry, branded React compositions, plugin packaging or release.
2. Inspect source and consumers before modifying. Tokens are canonical in `tokens/fpe.tokens.json`; `scripts/build.mjs` generates derived assets. shadcn/ui owns interactive primitives, not this library.
3. Make the narrowest correct change. Add or update relevant coverage in `tests/system.test.mjs`. Run `npm run check`; for package changes run `npm run package` and verify archives/checksums.
4. Review the real browser output for HTML, mobile, dark/light, keyboard and motion changes. Consumer Next.js/Vite and Claude/ChatGPT host acceptance are separate; report them as `not_run` unless performed.
5. Reconcile the relevant passport record with actual source, exact SHA and evidence, or state `map unchanged` with reason. The PR is the sole live checklist. Report implemented, tested, deployed and released as separate states.

## Non-negotiable boundaries

Preserve brand-asset rights, source-derived CSS/registry parity and the existing release workflow safeguards. Do not introduce parallel shadcn primitives, solid-fuchsia UI fills or unauthorized proprietary fonts. The GitHub release workflow publishes the version in `package.json` on each merge to `main`, and refuses to overwrite an existing tag. A version bump merged to `main` is a release: bump only for an intended release, and do not bypass its tag/asset checks or assume plugin installation from a source merge.
