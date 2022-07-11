import React, { useState } from "react";

import ProfileData from "@/types/ProfileData";

import ProfileComponent from "./components/ProfileComponent";
import { API } from "@/utils/trpc/trpc";

function Profile() {
	const uid = window.location.pathname.split('/').pop()

	const [profileData, setProfileData] = useState<ProfileData | undefined>(undefined)

	const profileDataQuery = API.useQuery(["profile.profileData", {
		uid: uid || ""
	}], {
		onSuccess(data) {
			setProfileData(data)
		},
	})

	return (
		<ProfileComponent
			profileData={profileData}
		/>
	)
}

export default Profile
