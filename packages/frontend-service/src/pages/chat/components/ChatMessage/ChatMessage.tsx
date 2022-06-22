import { useNavigate } from 'react-router'
import { getProfile } from '../../../../utils/credentialManager'
import './ChatMessage.css'


type ChatMessageProps = {
	sender_id: string
	sender_pfp: string
	message: string
	timestamp: number
}

const ChatMessage: React.FC<ChatMessageProps> = ({
	sender_id,
	sender_pfp,
	message,
	timestamp
}) => {
	const navigate = useNavigate()

	const selfProfile = getProfile()
	const self_id = selfProfile?.uid
	
	function onProfileIconClicked() {
		navigate(`/profile/${sender_id}`)
	}

	if (sender_id === self_id) {
		return (
			<div className="message-container right" id={sender_id}>
				<button className="pfp-button" onClick={onProfileIconClicked}>
					<img className="pfp" src={sender_pfp} alt="Profile"></img>
				</button>
				<div className="message blue">
					<span>{message}</span>
				</div>
			</div>
		)
	} else {
		return (
			<div className="message-container" id={sender_id}>
				<button className="pfp-button" onClick={onProfileIconClicked}>
					<img className="pfp" src={sender_pfp} alt="Profile"></img>
				</button>
				<div className="message">
					<span>{message}</span>
				</div>
			</div>
		)
	}
}

export default ChatMessage
