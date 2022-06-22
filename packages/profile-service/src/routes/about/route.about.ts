import express from "express"
import multer from 'multer'

import { ParamsDictionary } from 'express-serve-static-core'

import { IsDefined } from "class-validator";

import validateRequestBody from "../../utils/validateRequestBody"
import { validateToken } from "../../utils/validateToken";
import { fAdminApp } from "../../firebase";

const router = express.Router()
const upload = multer()

class UpdateAboutRequestBody {
	@IsDefined()
	about: string
}


const profilesRef = fAdminApp.firestore().collection("profiles")


router.put<ParamsDictionary, any, UpdateAboutRequestBody>('/:uid/about', [upload.none(), validateToken], async (req, res) => {
	let missingParams = await validateRequestBody(req.body, UpdateAboutRequestBody)
	if (Object.keys(missingParams).length > 0) {
		return res.status(400).send(missingParams)
	}

	// check to see if the JWT is valid
	const token = req.headers.authorization.slice(8)

	try {
		let decodedToken = await fAdminApp.auth().verifyIdToken(token, true)

		if (decodedToken.uid === req.params.uid) {
			await profilesRef.doc(req.params.uid).set({
				about: req.body.about,
			})
			
			return res.status(200).end()
		}
	} catch (error) {}

	return res.status(401).end()
})

export = router