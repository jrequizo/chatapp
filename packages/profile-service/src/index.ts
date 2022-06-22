import express from 'express'
import cors from 'cors'

import routes from "./routes"

import "./pubsub"
import { initPubsub } from './pubsub'

const PORT = process.env.PORT || 3006
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/profile', routes)

app.listen(PORT, async function() {
	console.log(`Server listening on port ${PORT}`)

	await initPubsub()
})