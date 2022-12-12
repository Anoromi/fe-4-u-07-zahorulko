import { useCookies } from "react-cookie"
import { CookieSetOptions } from "universal-cookie"

export interface Credentials {
	email: string
	password: string
}

export async function areValidCredentials(email: string, password: string) {
	console.log(password)
	return email === "and.zagorulko@gmail.com" && password == "1234"
}

export function useSaveCredentials() {
	let [_1, setCookie, _2] = useCookies(["email", "password"])
	return (credentials: Credentials, remember: boolean) => {
		let saveOptions: CookieSetOptions | undefined
		if (!remember) {
			saveOptions = {
				maxAge: 30,
			}
		}
		setCookie("email", credentials.email, saveOptions)
		setCookie("password", credentials.password, saveOptions)
	}
}
export function useLoadCredentials(): Credentials | null {
	let [{ email, password }, _1, _2] = useCookies(["email", "password"])
	if (email && password)
		return {
			email,
			password,
		}
	else return null
}
