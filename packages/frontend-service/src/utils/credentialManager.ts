import { AES, enc } from "crypto-js"


const userAgent: string = navigator.userAgent.toString()


export function storeProfile(profile: {
	uid: string
	username: string
	pfp_url: string
	about: string
}) {
	localStorage.setItem("profile", JSON.stringify(profile))
}

export function getProfile() {
	const profile_data = localStorage.getItem("profile")

	let returnValue = null
	if (profile_data) {
		returnValue = JSON.parse(profile_data)
	}

	return returnValue
}

export function storeCredentials(credentials: { jwt: string, refreshToken: string }) {
	// hash the credentials
	const hashedJwt = AES.encrypt(credentials.jwt, userAgent).toString()
	const hashedRefreshToken = AES.encrypt(credentials.refreshToken, userAgent).toString()

	localStorage.setItem("jwt", hashedJwt)
	localStorage.setItem("refreshToken", hashedRefreshToken)
}

export function getCredentials() {
	return {
		jwt: getJwt(),
		refreshToken: getRefreshToken()
	}
}

export function getJwt() {
	let hashedJwt = localStorage.getItem("jwt")

	if (hashedJwt === null) {
		return null
	}

	return AES.decrypt(hashedJwt, userAgent).toString(enc.Utf8)
}

export function getRefreshToken() {
	let hashedRefreshToken = localStorage.getItem("refreshToken")

	if (hashedRefreshToken === null) {
		return null
	}

	return AES.decrypt(hashedRefreshToken, userAgent).toString(enc.Utf8)
}