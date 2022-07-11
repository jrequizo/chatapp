import React, { useState } from "react";
import { PaperPlaneRight } from "phosphor-react";

import ChatProperties from "@/types/ChatProperties";
import ChatMessage from "@/types/ChatMessage";

import ChatMessageComponent from "./ChatMessageComponent";

import MessageHandler from "../MessageHandler";
import { API } from "@/utils/trpc/trpc";

type ChatboxProps = {
	properties: ChatProperties
	onSendMessage: (message: string) => void
	messageHandler: MessageHandler
}

const Chatbox: React.FC<ChatboxProps> = ({
	properties,
	onSendMessage,
	messageHandler
}) => {
	messageHandler.bindOnMessage(onMessageReceived)

	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [messageInput, setMessageInput] = useState("");

	/**
	 * 
	 */
	const messagesQuery = API.useQuery(["chat.chatHistory", {
		chatId: properties?.chatId || "",
	}], {
		onSuccess(data) {
			setMessages(data);
		},
	})

	/**
	 * 
	 * @param event 
	 */
	function onInputChanged(event: React.KeyboardEvent<HTMLInputElement>) {
		const { value: message} = event.currentTarget;

		setMessageInput(message)
	}

	/**
	 * Callback fired when a new ChatMessage is emitted from the socket.io server.
	 * @param newMessage The new ChatMessage to render
	 */
	function onMessageReceived(newMessage: ChatMessage) {
		setMessages((messages) => [newMessage, ...messages])
	}

	/**
	 * Callback for when the User presses enter in the Chat input.
	 * @param event The KeyboardEvent triggered.
	 */
	function onInputEnterKeyPressed(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			onSendMessage(messageInput)
			setMessageInput("")
		}
	}
	/**
	 * Callback for when the User presses the _send_ button on the Chat input.
	 * @param event The MouseEvent triggered.
	 */
	function onSendButtonPressed(event: React.MouseEvent<HTMLButtonElement>) {
		onSendMessage(messageInput)
		setMessageInput("")
	}

	return (
		<div className="flex flex-col grow shrink w-full h-full">

			<div className="h-16 flex items-center shadow-md w-full">
				<span className="pl-6 text-left text-2xl">
					{
						`#${properties?.chatName || "Loading..."}`
					}
				</span>
			</div>

			<div className="flex flex-col grow w-full h-full">

				<div className="flex flex-col-reverse grow basis-0 h-full overflow-y-scroll">
					{
						messages.map((message) => {
							return (
								<ChatMessageComponent
									sender_id={message.sender.uid}
									sender_username={message.sender.username}
									sender_pfp={message.sender.pfp_url}
									message={message.content}
									timestamp={message.timestamp}
								/>
							)
						})
					}
				</div>

				<div className="flex grow-0 basis-px w-full h-16 items-center p-2">
					<input className="rounded-3xl border-none w-full pl-4 h-9 text-5 text-slate-700" type="text" placeholder="Aa" onChange={onInputChanged} onKeyDown={onInputEnterKeyPressed} value={messageInput}/>
					<button className="p-0 pr-6 bg-transparent" onClick={onSendButtonPressed}>
						<PaperPlaneRight size={44} weight="fill" color="#cbd5e1" className="chatbox-input-button-icon" />
					</button>
				</div>
			</div>

		</div>
	)
}
export default Chatbox