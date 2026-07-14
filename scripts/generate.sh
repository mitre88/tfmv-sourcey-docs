#!/bin/sh
set -eu

project_repo="https://github.com/suzuki-shunsuke/tfmv.git"
project_commit="4ca60e60ae57983f57474f77ac294952279ef783"
root_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
checkout_dir=$(mktemp -d "${TMPDIR:-/tmp}/tfmv-sourcey.XXXXXX")

cleanup() {
  rm -rf "$checkout_dir"
}
trap cleanup EXIT HUP INT TERM

git -C "$checkout_dir" init --quiet
git -C "$checkout_dir" remote add origin "$project_repo"
git -C "$checkout_dir" fetch --quiet --depth 1 origin "$project_commit"
git -C "$checkout_dir" checkout --quiet --detach FETCH_HEAD

cd "$root_dir"
TFMV_SOURCE_DIR="$checkout_dir" npm run build
