import { validateOrReject } from "class-validator";

import { ClassConstructor, plainToInstance as transformToClass } from "class-transformer"

export default async function validateRequestBody<A>(requestBody: any, requestClass: ClassConstructor<A>) {
	const request : A = transformToClass(requestClass, requestBody)
	try {
		await validateOrReject(request as any)
		return {}
	} catch(errors) {
		let message: Record<string, any> = {}
		for (const errorItem of errors) {
			let error = errorItem.constraints
			message[errorItem.property] = error
		}
		return message
	} 
}