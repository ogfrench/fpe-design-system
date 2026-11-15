## What's new in 2026.11.5

- Source and design components: no intended runtime behavior changes from v2026.11.4. Remove redundant explanatory comments and enforce the repo's code-first source policy.
- Product Passport: retain a short ownership and verification map without a stale progress ledger.
- Release correctness: a new main commit cannot report a successful publication for an older release tag. Existing-tag reruns pass only if the tag points to the exact commit and all four expected assets are present.
- Both Claude and ChatGPT ZIPs, the source archive and checksums will be built from the same reviewed commit.

## Evidence limits

Automated source build, package structure and tests are release checks. No new claim of independent Next.js/Vite consumer installation, live responsive browser acceptance, hosted deployment or actual Claude/ChatGPT plugin-host activation.
