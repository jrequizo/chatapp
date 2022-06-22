import { fetchWithAuth } from "../../utils/fetchWithAuth"
import { endpoints } from "../../types/common"

async function getPublicChatrooms() {
	
	let response = await fetchWithAuth(endpoints.chat + "/public-chats", "get")

	let result = await response.json()

	return result
}

async function getChatMessages(room_id: string) {
	let response = await fetchWithAuth(endpoints.chat + `/${room_id}`, "get")

	let result = await response.json()

	return result
}

async function getProfileData() {
	const response = await fetchWithAuth(endpoints.profile + "details", "get")
	const result = await response.json()
	return result
}

async function logout() {
	localStorage.clear()
}


export {
	getPublicChatrooms,
	getChatMessages,
	logout,
	getProfileData
}