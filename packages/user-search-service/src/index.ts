import express from 'express'
import cors from 'cors'

import routes from "./routes"

const PORT = process.env.PORT || 3007
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user-search', routes)

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})