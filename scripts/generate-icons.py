#!/usr/bin/env python3
"""Convert a folder of 24×24 SVGs into tree-shakeable Maui icon modules."""

from __future__ import annotations

import argparse
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ATTR_MAP = {
	"stroke-linecap": "strokeLinecap",
	"stroke-linejoin": "strokeLinejoin",
	"stroke-width": "strokeWidth",
	"fill-rule": "fillRule",
	"clip-rule": "clipRule",
	"clip-path": "clipPath",
	"stroke-miterlimit": "strokeMiterlimit",
	"stroke-dasharray": "strokeDasharray",
	"stroke-dashoffset": "strokeDashoffset",
	"font-size": "fontSize",
	"font-family": "fontFamily",
	"font-weight": "fontWeight",
	"text-anchor": "textAnchor",
	"xml:space": "xmlSpace",
	"class": "className",
}

NUMERIC_ATTRS = {
	"strokeWidth",
	"width",
	"height",
	"x",
	"y",
	"cx",
	"cy",
	"r",
	"rx",
	"ry",
	"opacity",
	"fillOpacity",
	"strokeOpacity",
	"strokeMiterlimit",
}

COLOR_REPLACE = {
	"#141414": "currentColor",
	"#000": "currentColor",
	"#000000": "currentColor",
	"black": "currentColor",
	"#currentColor": "currentColor",
	"currentCollor": "currentColor",
}

# Root barrel already exports these component names.
ROOT_COLLISIONS = {
	"Badge",
	"Blockquote",
	"Code",
	"H1",
	"H2",
	"H3",
	"Link",
	"Menu",
	"Padding",
	"SearchField",
	"Switch",
	"Text",
}

HAND_WRITTEN = {"CircleX", "createIcon"}


def pascal_case(stem: str) -> str:
	parts = re.split(r"[-_]+", stem)
	out = "".join(part[:1].upper() + part[1:] for part in parts if part)
	if not out:
		raise ValueError(f"empty icon name from {stem!r}")
	if out[0].isdigit():
		out = "Icon" + out
	if not re.match(r"^[A-Za-z_$][\w$]*$", out):
		raise ValueError(f"invalid identifier {out!r} from {stem!r}")
	return out


def local_name(tag: str) -> str:
	if tag.startswith("{"):
		return tag.split("}", 1)[1]
	return tag


def rewrite_ids(xml_text: str, name: str) -> str:
	ids = re.findall(r'\bid="([^"]+)"', xml_text)
	for old in ids:
		new = re.sub(r"[^A-Za-z0-9_-]", "_", f"{name}_{old}")
		xml_text = xml_text.replace(f'id="{old}"', f'id="{new}"')
		xml_text = xml_text.replace(f"url(#{old})", f"url(#{new})")
	return xml_text


def jsx_attr(key: str, value: str, *, keep_white: bool) -> str | None:
	key = ATTR_MAP.get(key, key)
	if key == "xmlns" or key.startswith("xmlns"):
		return None
	if key in {"fill", "stroke", "color"}:
		if not (keep_white and value == "white"):
			value = COLOR_REPLACE.get(value, value)
	if key in NUMERIC_ATTRS and re.fullmatch(r"-?\d+(\.\d+)?", value):
		return f"{key}={{{value}}}"
	escaped = value.replace("\\", "\\\\").replace('"', '\\"')
	return f'{key}="{escaped}"'


def to_jsx(
	el: ET.Element,
	indent: int,
	*,
	is_svg_root: bool = False,
	in_clip: bool = False,
) -> str:
	tag = local_name(el.tag)
	in_clip = in_clip or tag == "clipPath"
	attrs: list[str] = []
	for raw_key, value in el.attrib.items():
		key = local_name(raw_key)
		keep_white = in_clip and tag == "rect"
		attr = jsx_attr(key, value, keep_white=keep_white)
		if attr:
			attrs.append(attr)
	if is_svg_root:
		attrs = [
			attr
			for attr in attrs
			if not attr.startswith("width=") and not attr.startswith("height=")
		]
		attrs = [
			'focusable="false"',
			'aria-hidden="true"',
			'role="img"',
			*attrs,
			"{...props}",
		]
	attr_str = f" {' '.join(attrs)}" if attrs else ""
	children = list(el)
	text = (el.text or "").strip()
	pad = "\t" * indent
	if not children and not text:
		return f"{pad}<{tag}{attr_str} />"
	inner: list[str] = []
	if text:
		inner.append(f"{pad}\t{text}")
	for child in children:
		inner.append(to_jsx(child, indent + 1, in_clip=in_clip))
	return f"{pad}<{tag}{attr_str}>\n" + "\n".join(inner) + f"\n{pad}</{tag}>"


def icon_module(name: str, svg_jsx: str) -> str:
	return (
		'import { createIcon } from "./createIcon"\n'
		"\n"
		f"export const {name} = createIcon({name!r}, function {name}(props) {{\n"
		"\treturn (\n"
		f"{svg_jsx}\n"
		"\t)\n"
		"})\n"
	)


def write_barrels(out_dir: Path, names: list[str]) -> None:
	lines = [
		"/** Tree-shakeable named icon exports. Prefer these over `Icons`. */",
		'export { CircleX } from "./CircleX"',
		'export { Mail as Envelope } from "./Mail"',
	]
	root_lines = [
		"/** Named exports safe to re-export from the package root. */",
		'export { CircleX } from "./CircleX"',
		'export { Mail as Envelope } from "./Mail"',
	]
	for name in names:
		lines.append(f'export {{ {name} }} from "./{name}"')
		if name in ROOT_COLLISIONS:
			root_lines.append(f'export {{ {name} as {name}Icon }} from "./{name}"')
		else:
			root_lines.append(f'export {{ {name} }} from "./{name}"')
	(out_dir / "index.ts").write_text("\n".join(lines) + "\n")
	(out_dir / "root.ts").write_text("\n".join(root_lines) + "\n")


def main() -> int:
	parser = argparse.ArgumentParser()
	parser.add_argument("svg_dir", type=Path)
	parser.add_argument(
		"--out",
		type=Path,
		default=Path("src/icons"),
	)
	args = parser.parse_args()
	svg_dir: Path = args.svg_dir
	out_dir: Path = args.out
	out_dir.mkdir(parents=True, exist_ok=True)

	for existing in out_dir.glob("*.tsx"):
		if existing.stem not in HAND_WRITTEN:
			existing.unlink()

	svgs = sorted(svg_dir.glob("*.svg"))
	if not svgs:
		print(f"no svgs in {svg_dir}", file=sys.stderr)
		return 1

	names: list[str] = []
	seen: dict[str, str] = {}
	for path in svgs:
		name = pascal_case(path.stem)
		if name in HAND_WRITTEN:
			print(f"skip reserved name {name} ({path.name})", file=sys.stderr)
			continue
		if name in seen:
			raise SystemExit(f"name collision: {name} from {seen[name]} and {path.name}")
		seen[name] = path.name
		xml_text = rewrite_ids(path.read_text(), name)
		root = ET.fromstring(xml_text)
		if local_name(root.tag) != "svg":
			raise SystemExit(f"{path.name} root is {root.tag}")
		svg_jsx = to_jsx(root, 2, is_svg_root=True)
		(out_dir / f"{name}.tsx").write_text(icon_module(name, svg_jsx))
		names.append(name)

	write_barrels(out_dir, names)
	print(f"wrote {len(names)} icons to {out_dir}")
	return 0


if __name__ == "__main__":
	raise SystemExit(main())
