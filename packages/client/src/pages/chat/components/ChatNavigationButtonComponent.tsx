import React from "react";


type ChatNavigationButtonProps = {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	chatName: string
	name: string
	active?: boolean
}

const ChatNavigationButton: React.FC<ChatNavigationButtonProps> = ({
	onClick,
	chatName,
	name,
	active,
}) => {
	let className = "w-full text-left text-base border-none rounded p-1 pl-4"
	if (active) {
		className += " bg-slate-200"
	}

	return (
		<div className="p-px grow">
			<button name={name} className={className} onClick={onClick}>
				{`#${chatName}`}
			</button>
		</div>
	)
}

export default ChatNavigationButton
