# tfmv Sourcey documentation evidence

This repository reproduces the Sourcey-generated Go API documentation and
`llms.txt` proposed for [suzuki-shunsuke/tfmv](https://github.com/suzuki-shunsuke/tfmv).

- Target commit: `4ca60e60ae57983f57474f77ac294952279ef783`
- Sourcey version: `3.6.5`
- `llms.txt` SHA-256: `048f8143d93a266dabb4dfa8bafdd51513903ea8b2c499e5061e6a16e5bd40a3`
- runx CLI: `runx-cli 0.7.0`
- Receipt: `runx:receipt:sha256:18aef29e3622385415d2b7beebfb04f3eb275a430e5ceb33dbe28fb43b94735a`

## Reproduce

```sh
npm ci --ignore-scripts
npm run generate
shasum -a 256 dist/llms.txt
```

The generator checks out the pinned upstream commit in a temporary directory,
runs Sourcey in live godoc mode, and removes the temporary checkout afterward.
The public site is published from the resulting `dist/` directory.

## Validate

```sh
runx skill ./validation-skill \
  -i dist_dir=../dist \
  -i expected_sha256=048f8143d93a266dabb4dfa8bafdd51513903ea8b2c499e5061e6a16e5bd40a3 \
  --json
```

The validation skill checks the digest, requires at least five entries, and
verifies that every `llms.txt` entry resolves to a generated page.
