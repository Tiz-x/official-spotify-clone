import { useContext } from 'react';
import type { PlayerContextType } from '../context/PlayerContext';
import { PlayerContext } from '../context/PlayerContext';

/**
 * Custom hook to access the Player context
 * Throws an error if used outside of PlayerProvider
 */
export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  
  return context;
};