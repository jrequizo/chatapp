import express from "express"
import multer from 'multer'

import { fAdminApp } from "../../firebase";

import { validateToken } from "../../utils/validateToken";

const router = express.Router()
const upload = multer()

const profilesRef = fAdminApp.firestore().collection("profiles")

router.get('/details',  [upload.none(), validateToken], async (req, res) => {
	// check to see if the JWT is valid
	const token = req.headers.authorization.slice(7)

	try {
		let decodedToken = await fAdminApp.auth().verifyIdToken(token, true)

		const response = await profilesRef.doc(decodedToken.uid).get()
		const result = response.data()

		return res.status(200).send(result)
	} catch (error) {
		console.log(error)
	}

	return res.status(401).end()
})

export = router