import express from 'express'
import cors from 'cors'

import routes from "./routes/routes"

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/account', routes)

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
});