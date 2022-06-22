import { getJwt } from "./credentialManager"


export async function fetchWithAuth(uri: string, method: string, body?: string) : Promise<Response> {
	let jwt = getJwt()

	const result = await fetch(
		uri,
		{
			method: method,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${jwt}`
			},
			body: body
		},
	)

	return result
}