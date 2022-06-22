import './ChatRoomButton.css'


type ChatRoomButtonProps = {
  onClick?: React.MouseEventHandler
  chatName: string
  name: string
  active?: boolean
}

const ChatRoomButton: React.FC<ChatRoomButtonProps> = ({
  onClick,
  chatName,
  name,
  active,
}) => {
  let className = "room-button"
  if (active) {
    className += " active"
  }

  return (
    <div className="container">
      <button name={name} className={className} onClick={onClick}>
        {chatName}
      </button>
    </div>
  )
}

export default ChatRoomButton
