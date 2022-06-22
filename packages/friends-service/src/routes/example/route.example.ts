import express from "express"
import multer from 'multer'

import { ParamsDictionary } from 'express-serve-static-core'

import { IsDefined } from "class-validator";

import validateRequestBody from "../../tools/validateRequestBody"

const router = express.Router()
const upload = multer()

class ExampleRequestBody {
	@IsDefined()
	field: string
}


router.post<ParamsDictionary, any, ExampleRequestBody>('/example', upload.none(), async (req, res) => {
	let missingParams = await validateRequestBody(req.body, ExampleRequestBody)
	if (Object.keys(missingParams).length > 0) {
		return res.status(400).send(missingParams)
	}

	// TODO: write function
})

export = router