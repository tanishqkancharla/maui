export {}

declare global {
	interface Array<T> {
		first: T | undefined
		last: T | undefined
	}
}
