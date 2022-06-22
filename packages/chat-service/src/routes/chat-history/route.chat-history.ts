import express from "express"
import multer from 'multer'

import { fAdminApp } from "../../firebase"

const router = express.Router()
const upload = multer()

const db = fAdminApp.database()

interface Message {
	content: string
	sender: {
		pfp_url: string
		uid: string
		username: string
	}
	timestamp: number
	id?: string
}

// return the last 10 messages
router.get('/:chat_id', upload.none(), async (req, res) => {
	const ref = db.ref(req.params.chat_id).child('messages')

	const response = await ref.orderByChild('timestamp').limitToLast(20).get()
	const json = response.toJSON();

	const result : Array<Message> = Object.keys(json).map((id) => {
		return {
			...json[id],
			id
		}
	}) as Array<Message>

	// Newest at index n, oldest at index 0
	// Oldest rendered at the top and newest at the bottom
	result.sort((a, b) => {
		var key1 = new Date(a.timestamp);
		var key2 = new Date(b.timestamp);
	
		if (key1 < key2) {
			return 1;
		} else if (key1 == key2) {
			return 0;
		} else {
			return -1;
		}
	})
	
	// result.forEach(message => {
	// 	console.log(new Date(message.timestamp))
	// });

	return res.status(200).send(result)
})

export = router