import { ReactElement, useState } from "react"
import { useNavigate } from "react-router"
import { areValidCredentials, useSaveCredentials } from "../data/credentials"
import "./index.scss"

export default function Login() {
	let [email, setEmail] = useState<string>("")
	let [password, setPassword] = useState<string>("")
	let [remembered, setRemembered] = useState<boolean>(false)
	let [hasError, setHasError] = useState<boolean>(false)
	let navigator = useNavigate()
	let saveCredentials = useSaveCredentials()
	let error_text: ReactElement | undefined
	if (hasError)
		error_text = <div className="error-text">Email or password is invalid</div>

	const testData = async () => {
		let credentials = {
			email: email!,
			password: password!,
		}
		if (await areValidCredentials(email!, password!)) {
			saveCredentials(credentials, remembered)
			console.log("moving")
			navigator("/forecast")
		} else setHasError(true)
	}
	return (
		<>
			<form
				className="log-wrapper"
				onSubmit={(e) => {
					e.preventDefault()
					testData()
				}}
			>
				<legend>Log to Wep App</legend>
				<fieldset>
					<div className="label-wrapper">
						<label htmlFor="e-mail">E-mail</label>
						<input
							type="email"
							name="e-mail"
							id="e-mail"
							placeholder="e-mail"
							className="basic-input"
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="label-wrapper">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							className="basic-input"
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="label-wrapper">
						<label htmlFor="checkbox">Remember me</label>
						<input
							type="checkbox"
							name="checkbox"
							id="checkbox"
							className="basic-checkbox"
							checked={remembered}
							// value={remembered}
							onChange={(e) => setRemembered(e.target.checked)}
						/>
					</div>

					{error_text}

					<div className="login-btn-wrapper">
						<input type="submit" value="Login" className="login-btn" />
					</div>
				</fieldset>
			</form>
		</>
	)
}
