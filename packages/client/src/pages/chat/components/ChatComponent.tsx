import React, { useEffect, useState } from "react";

import ProfileData from "@/types/ProfileData";
import ChatProperties from "@/types/ChatProperties";

import Navbar from "@components/Navbar/Navbar";

import Chatbox from "./ChatboxComponent";
import ChatNavigationButton from "./ChatNavigationButtonComponent";
import MessageHandler from "../MessageHandler";
interface ChatProps {

	profileData: ProfileData | null

	onSendMessage: (message: string) => void

	onChatNavigationButtonPressed: (event: React.MouseEvent<HTMLButtonElement>) => void

	publicChats: Array<ChatProperties>

	messageHandler: MessageHandler
}

const Chat: React.FC<ChatProps> = ({
	// The User's public profile data.
	profileData,

	// The public chats to display in the navigator.
	publicChats,

	// Callback handler for when the User presses enter or presses the send button on the chat.
	onSendMessage,

	// Callback handler for when the User selects a Chat on the left sidebar.
	onChatNavigationButtonPressed,

	messageHandler
}) => {
	// State for currently selected Chat.
	const [activeChat, setActiveChat] = useState(0)

	/**
	 * Create the JSX.Element[] props for the Chat buttons on the left navigation panel.
	 */
	const chatNavigationButtons =  publicChats.map((property, index) => {
		/** 
		 * `activeChat` may not have a value on first render and may not update on re-render, so use
		 * the first element in publicChats (if publicChats is populated).
		 */
		let selected = publicChats[activeChat];
		return <ChatNavigationButton chatName={property.chatName} name={index.toString()} key={property.chatId} active={selected.chatId === property.chatId} onClick={_onChatNavigationButtonPressed}/>
	})

	/**
	 * Extending the callback function executed when a Chat is selected in the left navigation panel.
	 * Just does some local 
	 * @param event 
	 */
	function _onChatNavigationButtonPressed(event: React.MouseEvent<HTMLButtonElement>) {
		const { name: index } = event.currentTarget;

		setActiveChat(parseInt(index))

		// Call the provided callback.
		onChatNavigationButtonPressed(event);
	}

	return (
		<main className="Chat">
			<Navbar />
			<section>
				<div className="flex w-72 bg-slate-300">
					<div className="flex flex-col">
						<div className="flex">
							<button className="flex-1 font-bold bg-slate-200 hover:cursor-not-allowed text-gray-400">Private</button>
							<button className="flex-1 font-bold text-gray-400">Public</button>
						</div>
						<div className="w-72 grow basis-0">
							<h3 className="font-normal p-2">-Rooms</h3>
							<div className="h-full m-3">
								{
									chatNavigationButtons
								}
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-1 bg-slate-200">
					<Chatbox
						onSendMessage={onSendMessage}
						messageHandler={messageHandler}
						properties={publicChats[activeChat]}
					/>
				</div>
			</section>
		</main>
	)
}

export default Chat
