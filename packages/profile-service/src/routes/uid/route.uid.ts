import express from "express"
import multer from 'multer'

import { fAdminApp } from "../../firebase"

const router = express.Router()
const upload = multer()


interface ProfileDocument {
	uid: string,
	username: string
	about: string,
	pfp_url: string
}


const profilesCollection = fAdminApp.firestore().collection('profiles')


router.get('/u/:uid', upload.none(), async (req, res) => {
	const data = await profilesCollection.doc(req.params.uid).get()
	if (!data.exists) {
		return res.status(404).end()
	}

	const profileData : ProfileDocument = data.data() as ProfileDocument
	return res.status(200).send(profileData)
})


export = router