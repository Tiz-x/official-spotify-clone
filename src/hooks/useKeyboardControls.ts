import { useEffect } from 'react';
import { usePlayer } from '../hooks/usePlayer'; 


export const useKeyboardControls = () => {
  const { togglePlayPause, currentTrack } = usePlayer();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Get the active element
      const activeElement = document.activeElement;
      const isTyping = 
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.getAttribute('contenteditable') === 'true';

      // Don't trigger if user is typing
      if (isTyping) {
        return;
      }

      // Handle spacebar for play/pause
      if (event.code === 'Space' || event.key === ' ') {
        event.preventDefault(); // Prevent page scroll
        
        if (currentTrack) {
          togglePlayPause();
        }
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [togglePlayPause, currentTrack]);
};