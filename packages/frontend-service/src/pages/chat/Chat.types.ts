


interface ChatDetails {
	name: string
	id: string
}

interface ProfileData {
	uid: string
	username: string
	pfp_url: string
	about: string
}


interface Message {
	content: string
	sender: {
		pfp_url: string
		uid: string
		username: string
	}
	timestamp: number
	id: string
}


type OnMessage = (message: Message) => void


class OnMessageHandler {
	_onMessage?: OnMessage | null

	bindOnMessageCallback(onMessage: OnMessage) {
		this._onMessage = onMessage
	}

	onMessage(message: Message) {
		if (this._onMessage) {
			console.log(message)
			this._onMessage(message)
		}
	}
}

export {
	OnMessageHandler
}

export type {
	ChatDetails,
	ProfileData,
	Message,
	OnMessage
}
