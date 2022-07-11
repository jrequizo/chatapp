import React, { useState } from "react";
import { UserCirclePlus, ChatCenteredDots, BellSimple, UserCircle } from "phosphor-react";
import { getProfile } from "@/utils/credentialManager";

function Navbar() {
	const path = window.location.pathname

	const userId = getProfile()?.uid

	return (
		<nav className="p-2 gap-4 text-white font-bold flex bg-theme-darkgreen justify-between items-stretch">
			<a className="flex items-center mx-2" href="/">
				<img
					className="aspect-square w-12"
					src={`${process.env.PUBLIC_URL}/images/chatbox-navbar.svg`}
					alt="Logo"
				></img>
				<span className="pl-1.5 text-3xl">ChatBox</span>
			</a>
			<ul
				className="flex items-center"
			>
				<li>
					<a
						href="/" // TODO:
						className="flex items-center mx-2"
					>
						<UserCirclePlus
							size={32}
							weight={path.startsWith('/user-search') ? 'fill' : 'thin'}
						/>
					</a>
				</li>
				<li>
					<a
						href="/"
						className="flex items-center mx-2"
					>
						<ChatCenteredDots
							size={32}
							weight={path === '/' ? 'fill' : 'thin'}
						/>
					</a>
				</li>
				<li>
					<a
						href="/" // TODO:
						className="flex items-center mx-2"
					>
						<BellSimple
							size={32}
							weight={path.startsWith('/notifications') ? 'fill' : 'thin'}
						/>
					</a>
				</li>
				<li>
					<a
						href={`/profile/${userId}`} // TODO: profile click
						className="flex items-center ml-2 mr-4"
					>
						<UserCircle
							size={44}
							weight={path.startsWith(`/profile/${userId}`) ? 'fill' : 'thin'} // TODO: profile ignore query string
						/>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
