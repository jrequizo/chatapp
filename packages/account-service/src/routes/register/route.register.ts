import express from "express"
import multer from 'multer'


import { ParamsDictionary } from 'express-serve-static-core'
import { IsDefined, IsEmail } from "class-validator"
import { plainToInstance as transformToClass } from "class-transformer"


import { validatePassword, usernameTaken, emailTaken, createUserCredentials, createUsername as createUserDetails, pushMessageToTopic }  from "./controller.register"
import validateRequestBody from "../../utils/validateRequestBody"


const router = express.Router()
const upload = multer()


class RegisterRequestBody { 
	@IsDefined()
	@IsEmail()
	email: string

	@IsDefined()
	username: string

	@IsDefined()
	password: string
}

router.post<ParamsDictionary, any, RegisterRequestBody>('/register', upload.none(), async (req, res) => {
	let missingParams = await validateRequestBody(req.body, RegisterRequestBody);
	if (Object.keys(missingParams).length > 0) {
		return res.status(400).send(missingParams)
	}
	
	// Validate password
	let isPasswordValid = validatePassword(req.body.password)
	if (!isPasswordValid) {
		return res.status(422).send("Password does not conform to the minimum criteria.")
	}

	// Check if email is valid
	let isEmailTaken = await emailTaken(req.body.email)
	if (isEmailTaken) {
		return res.status(409).send("Email already in use.")
	}

	// Check if username is valid
	let isUsernameTaken = await usernameTaken(req.body.username)
	if (isUsernameTaken) {
		return res.status(400).send("Username already in use.")
	}

	// Create account
	let userCredentials = await createUserCredentials(req.body.email, req.body.password)

	// Reserve username
	await createUserDetails(userCredentials.user.uid, req.body.username)

	// Notify profile-service using PubSub topic
	await pushMessageToTopic(userCredentials.user.uid, req.body.username)
	
	let jwt = await userCredentials.user.getIdToken()

	// Return token
	return res.status(201).send({
		jwt: jwt,
		refreshToken: userCredentials.user.refreshToken,
		uid: userCredentials.user.uid
	})
})


export = router