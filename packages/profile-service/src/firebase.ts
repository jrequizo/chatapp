import { initializeApp } from "firebase/app";

import fAdminApp from "firebase-admin"

import fClientConfig from "../firebase-config.json"
  

const fClientApp = initializeApp(fClientConfig);

fAdminApp.initializeApp({
	credential: fAdminApp.credential.applicationDefault(),
	databaseURL: "https://chatapp-development-349608-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

export {
	fAdminApp,
	fClientApp
}