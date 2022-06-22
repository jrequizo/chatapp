import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';
import { useNavigate } from "react-router"
import { useQueryClient, useQuery } from 'react-query';

import { getProfileData, getPublicChatrooms as getPublicChats } from './Chat.controller';

import Navbar from '../../components/navbar/Navbar'
import { endpoints } from '../../types/common'
import { getJwt } from '../../utils/credentialManager';

import ChatRoomButton from './components/ChatRoomButton/ChatRoomButton'
import Chatbox from './components/Chatbox/Chatbox';
import {
	ChatDetails,
	ProfileData,
	OnMessageHandler
} from "./Chat.types"

import './Chat.css'

function Chat() {
	const queryClient = useQueryClient()

	// Ensure user credentials are valid
	const navigator = useNavigate()
	const jwt = getJwt()
	if (jwt === null) {
		navigator('/')
	}
	const [socket, setSocket] = useState<Socket>()
	const [currentChat, setCurrentChat] = useState<ChatDetails>()
	const [sender, setSender] = useState<{uid: string, username: string, pfp_url: string}>()
	const [messageHandler] = useState<OnMessageHandler>(new OnMessageHandler())

	// Attach socket events
	useEffect(() => {
		const _socket = io(endpoints.chatWebsocket)
		_socket.on('client-message', (data) => messageHandler.onMessage(data))
		setSocket(_socket)

		return () => {
			_socket.off('client-message')
			_socket.close()
		}
	}, [])

	useQuery<ProfileData, Error>('user-profile', getProfileData, {
		onSuccess(data) {
			setSender({
				uid: data.uid,
				username: data.username,
				pfp_url: data.pfp_url
			})
		},
	})

	const { data: publicChats } = useQuery<Array<ChatDetails>, Error>('public-chats', getPublicChats, {
		onSuccess(data) {
			joinChat(data[0])
		},
	})

	function onChatroomSelected(event: React.MouseEvent<HTMLButtonElement>) {
		const _current = publicChats?.find((element) => element.id === event.currentTarget.name)

		if (_current) {
			joinChat(_current as ChatDetails)
		}
	}

	function joinChat(chatDetails: ChatDetails) {
		socket?.emit("chat-join", {
			jwt: jwt,
			chat_id: chatDetails.id,
			type: "public"
		})
		setCurrentChat(chatDetails)
		queryClient.invalidateQueries('chat-messages')
	}

	function onSendMessage(message: string) {
		socket?.emit("server-message", {
			content: message,
			jwt: jwt,
			sender: sender
		})
	}

	const chatRooms = (publicChats ?? []).map((room) => {
		return <ChatRoomButton
			key={room.id}
			name={room.id}
			chatName={"#" + room.name}
			onClick={(onChatroomSelected)}
			active={currentChat?.id === room.id}></ChatRoomButton>
	})

	return (
		<main className="Chat">
			<Navbar />
			{!!currentChat
				? <section className="section">
					<div className="column-container">
						<div className="navigation">
							<div className="chat-selector">
								<button className="chat-selector-button deactivated">Private</button>
								<button className="chat-selector-button active-button">Public</button>
							</div>
							<div className="nav-panel">
								<h3 className="h3-rooms">-Rooms</h3>
								<div className="chats">
									{
										chatRooms
									}
								</div>
							</div>
						</div>
						<Chatbox onSendMessage={onSendMessage} chat={currentChat} messageHandler={messageHandler} />
						
					</div>
				</section>
				: <div className="loading"><span className="loading-text">Loading...</span></div>
			}

		</main>
	)
}

export default Chat
