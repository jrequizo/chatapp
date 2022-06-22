import { PubSub } from '@google-cloud/pubsub'

import profileCreate from './topics/profile-create'


const pubSubClient = new PubSub({projectId: "emulator"})


async function initPubsub() {
	try {
		const tProfileCreate = pubSubClient.topic('profile-create')
		const tProfileCreateSubscription = tProfileCreate.subscription('profile-create-subscription')
		
		tProfileCreateSubscription.on('message', profileCreate)
	} catch (error) {
		// console.log(error)
	}
}


export {
	initPubsub
}