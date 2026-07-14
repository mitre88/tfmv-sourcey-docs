---
name: validate-tfmv-sourcey-output
description: Validate the pinned Sourcey-generated tfmv llms.txt and seal the result in a runx receipt.
source:
  type: cli-tool
  command: node
  args:
    - validate.mjs
  timeout_seconds: 30
  sandbox:
    profile: readonly
    cwd_policy: skill-directory
inputs:
  dist_dir:
    type: string
    required: true
    description: Path to the generated Sourcey output, relative to this skill.
  expected_sha256:
    type: string
    required: true
    description: Expected SHA-256 digest of llms.txt.
runx:
  input_resolution:
    required:
      - dist_dir
      - expected_sha256
  artifacts:
    named_emits:
      validation: validation
---

Validate the generated file digest and ensure every llms.txt entry resolves to
a file in the Sourcey output. The runner emits only public validation facts.
