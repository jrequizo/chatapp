import { endpoints } from '../../types/common'

async function getProfileData(uid: string) {
	const response = await fetch(endpoints.profile + 'u/' + uid, {method: 'get'})
	const result = await response.json()
	return result
}

export {
	getProfileData
}