import { storeCredentials } from "../../utils/credentialManager"
import { endpoints, getPostRequestConfig } from "../../types/common"

interface LoginResponseBody {
	jwt: string
	refreshToken: string
}


export async function loginUser(email: string, password: string) {
	let result = await sendLoginRequest(email, password)

	if (result.status === 200) {
		let credentials: LoginResponseBody = await result.json()

		storeCredentials(credentials)
	}

	return result.status === 200
}


async function sendLoginRequest(email: string, password: string) {
	let credentials = {
		email: email,
		password: password,
	}

	const result = await fetch(
		endpoints.auth + "login",
		getPostRequestConfig(JSON.stringify(credentials)),
	)

	return result
}