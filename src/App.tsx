import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MetcalfeAnalysis from './components/MetcalfeAnalysis'
import WatchTogetherPage from './pages/concepts/WatchTogether'
import NetflixLivePage from './pages/concepts/NetflixLive'
import CreatorStudioPage from './pages/concepts/CreatorStudio'
import GameNightPage from './pages/concepts/GameNight'
import FanMarketplacePage from './pages/concepts/FanMarketplace'
import BookClubPage from './pages/concepts/BookClub'
import TasteNetworkPage from './pages/concepts/TasteNetwork'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MetcalfeAnalysis />} />
        <Route path="/concepts/watch-together" element={<WatchTogetherPage />} />
        <Route path="/concepts/netflix-live" element={<NetflixLivePage />} />
        <Route path="/concepts/creator-studio" element={<CreatorStudioPage />} />
        <Route path="/concepts/game-night" element={<GameNightPage />} />
        <Route path="/concepts/fan-marketplace" element={<FanMarketplacePage />} />
        <Route path="/concepts/book-club" element={<BookClubPage />} />
        <Route path="/concepts/taste-network" element={<TasteNetworkPage />} />
      </Routes>
    </BrowserRouter>
  )
}
