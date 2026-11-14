## What's new in 2026.11.4

Footer credit alignment: the 9px FPE monogram in "Designed by François" now sits on the text baseline, in both the registry `FpeCredit` component and the site footer.

Documentation: the Product Passport map, compatibility matrix and versioning notes now separate published archives from consumer and host acceptance. Nothing in this release adds a consumer-tested or host-installed claim.

Release process: the release workflow reads the version from `package.json` rather than a pin, and still refuses to overwrite an existing tag.

## Not claimed by this release

- Clean-install Next.js or Vite compatibility: not yet consumer-tested (see the compatibility matrix).
- Claude or ChatGPT installation and task acceptance: unverified in any assistant host.
