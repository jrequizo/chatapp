import { PaperPlaneRight } from "phosphor-react";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import ChatMessage from "../ChatMessage/ChatMessage";
import { getChatMessages } from "../../Chat.controller"

import "./Chatbox.css"

import {
	ChatDetails,
	Message,
	OnMessageHandler
} from "../../Chat.types"

type ChatboxProps = {
	chat: ChatDetails
	onSendMessage: (message: string) => void
	messageHandler: OnMessageHandler
}

// TODO: pass sendMessage callback
// TODO: pass messages to render
const Chatbox: React.FC<ChatboxProps> = ({
	chat,
	onSendMessage,
	messageHandler
}) => {
	messageHandler.bindOnMessageCallback(addMessage)

	const [messages, setMessages] = useState<Array<Message>>([])

	const [messageInput, setMessageInput] = useState<String>("")

	useQuery<Array<Message>, Error>(
		['chat-messages', chat],
		() => {
			return getChatMessages(chat.id)
		},
		{
			onSuccess: setMessages,
		}
	)

	function onMessageInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
		if (messageInput !== event.currentTarget.value) {
			setMessageInput(event.currentTarget.value)
		}
	}

	function onInputEnterKeyPressed(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			sendMessage(messageInput as string)
		}
	}

	function onSendButtonPressed(event: React.MouseEvent<HTMLButtonElement>) {
		sendMessage(messageInput as string)
	}

	function sendMessage(message: string) {
		setMessageInput("")
		onSendMessage(messageInput as string)
	}

	function addMessage(newMessage: Message) {
		setMessages((oldMessages: Message[]) => {
			if (!oldMessages.includes(newMessage)) {
				oldMessages.unshift(newMessage)
			}

			return [...oldMessages]
		})
	}

	const messagesComponent = messages.map((message) => {
		return <ChatMessage
			key={message.id}
			sender_id={message.sender.uid}
			sender_pfp={message.sender.pfp_url}
			message={message.content}
			timestamp={message.timestamp}></ChatMessage>
	})

	return (
		<div className="chatbox">

			<div className="chatbox-header">
				<span className="chatbox-header-title">
					{
						`#${chat.name}`
					}
				</span>
			</div>

			<div className="chatbox-container">

				<div className="chatbox-main">
					{
						messagesComponent
					}
				</div>

				<div className="chatbox-input-container">
					<input className="chatbox-input" type="text" placeholder="Aa" value={messageInput as string} onChange={onMessageInputChanged} onKeyDown={onInputEnterKeyPressed}></input>
					<button className="chatbox-input-button-submit" onClick={onSendButtonPressed}>
						<PaperPlaneRight size={44} weight="fill" color="#E1E1E1" className="chatbox-input-button-icon" />
					</button>
				</div>
			</div>
			
		</div>

	)
}

export default Chatbox