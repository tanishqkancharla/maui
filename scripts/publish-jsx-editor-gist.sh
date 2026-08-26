#!/usr/bin/env bash
# Publish (or update) the standalone JSX editor gist.
# Requires a token with gist scope: GH_GIST_TOKEN or gh auth.

set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
src="$root/src/apps/JsxEditor"
id_file="$root/src/apps/JsxEditor/GIST_ID"
desc="Standalone JSX playground editor (DesignSystemApi + adapter)"

files=(
	DesignSystemApi.ts
	JsxEditor.tsx
	PreviewIsland.tsx
	completions.ts
	editorTheme.ts
	evaluate.ts
	exampleAdapter.tsx
	keymaps.ts
	lint.ts
	prettify.ts
	previewOverlay.ts
	tagMatching.ts
	README.md
)

gh_cmd=(gh)
if [[ -n "${GH_GIST_TOKEN:-}" ]]; then
	gh_cmd=(env GH_TOKEN="$GH_GIST_TOKEN" gh)
fi

paths=()
for file in "${files[@]}"; do
	paths+=("$src/$file")
done

if [[ -f "$id_file" ]]; then
	gist_id="$(tr -d '[:space:]' < "$id_file")"
	echo "Updating gist $gist_id"
	"${gh_cmd[@]}" gist edit "$gist_id" "${paths[@]}"
	echo "https://gist.github.com/$gist_id"
	exit 0
fi

url="$("${gh_cmd[@]}" gist create --public -d "$desc" "${paths[@]}")"
echo "$url"
gist_id="${url##*/}"
printf '%s\n' "$gist_id" > "$id_file"
echo "Wrote $id_file"
