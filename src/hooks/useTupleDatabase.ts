import { useCallback, useSyncExternalStore } from "react"
import { KeyValuePair, TupleDatabaseClientApi } from "tuple-database"
import { TuplePrefix } from "tuple-database/database/typeHelpers"

export function useTupleDatabase<
	Schema extends KeyValuePair,
	T extends Schema["key"],
	P extends TuplePrefix<T>
>(db: TupleDatabaseClientApi<Schema>, key: P) {
	const subscribe = useCallback(
		(onStoreChange: () => void) => {
			return db.subscribe({ prefix: key }, onStoreChange)
		},
		[db, ...key]
	)

	const getSnapshot = useCallback(() => {
		return db.get(key)
	}, [db, ...key])

	return useSyncExternalStore(subscribe, getSnapshot)
}
