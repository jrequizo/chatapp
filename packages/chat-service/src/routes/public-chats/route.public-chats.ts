import express from "express"
import multer from 'multer'

import { fAdminApp } from "../../firebase"

const router = express.Router()
const upload = multer()

const publicChatsCollection = fAdminApp.firestore().collection("public-chats")


/**
 * 	Retrieves all the public chats from the database
 * 	@returns {Array<{id: string, name: string}>} An array containing the `id` and `name` of the room 
 */
router.get('/public-chats', upload.none(), async (req, res) => {
	let result = await publicChatsCollection.get()

	let chats = result.docs.map(doc => {
		return {
			id: doc.id, 
			...doc.data()
		}
	})

	return res.status(200).send(chats)
})

export = router