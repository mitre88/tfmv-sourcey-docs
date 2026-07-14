import { createHash } from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

const skillDir = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(skillDir, process.env.RUNX_INPUT_DIST_DIR ?? "")
const expectedSha256 = process.env.RUNX_INPUT_EXPECTED_SHA256 ?? ""
const llmsPath = resolve(distDir, "llms.txt")

if (!existsSync(llmsPath)) {
  throw new Error(`Missing generated file: ${llmsPath}`)
}

const contents = readFileSync(llmsPath, "utf8")
const sha256 = createHash("sha256").update(contents).digest("hex")

if (sha256 !== expectedSha256) {
  throw new Error(`Digest mismatch: expected ${expectedSha256}, got ${sha256}`)
}

const links = [...contents.matchAll(/^- \[[^\]]+\]\(([^)]+)\)/gm)].map(
  (match) => match[1],
)

if (links.length < 5) {
  throw new Error(`Expected at least five entries, found ${links.length}`)
}

const prefix = "/tfmv-sourcey-docs/"
for (const link of links) {
  if (!link.startsWith(prefix)) {
    throw new Error(`Unexpected llms.txt link: ${link}`)
  }

  const target = resolve(distDir, link.slice(prefix.length))
  if (!target.startsWith(`${distDir}${sep}`) || !existsSync(target)) {
    throw new Error(`Missing generated target for ${link}`)
  }
}

process.stdout.write(
  `${JSON.stringify({
    validation: {
      project: "https://github.com/suzuki-shunsuke/tfmv",
      pinned_commit: "4ca60e60ae57983f57474f77ac294952279ef783",
      sourcey_version: "3.6.5",
      sha256,
      entry_count: links.length,
      all_targets_exist: true,
    },
  })}\n`,
)
