# tfmv Sourcey llms.txt delivery report

- The target is [suzuki-shunsuke/tfmv](https://github.com/suzuki-shunsuke/tfmv), a maintained CLI used to rename Terraform resources and generate moved blocks; an `llms.txt` gives coding agents a concise map of its real Go API.
- Sourcey `3.6.5` generated the index from pinned upstream commit `4ca60e60ae57983f57474f77ac294952279ef783`; the file was not hand-written.
- The reproducible command is `npm ci --ignore-scripts && npm run generate`, with the pinned checkout and Sourcey configuration committed in the evidence repository.
- Two independent clean generations produced the same `llms.txt` SHA-256, `048f8143d93a266dabb4dfa8bafdd51513903ea8b2c499e5061e6a16e5bd40a3`.
- The public artifact is live at <https://mitre88.github.io/tfmv-sourcey-docs/llms.txt> and contains eight generated entries.
- The upstream adoption PR is open at <https://github.com/suzuki-shunsuke/tfmv/pull/675>; it adds a maintainer-facing link without changing runtime code or dependencies.
- The governed validation used `runx-cli 0.7.0` and sealed receipt `runx:receipt:sha256:18aef29e3622385415d2b7beebfb04f3eb275a430e5ceb33dbe28fb43b94735a`.
- The validation skill verified the expected digest, required at least five entries, and confirmed that all eight entries resolve to generated files.
- Public audit: `cmd/tfmv`, `pkg/apply`, `pkg/cli`, `pkg/controller`, and `pkg/domain` each map to the corresponding real source package and returned HTTP 200 from the published site.
- The authenticated claimant account `mitre88` currently stars `sourcey/sourcey`, confirmed through GitHub's machine-readable GraphQL state.
