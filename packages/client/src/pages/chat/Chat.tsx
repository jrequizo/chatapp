import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { io, Socket } from 'socket.io-client';

import { getCredentials, getUid, storeProfile } from "@/utils/credentialManager";
import { API } from "@/utils/trpc/trpc";

import ProfileData from "@/types/ProfileData";
import ChatProperties from "@/types/ChatProperties";

import ChatComponent from "./components/ChatComponent";
import MessageHandler from "./MessageHandler";

function Chat() {
	const navigator = useNavigate()

	// Retrieve credentials from localStore. The jwt will be passed into the authorization context for connecting with the Chat server.
	const [credentials] = useState(getCredentials());
	const { jwt, refreshToken, userObject } = credentials

	// If the credentials don't exist, redirect the User to the login page.
	if (!(jwt || refreshToken || userObject)) {
		navigator("/login")
	}

	// Retrieve uid from localStore. This will be used to retrieve the profile information of the User.
	const [currentUid] = useState(getUid());

	/**
	 * Retrieve public profile data for the current User.
	 */
	const [profileData, setProfileData] = useState<ProfileData | null>(null)

	// Retrieve the User's public profile information
	const profileQuery = API.useQuery(["profile.profileData", { uid: currentUid! }], {
		onSuccess(data) {
			// Cache the User's profile information
			storeProfile(data)

			// Re-render the Chat component with newly retrieved information
			setProfileData(data)
		},
	})

	/**
	 * Retrieve data for and populate the left Chat navigation bar.
	 */
	const [publicChatData, setPublicChatData] = useState<ChatProperties[]>([])

	// Retrieve the list of Public chats from the API.
	const publicChatQuery = API.useQuery(["chat.publicChats"], {
		onSuccess(data) {
			const _publicChatData = data.map((chat) => {
				return {
					chatId: chat.id,
					chatName: chat.name
				}
			})
			setPublicChatData(_publicChatData)
		},
	})

	/** 
	 * Handler passed to child prop to define how to implement onMessage callback.
	 * Child prop needs to call `MessageHandler.bindOnMessage(<callback>)` to execute
	 * <callback> whenever the Socket emits a `client-message` event.
	 */
	const [messageHandler] = useState<MessageHandler>(new MessageHandler())
	const [socket, setSocket] = useState<Socket>()
	useEffect(() => {
		// TODO: change from hard-coded URL
		const _socket = io("http://localhost:3100", { transports: ['websocket'] })


		_socket.on('connect', () => {
			/**
			 * Authenticate the User once the connection to the socket.io server is established.
			 * Will also re-connect and re-authenticate when connection is lost with the server.
			 * This will emit an `authenticated` event when completed with a boolean indicating
			 * if the User successfully authenticated.
			 */
			_socket.emit("authenticate", {
				jwt: jwt
			})
		})

		_socket.on('authenticated', (isAuthenticated) => {
			if (isAuthenticated) {
				if (publicChatData.length > 0) {
					// Join the first Chat when we are sure it exists.
					_socket?.emit("join-chat", {
						chatId: publicChatData[0].chatId,
						type: "public"
					})
				}
			} else {
				// TODO: Re-authenticate
				// For now, we'll redirect to login
				navigator("/login")
			}
		})

		/**
		 * Bind the `MessageHandler` to consume the socket.io `client-message` event.
		 */
		_socket.on('emit-message', (data) => messageHandler.onMessage(data))

		setSocket(_socket)

		/**
		 * Clean-up functions to unbind callbacks.
		 * (May want to add a clea-up function for `MessageHandler`?)
		 */
		return () => {
			_socket.off('client-message')
			_socket.off('error')
			_socket.close()
		}

	}, [setSocket, publicChatQuery.status])

	/**
	 * Sends a Message to the socket.io server.
	 * @param message 
	 */
	function onSendMessage(message: string) {
		socket?.emit("send-message", message)
	}

	/**
	 * Callback function for when the User clicks on a Chat in the left navigation panel.
	 * Emits to the server to join the selected Chat.
	 * @param event 
	 */
	function onChatNavigationButtonPressed(event: React.MouseEvent<HTMLButtonElement>) {
		const index = parseInt(event.currentTarget.name)
		const chat = publicChatData[index]
		emitJoinChat(chat)
	}

	/**
	 * Helper function to emit a chat-join event. Used when the query to retrieve the records
	 * of existing public chats and when the User selects another chat on the left navigation panel.
	 * @param chatProperties 
	 */
	function emitJoinChat(chatProperties: ChatProperties) {
		socket?.emit("join-chat", {
			jwt: jwt,
			chatId: chatProperties.chatId,
			type: "public"
		})
	}

	return (
		// TODO: pass props
		<ChatComponent
			profileData={profileData}
			onSendMessage={onSendMessage}
			onChatNavigationButtonPressed={onChatNavigationButtonPressed}
			publicChats={publicChatData}
			messageHandler={messageHandler}
		/>
	)
}

export default Chat
