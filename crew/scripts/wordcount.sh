#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"

count_file() {
  local file="$1"
  wc -w <"$file" | tr -d ' '
}

section() {
  local dir="$1"
  local label="$2"
  echo "## ${label}"
  if [[ ! -d "$dir" ]]; then
    echo "(missing ${dir})"
    echo
    return
  fi
  local found=0
  local total=0
  shopt -s nullglob
  local files=("$dir"/*)
  shopt -u nullglob
  if [[ ${#files[@]} -eq 0 ]]; then
    echo "(empty)"
    echo
    return
  fi
  for file in "${files[@]}"; do
    [[ -f "$file" ]] || continue
    [[ "$(basename "$file")" == .gitkeep ]] && continue
    found=1
    local n
    n="$(count_file "$file")"
    total=$((total + n))
    printf '%6s  %s\n' "$n" "${file#"$root"/}"
  done
  if [[ "$found" -eq 0 ]]; then
    echo "(empty)"
  else
    printf '%6s  TOTAL\n' "$total"
  fi
  echo
}

echo "# crew word counts"
echo
section "$root/profiles" "profiles"
section "$root/skills" "skills"
section "$root/shared" "shared"
if [[ -f "$root/proposed-shared.md" ]]; then
  printf '%6s  %s\n' "$(count_file "$root/proposed-shared.md")" "crew/proposed-shared.md"
fi
