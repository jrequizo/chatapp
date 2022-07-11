import { useNavigate } from 'react-router'
import { getProfile } from '@/utils/credentialManager'


type ChatMessageProps = {
	sender_id: string
	sender_username: string
	sender_pfp: string
	message: string
	timestamp: number
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({
	sender_id,
	sender_username,
	sender_pfp,
	message,
	timestamp
}) => {
	const navigate = useNavigate()

	const currentUserId = getProfile()?.uid

	function onProfileIconClicked() {
		navigate(`/profile/${sender_id}`)
	}

	if (sender_id === currentUserId) {
		return (
			<div className="flex flex-col items-start items-end">
				<span className="px-3 py-1 font-bold">{sender_username}</span>
				<div className="flex flex-row-reverse h-fit mx-1 my-auto mx-3 gap-2" id={sender_id}>
					<button className="h-full items-baseline bg-transparent border-none h-12 w-12 min-profile-button-size" onClick={onProfileIconClicked}>
						<img className="rounded-full overflow-hidden h-12 w-12 object-cover min-profile-button-size" src={sender_pfp} alt="Profile"></img>
					</button>
					<div className="bg-blue-700 text-white rounded-lg p-2 align-middle flex">
						<span className="flex items-center message-size">{message}</span>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className="flex flex-col items-start">
				<span className="px-3 py-1 font-bold">{sender_username}</span>
				<div className="flex h-fit mx-1 my-auto mx-3 gap-2" id={sender_id}>
					<button className="h-full items-baseline bg-transparent border-none h-12 w-12 min-profile-button-size" onClick={onProfileIconClicked}>
						<img className="rounded-full overflow-hidden h-12 w-12 object-cover min-profile-button-size" src={sender_pfp} alt="Profile"></img>
					</button>
					<div className="bg-theme-darkgreen text-white rounded-lg p-2 align-middle flex">
						<span className="flex items-center message-size">{message}</span>
					</div>
				</div>
			</div>
		)
	}
}

export default ChatMessageComponent
