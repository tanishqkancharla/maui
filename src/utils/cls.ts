import { Falsey } from "lodash"

export function cls(...strings: (string | Falsey)[]): string {
	return strings.filter((value) => Boolean(value)).join(" ")
}
