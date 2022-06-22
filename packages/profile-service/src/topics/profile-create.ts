import { Message } from '@google-cloud/pubsub';

import { fAdminApp } from "../firebase"

const profilesRef = fAdminApp.firestore().collection("profiles")


interface UserData {
	uid: string
	username: string
}


export default async function createProfile(message: Message) {
	message.ack()
	
	const userData : UserData = JSON.parse(Buffer.from(message.data).toString())
	
	await profilesRef.doc(userData.uid).set({
		uid: userData.uid,
		username: userData.username,
		about: "",
		pfp_url: "" // TOOD: add URL to a default profile picture
	})
}