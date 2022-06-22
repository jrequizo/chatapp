import { initializeApp } from "firebase/app";

import fAdminApp from "firebase-admin"

import fClientConfig from "../firebase-config.json"
  

const fClientApp = initializeApp(fClientConfig);

fAdminApp.initializeApp({
	credential: fAdminApp.credential.applicationDefault()
})

export {
	fAdminApp,
	fClientApp
}