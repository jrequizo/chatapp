import express from "express"

import getProfileRoute from "./routes/uid/route.uid"
import putAboutRoute from "./routes/about/route.about"
import detailsRoute from "./routes/details/route.details"

const router = express.Router()

router.use(getProfileRoute)
router.use(putAboutRoute)
router.use(detailsRoute)

export = router