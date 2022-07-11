import React, { useState } from "react";

interface LoginProps {
	onLoginButtonPressed?: (email: string, password: string) => void
}

/**
 * Login Component/Page.
 * @param onLoginButtonPressed Callback function for when the Login button is pressed. 
 */
const Login: React.FC<LoginProps> = ({
	onLoginButtonPressed
}) => {
	const [emailField, setEmailField] = useState("")
	const [passwordField, setPasswordField] = useState("")

	function onEmailChanged(event: React.ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;
		setEmailField(value)
	}

	function onPasswordChanged(event: React.ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;
		setPasswordField(value)
	}

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
						<input type="password"
							className="text-sm mb-2 p-2 rounded-lg"
							placeholder="Password..."
							name="password"
							onChange={onPasswordChanged}
							value={passwordField}
						></input>
						<button
							className="my-0 ml-auto text-white bg-theme-green py-1 px-4 rounded-lg my-2 text-1xl font-bold hover:bg-green-600 transition"
							onClick={() => {
								onLoginButtonPressed && onLoginButtonPressed(emailField, passwordField)
							}}
						>Login</button>
						<a
							className="text-gray-300 mb-auto ml-auto text-xs hover:text-green-600 hover:underline"
							href="/under-construction"
						>Forgot your password?</a>
						<div
							className="text-white py-4"
						>Don't have an account? Click <a
							className="text-theme-green hover:text-theme-lightgreen hover:underline"
							href="/register"
						>here</a>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Login
