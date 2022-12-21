import React, { useContext, useMemo } from "react"
import {
	InMemoryTupleStorage,
	ReadOnlyTupleDatabaseClientApi,
	transactionalReadWrite,
	TupleDatabase,
	TupleDatabaseClient,
	TupleDatabaseClientApi,
} from "tuple-database"
import { UIFocusSchema } from "./Focus"

export type UIDatabaseSchema = UIFocusSchema

export const uiQuery = transactionalReadWrite<UIDatabaseSchema>()
export type UIDatabase = TupleDatabaseClientApi<UIDatabaseSchema>
export type ReadOnlyUIDatabase =
	ReadOnlyTupleDatabaseClientApi<UIDatabaseSchema>
const UIDatabaseContext = React.createContext<UIDatabase | undefined>(undefined)

export function UIDatabaseProvider(props: { children: React.ReactNode }) {
	const db = useMemo(() => {
		return new TupleDatabaseClient<UIDatabaseSchema>(
			new TupleDatabase(new InMemoryTupleStorage())
		)
	}, [])

	// useEffect(() => {
	// 	;(window as any).db = db
	// 	db.subscribe({ prefix: [] }, (writes) => {
	// 		console.log(writes)
	// 	})
	// }, [])

	return (
		<UIDatabaseContext.Provider value={db}>
			{props.children}
		</UIDatabaseContext.Provider>
	)
}

export function useUIDatabase() {
	const db = useContext(UIDatabaseContext)

	if (!db) {
		throw new Error("UI Database Context not found")
	}

	return db
}
