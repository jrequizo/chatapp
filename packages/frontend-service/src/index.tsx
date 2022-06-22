import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from './pages/login/Login'
import Chat from './pages/chat/Chat'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'

import NoPage from './pages/nopage/NoPage'
import UnderConstruction from './pages/under-construction/UnderConstruction'

import './index.css'
import './types/common'
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }
  }
})


export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />
            <Route path="/">
              <Route path="register" element={<Register />} />
              <Route path="chat" element={<Chat />} />
              <Route path="profile/*" element={<Profile />} />
              <Route path="under-construction" element={<UnderConstruction />} /> 
              <Route path="not-found" element={<NoPage />} />
              <Route path="*" element={<NoPage />} /> 
            </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)