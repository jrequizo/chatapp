import React, { useState } from "react";

interface RegisterProps {
	onRegisterButtonPressed?: (email: string, password: string) => void
}

/**
 * Login Component/Page.
 * @param onLoginButtonPressed Callback function for when the Login button is pressed. 
 */
const Register: React.FC<RegisterProps> = ({
	onRegisterButtonPressed: onLoginButtonPressed
}) => {
	const [emailField, setEmailField] = useState("")
	const [usernaneField, setUsernameField] = useState("")
	const [passwordField, setPasswordField] = useState("")

	const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement>) => setEmailField(event.target.value)
	const onUsernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => setUsernameField(event.target.value)
	const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement>) => setPasswordField(event.target.value)

	return (
		<main className="Login">
			<section className="grid grid-cols-2 leading-6 font-medium vh-100">

				<div className="flex justify-center items-center">
					<img
						className="w-72 h-72"
						src={`${process.env.PUBLIC_URL}/images/chatbox-logo.svg`}
						alt="ChatApp logo"
					>
					</img>
				</div>

				<div className="flex justify-center items-center text-center bg-theme-darkgreen">
					<div className="flex flex-col py-8 px-16 mx-5 h-full justify-center w-96">
						<input type="email"
							className="text-sm mt-4 mb-2 p-2 rounded-lg mt-auto"
							placeholder="Email Address..."
							name="email"
							onChange={onEmailChanged}
							value={emailField}
						></input>
						<input type="username"
							className="text-sm mb-2 p-2 rounded-lg"
							placeholder="Username..."
							name="username"
							onChange={onUsernameChanged}
							value={usernaneField}
						></input>
						<input type="password"
							className="text-sm mb-2 p-2 rounded-lg"
							placeholder="Password..."
							name="password"
							onChange={onPasswordChanged}
							value={passwordField}
						></input>
						<button
							className="my-0 ml-auto text-white bg-theme-green py-1 px-4 rounded-lg my-2 text-1xl font-bold hover:bg-green-600 transition mb-auto"
							onClick={() => {
								onLoginButtonPressed && onLoginButtonPressed(emailField, passwordField)
							}}
						>Register</button>
						<div
							className="text-white py-4"
						>Already registered? Click <a
						className="text-theme-green hover:text-theme-lightgreen hover:underline"
							href="/login"
						>here</a>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Register
