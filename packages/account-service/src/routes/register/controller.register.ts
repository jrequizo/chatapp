import { PubSub } from "@google-cloud/pubsub"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import PasswordValidator from 'password-validator'

import { fClientApp, fAdminApp } from "../../utils/firebase"
  
const fClientAuth = getAuth(fClientApp)

const accountsRef = fAdminApp.firestore().collection("accounts")
	

const pubSubClient = new PubSub()
const topic = pubSubClient.topic('profile-create')


function validatePassword(pw: string) : boolean {
	let schema = new PasswordValidator()
	schema
		.is().min(8)                                    // Minimum length 8
		.is().max(100)                                  // Maximum length 100
		.has().uppercase()                              // Must have uppercase letters
		.has().lowercase()                              // Must have lowercase letters
		.has().digits(1)                                // Must have at least 2 digits
		.has().not().spaces()                           // Should not have spaces
		.is().not().oneOf(['Passw0rd', 'Password123', '12345678', 'P4ssw0rd', 'Abc12345']) // Blacklist these values

	return schema.validate(pw) as boolean
}


async function usernameTaken(username: string) {
	const usernameQuery = await accountsRef.where("username", "==", username).get()

	return !usernameQuery.empty
}


async function emailTaken(email: string) {
	try {
		await fAdminApp.auth().getUserByEmail(email)
		return true
	} catch (exception) {
		return false
	}
}


async function createUserCredentials(email: string, password: string) {
	let userCredentials = await createUserWithEmailAndPassword(fClientAuth, email, password)
	return userCredentials
}


async function createUsername(uid: string, username: string) {
	await accountsRef.doc(uid).set({
		username: username
	})
}

async function pushMessageToTopic(uid: string, username: string) {
	const json = {uid: uid, username: username}
	await topic.publishMessage({json})
}

export {
	validatePassword,
	usernameTaken,
	emailTaken,
	createUserCredentials,
	createUsername,
	pushMessageToTopic
}