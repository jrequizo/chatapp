import express from "express"

import registerRoute from "./register/route.register"
import resetPassword from "./reset-password/route.reset-password"
import changePassword from "./change-password/route.change-password"


const router = express.Router()

router.use(registerRoute)
router.use(resetPassword)
router.use(changePassword)


export = router