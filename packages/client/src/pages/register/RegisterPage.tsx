import React, { useState } from "react";
import { useNavigate } from "react-router";

import { storeCredentials, storeUid } from "@/utils/credentialManager";
import { API } from "@/utils/trpc/trpc";

import Login from "./components/Register";

/**
 * Login component handler. Handles the callback functions and some initial data requests.
 * 
 */
function RegisterPage() {
	// TODO: check if User already has existing valid credentials

	const navigator = useNavigate()
	
	/**
	 * tRPC mutation for logging in the User.
	 */
	const login = API.useMutation(["auth.login"], {
		onSuccess(data) {
			// Cahe User credentials
			storeCredentials({
				jwt: data.jwt,
				refreshToken: data.refreshToken,
				userObject: data.user
			})
			storeUid(data.uid)

			// Navigate to Chat
			navigator("/")
		},
	})

	// Call the tRPC mutation.
	async function onRegisterButtonPressed(email: string, password: string) {
		login.mutate({email: email, password: password})
	}

	return (
		<Login 
			onRegisterButtonPressed={onRegisterButtonPressed}
		/>
	)
}

export default RegisterPage
