const apiPath = (process.env.NODE_ENV === "production") ? "api.microservicechatapp.com/" : "http://localhost:";

// Endpoint to target
// Structure: {domain}{optional:port}{route}
// E.g. `endpoints.auth`
// 	 - dev:		localhost:3001/account/
// 	 - prod:	api.microservicechatapp.com/account/
const endpoints = {
	account 		: apiPath + ((process.env.NODE_ENV === "development") ? "3001/" : "") + "account/",
	auth 			: apiPath + ((process.env.NODE_ENV === "development") ? "3002/" : "") + "auth/",
	chat 			: apiPath + ((process.env.NODE_ENV === "development") ? "3003/" : "") + "chat/",
	friends 		: apiPath + ((process.env.NODE_ENV === "development") ? "3004/" : "") + "friends/",
	notifications 	: apiPath + ((process.env.NODE_ENV === "development") ? "3005/" : "") + "notifications/",
	profile 		: apiPath + ((process.env.NODE_ENV === "development") ? "3006/" : "") + "profile/",
	userSearch 		: apiPath + ((process.env.NODE_ENV === "development") ? "3007/" : "") + "user-search/",

	chatWebsocket 	: "ws://" + ((process.env.NODE_ENV === "development") ? "localhost:3100/" : "TODO: replace with AppEngine service URL"),
}

const getPostRequestConfig = (body: string): RequestInit => {
	return {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: body,
	}
}

export {
	apiPath,
	endpoints,
	getPostRequestConfig
}