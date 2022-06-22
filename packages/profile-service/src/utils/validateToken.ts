import { NextFunction, Request, Response } from "express";

import { fAdminApp } from "../firebase";

export async function validateToken(req: Request, res: Response, next: NextFunction) {
	// check to see if params has Authorization
	if (!Reflect.has(req.headers, 'authorization')) {
		return res.status(401).end()
	}

	// check to see if the JWT is valid
	const token = req.headers.authorization.slice(7)
	
	try {
		await fAdminApp.auth().verifyIdToken(token, true)
	} catch (error) {
		return res.status(401).end()
	}

	next()
}