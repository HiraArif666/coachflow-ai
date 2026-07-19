import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import PainPoints from './components/PainPoints'
import CoachStory from './components/CoachStory'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Dashboard from './pages/Dashboard'

function HomePage() {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatKey, setChatKey] = useState(0)

  function openChat() {
    setChatKey((k) => k + 1)
    setChatOpen(true)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />
      <Hero onStartChat={openChat} />
      <PainPoints />
      <CoachStory />
      <Process />
      <Testimonials />
      <Footer />
      <ChatWidget key={chatKey} open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App