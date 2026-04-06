import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MetcalfeAnalysis from './components/MetcalfeAnalysis'
import WatchTogetherPage from './pages/concepts/WatchTogether'
import NetflixLivePage from './pages/concepts/NetflixLive'
import CreatorStudioPage from './pages/concepts/CreatorStudio'
import GameNightPage from './pages/concepts/GameNight'
import FanMarketplacePage from './pages/concepts/FanMarketplace'

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
      </Routes>
    </BrowserRouter>
  )
}
