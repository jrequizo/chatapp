export default interface ChatMessage {
	content: string
	sender: {
		pfp_url: string
		uid: string
		username: string
	}
	timestamp: number
	chatId: string
}