import { resolve } from "node:path"
import { defineConfig, godoc } from "sourcey"

const sourceDir = process.env.TFMV_SOURCE_DIR

if (!sourceDir) {
  throw new Error("TFMV_SOURCE_DIR must point to the pinned tfmv checkout")
}

export default defineConfig({
  name: "tfmv",
  siteUrl: "https://mitre88.github.io",
  baseUrl: "/tfmv-sourcey-docs",
  repo: "https://github.com/suzuki-shunsuke/tfmv",
  editBranch: "main",
  navigation: {
    tabs: [
      {
        tab: "Go API",
        slug: "api",
        source: godoc({
          module: resolve(sourceDir),
          packages: ["./..."],
          mode: "live",
          includeTests: true,
        }),
      },
    ],
  },
})
