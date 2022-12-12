import { ReactElement, useEffect, useState } from "react"

export default function FutureBuilder<T>(props: {
	future: () => Promise<T>
	children: (
		data: T | undefined,
		isLoading: boolean,
		isError: boolean
	) => ReactElement
}) {
	let [value, setValue] = useState<T>()
	let [isError, setError] = useState<boolean>(false)
	useEffect(() => {
		props.future().then(
			(v) => setValue(v),
			(_) => setError(true)
		)
	}, [])

	return <>{props.children(value, value !== undefined, isError)}</>
	// if (value) {
	// 	return props.onCompleted(value)
	// } else {
	// 	return props.onLoading
	// }
}
