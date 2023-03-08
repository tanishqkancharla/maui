export function debug(...args: any[]) {
	function clean(object: any) {
		const obj = JSON.parse(JSON.stringify(object))
		// [!] clone

		if (obj && typeof obj === "object") {
			obj.__proto__ = null
			// clear

			for (var j in obj) {
				obj[j] = clean(obj[j]) // recursive
			}
		}
		return obj
	}

	const cleanedArgs = args.map(clean)

	console.log.apply(console, cleanedArgs)
}
