import ChatMessage from "@/types/ChatMessage"

/**
 * 
 */
type OnMessage = (message: ChatMessage) => void

/**
 * 
 */
export default class MessageHandler {
	_onMessage?: OnMessage | null

	bindOnMessage(onMessage: OnMessage) {
		this._onMessage = onMessage
	}

	onMessage(message: ChatMessage) {
		if (this._onMessage) {
			this._onMessage(message)
		}
	}
}