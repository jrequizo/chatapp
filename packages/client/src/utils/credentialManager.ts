import { AES, enc } from "crypto-js"

import ProfileData from "@/types/ProfileData"
import UserCredentials from "@/types/UserCredentials"

const userAgent: string = navigator.userAgent.toString()


/**
 * Stores the public profile information of the User for caching purposes.
 * Will overwrite any currently stored profile information.
 * @param profile The profile information of the User.
 */
function storeProfile(profile: ProfileData) {
	localStorage.setItem("profile", JSON.stringify(profile))
}

/**
 * Retrieves the stored public profile information of the currently logged in user.
 * Returns `null` if none exists.
 * @returns The public profile information of the User.
 */
function getProfile() : ProfileData | null {
	const profileData = localStorage.getItem("profile")

	let returnValue = null
	if (profileData) {
		returnValue = JSON.parse(profileData)
	}

	return returnValue as ProfileData
}

/**
 * 
 * @param uid 
 */
function storeUid(uid: string) {
	localStorage.setItem("uid", uid)
}

/**
 * 
 * @returns 
 */
function getUid() {
	const uid = localStorage.getItem("uid")

	return uid
}

/**
 * 
 * @param credentials 
 */
function storeCredentials(credentials: UserCredentials) {
	// hash the credentials
	const hashedJwt = AES.encrypt(credentials.jwt, userAgent).toString()
	const hashedRefreshToken = AES.encrypt(credentials.refreshToken, userAgent).toString()
	const hashedUserObject = AES.encrypt(credentials.userObject, userAgent).toString()

	localStorage.setItem("jwt", hashedJwt)
	localStorage.setItem("refreshToken", hashedRefreshToken)
	localStorage.setItem("userObject", hashedUserObject)
}

/**
 * 
 * @returns 
 */
function getCredentials() {
	return {
		jwt: getJwt(),
		refreshToken: getRefreshToken(),
		userObject: getUserObject()
	}
}

/**
 * 
 * @returns 
 */
function getJwt() {
	let hashedJwt = localStorage.getItem("jwt")

	if (hashedJwt === null) {
		return null
	}

	return AES.decrypt(hashedJwt, userAgent).toString(enc.Utf8)
}

/**
 * 
 * @returns 
 */
function getRefreshToken() {
	let hashedRefreshToken = localStorage.getItem("refreshToken")

	if (hashedRefreshToken === null) {
		return null
	}

	return AES.decrypt(hashedRefreshToken, userAgent).toString(enc.Utf8)
}

function getUserObject() {
	let userObject = localStorage.getItem("userObject")

	if (userObject === null) {
		return null
	}

	return AES.decrypt(userObject, userAgent).toString(enc.Utf8)
}

export {
	storeProfile,
	getProfile,
	storeUid,
	getUid,
	storeCredentials,
	getCredentials,
	getJwt,
	getRefreshToken,
	getUserObject
}