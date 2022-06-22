import express from "express"

import exampleRoute from "./routes/example/route.example"

const router = express.Router()

router.use(exampleRoute)

export = router