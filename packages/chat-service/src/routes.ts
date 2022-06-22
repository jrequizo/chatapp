import express from "express"

import exampleRoute from "./routes/example/route.example"
import publicChatsRoute from "./routes/public-chats/route.public-chats"
import chatHistoryRoute from "./routes/chat-history/route.chat-history"

const router = express.Router()

router.use(exampleRoute)
router.use(publicChatsRoute)
router.use(chatHistoryRoute)

export = router