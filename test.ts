import { groupBy } from "lodash"

const obj = {
	1: "hello",
	2: "world",
	3: "hello",
}

console.log(
	groupBy(obj, (value) => {
		return value
	})
)

for (const key in obj) {
	console.log({ key })
}

console.log("1fewf" in obj)
