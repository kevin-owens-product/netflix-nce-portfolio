import { Video, Zap, Star, Gamepad2, ShoppingBag, BookOpen, Network } from 'lucide-react'

export const SIBLINGS = [
  { id: 'watch-together',  name: 'Watch Together',  color: '#e50914', icon: <Video size={13} /> },
  { id: 'netflix-live',    name: 'Netflix Live',    color: '#ff6b35', icon: <Zap size={13} /> },
  { id: 'creator-studio',  name: 'Creator Studio',  color: '#f5c518', icon: <Star size={13} /> },
  { id: 'game-night',      name: 'Game Night',      color: '#00d4aa', icon: <Gamepad2 size={13} /> },
  { id: 'fan-marketplace', name: 'Fan Marketplace', color: '#a855f7', icon: <ShoppingBag size={13} /> },
  { id: 'book-club',       name: 'Book Club',       color: '#22c55e', icon: <BookOpen size={13} /> },
  { id: 'taste-network',   name: 'Taste Network',   color: '#6366f1', icon: <Network size={13} /> },
]
