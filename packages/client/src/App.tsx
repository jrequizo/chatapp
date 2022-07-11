import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { QueryClient, QueryClientProvider } from "react-query";

import { API } from '@/utils/trpc/trpc';

// import { API } from "./utils/trpc/trpc";

import LoginPage from './pages/login/LoginPage';
import Register from './pages/register/components/Register';
import Chat from './pages/chat/Chat';
import Profile from './pages/profile/Profile';

import NoPage from './pages/nopage/NoPage'
import UnderConstruction from './pages/under-construction/UnderConstruction'

import './App.css';

const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Chat />} />
        <Route path="/">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          <Route path="profile/*" element={<Profile />} />
          <Route path="under-construction" element={<UnderConstruction />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};


function App() {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    API.createClient({
      url: 'http://localhost:3001/trpc'
    })
  )

  return (
    <API.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </API.Provider>
  )
}

export default App;
