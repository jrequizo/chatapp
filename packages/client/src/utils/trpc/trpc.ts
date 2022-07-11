import { createReactQueryHooks } from "@trpc/react";

import { AppRouter } from "chatapp-api"

// import { AppRouter as ChatWebsocketRouter } from "chat-websocket";

export const API = createReactQueryHooks<AppRouter>();

// export const chatSocketApi = createReactQueryHooks<ChatWebsocketRouter>();