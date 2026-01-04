import { createContext, useState, useRef, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

// Track interface
export interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  image?: string;
  duration?: number;
  album?: string;
  year?: number;
}

// Player context interface
export interface PlayerContextType {
  // Track state
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;
  queue: Track[];
  queueIndex: number;
  
  // Playback state
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  
  // Player controls state
  isShuffle: boolean;
  repeatMode: number;
  isLiked: boolean;
  
  // Liked songs
  likedSongs: Track[];
  addToLikedSongs: (track: Track) => void;
  removeFromLikedSongs: (trackId: string) => void;
  isTrackLiked: (trackId: string) => boolean;
  
  // Playback controls
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (time: number) => void;
  
  // Volume controls
  changeVolume: (volume: number) => void;
  toggleMute: () => void;
  
  // Player controls
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: () => void;
  
  // Queue management
  addToQueue: (track: Track) => void;
  addTracksToQueue: (tracks: Track[]) => void;
  playTrackList: (tracks: Track[], startIndex?: number) => void;
  clearQueue: () => void;
  removeFromQueue: (index: number) => void;
  
  // Utility
  formatTime: (seconds: number) => string;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

// Create context with undefined default
export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Provider props interface
interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  // Track state
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState<number>(0);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [previousVolume, setPreviousVolume] = useState<number>(50);

  // Player controls state
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<number>(0);
  
  // Liked songs state
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);

  // Audio element ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check if current track is liked
  const isLiked = currentTrack ? likedSongs.some(song => song.id === currentTrack.id) : false;

  // Liked songs functions
  const addToLikedSongs = useCallback((track: Track) => {
    setLikedSongs(prev => {
      if (prev.some(song => song.id === track.id)) {
        return prev;
      }
      console.log('Added to liked songs:', track.title);
      return [...prev, track];
    });
  }, []);

  const removeFromLikedSongs = useCallback((trackId: string) => {
    setLikedSongs(prev => {
      const filtered = prev.filter(song => song.id !== trackId);
      console.log('Removed from liked songs:', trackId);
      return filtered;
    });
  }, []);

  const isTrackLiked = useCallback((trackId: string) => {
    return likedSongs.some(song => song.id === trackId);
  }, [likedSongs]);

  // Toggle like for current track
  const toggleLike = useCallback(() => {
    if (!currentTrack) return;
    
    if (isLiked) {
      removeFromLikedSongs(currentTrack.id);
    } else {
      addToLikedSongs(currentTrack);
    }
  }, [currentTrack, isLiked, addToLikedSongs, removeFromLikedSongs]);

  // Play next track
  const playNext = useCallback(() => {
    console.log('playNext called, queue length:', queue.length, 'queueIndex:', queueIndex);
    
    if (queue.length === 0) {
      console.log('Queue is empty, cannot play next');
      return;
    }

    let nextIndex: number;
    
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (queueIndex + 1) % queue.length;
    }

    console.log('Playing next track, index:', nextIndex, 'track:', queue[nextIndex]?.title);
    setQueueIndex(nextIndex);
    
    const nextTrack = queue[nextIndex];
    if (nextTrack && audioRef.current) {
      setCurrentTime(0);
      setDuration(0);
      setCurrentTrack(nextTrack);
      
      audioRef.current.src = nextTrack.audioUrl;
      audioRef.current.volume = isMuted ? 0 : volume / 100;
      audioRef.current.load();
      
      audioRef.current.play()
        .then(() => {
          console.log('Next track playing successfully');
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Error playing next track:", error);
          setIsPlaying(false);
        });
    }
  }, [queue, queueIndex, isShuffle, isMuted, volume]);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      console.log('Audio element created');
    }

    const audio = audioRef.current;

    // MAIN TIME UPDATE - Using timeupdate event for reliability
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (isFinite(audio.duration)) {
        setDuration(audio.duration);
        console.log('Metadata loaded, duration:', audio.duration);
      }
    };

    const handleCanPlay = () => {
      if (isFinite(audio.duration) && duration === 0) {
        setDuration(audio.duration);
        console.log('Can play, duration:', audio.duration);
      }
    };

    const handlePlay = () => {
      console.log('Audio playing');
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('Audio paused');
      setIsPlaying(false);
    };

    const handleEnded = () => {
      console.log('Track ended');
      if (repeatMode === 2) {
        audio.currentTime = 0;
        audio.play().catch(err => console.error('Play error:', err));
      } else if (repeatMode === 1 || queueIndex < queue.length - 1) {
        playNext();
      } else {
        setIsPlaying(false);
      }
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.volume = volume / 100;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [repeatMode, queueIndex, queue.length, playNext, duration, volume]);

  // Play a specific track
  const playTrack = useCallback((track: Track) => {
    if (!track || !track.audioUrl) {
      console.error("Invalid track or missing audio URL");
      return;
    }

    console.log('Playing track:', track.title, 'URL:', track.audioUrl);

    setCurrentTime(0);
    setDuration(0);
    setCurrentTrack(track);
    
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.volume = isMuted ? 0 : volume / 100;
      audioRef.current.load();
      
      audioRef.current.play()
        .then(() => {
          console.log('Playing successfully');
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Error playing track:", error);
          setIsPlaying(false);
        });
    }
  }, [isMuted, volume]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !currentTrack) {
      console.log('No audio or track');
      return;
    }

    if (audioRef.current.paused) {
      audioRef.current.play().catch(error => console.error("Error:", error));
    } else {
      audioRef.current.pause();
    }
  }, [currentTrack]);

  // Play previous track
  const playPrevious = useCallback(() => {
    console.log('playPrevious called, queue length:', queue.length, 'queueIndex:', queueIndex);
    
    if (queue.length === 0) {
      console.log('Queue is empty, cannot play previous');
      return;
    }

    if (currentTime > 3) {
      console.log('More than 3 seconds, restarting track');
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
      }
      return;
    }

    let prevIndex: number;
    
    if (isShuffle) {
      prevIndex = Math.floor(Math.random() * queue.length);
    } else {
      prevIndex = queueIndex === 0 ? queue.length - 1 : queueIndex - 1;
    }

    console.log('Playing previous track, index:', prevIndex, 'track:', queue[prevIndex]?.title);
    setQueueIndex(prevIndex);
    
    const prevTrack = queue[prevIndex];
    if (prevTrack && audioRef.current) {
      setCurrentTime(0);
      setDuration(0);
      setCurrentTrack(prevTrack);
      
      audioRef.current.src = prevTrack.audioUrl;
      audioRef.current.volume = isMuted ? 0 : volume / 100;
      audioRef.current.load();
      
      audioRef.current.play()
        .then(() => {
          console.log('Previous track playing successfully');
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Error playing previous track:", error);
          setIsPlaying(false);
        });
    }
  }, [queue, queueIndex, isShuffle, currentTime, isMuted, volume]);

  // Seek to specific time
  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
      console.log('Seeking to:', time);
    }
  }, []);

  // Change volume
  const changeVolume = useCallback((newVolume: number) => {
    const volumeValue = Math.max(0, Math.min(100, newVolume));
    setVolume(volumeValue);
    
    if (audioRef.current) {
      audioRef.current.volume = volumeValue / 100;
    }

    if (volumeValue > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.volume = previousVolume / 100;
      }
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  }, [isMuted, volume, previousVolume]);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => !prev);
    console.log('Shuffle:', !isShuffle);
  }, [isShuffle]);

  // Toggle repeat mode
  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => (prev + 1) % 3);
  }, []);

  // Add track to queue
  const addToQueue = useCallback((track: Track) => {
    setQueue(prev => [...prev, track]);
    console.log('Added to queue:', track.title);
  }, []);

  // Add multiple tracks to queue
  const addTracksToQueue = useCallback((tracks: Track[]) => {
    setQueue(prev => [...prev, ...tracks]);
    console.log('Added', tracks.length, 'tracks to queue');
  }, []);

  // Replace queue and play
  const playTrackList = useCallback((tracks: Track[], startIndex: number = 0) => {
    if (tracks.length === 0) {
      console.log('No tracks to play');
      return;
    }
    
    console.log('Playing track list, starting at index:', startIndex, 'total tracks:', tracks.length);
    setQueue(tracks);
    setQueueIndex(startIndex);
    playTrack(tracks[startIndex]);
  }, [playTrack]);

  // Clear queue
  const clearQueue = useCallback(() => {
    setQueue([]);
    setQueueIndex(0);
    console.log('Queue cleared');
  }, []);

  // Remove track from queue
  const removeFromQueue = useCallback((index: number) => {
    setQueue(prev => {
      const newQueue = prev.filter((_, i) => i !== index);
      
      if (index < queueIndex) {
        setQueueIndex(queueIndex - 1);
      } else if (index === queueIndex && newQueue.length > 0) {
        playTrack(newQueue[Math.min(queueIndex, newQueue.length - 1)]);
      }
      
      return newQueue;
    });
    
    console.log('Removed from queue, index:', index);
  }, [queueIndex, playTrack]);

  // Format time helper
  const formatTime = useCallback((seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) {
      return "0:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const value: PlayerContextType = {
    currentTrack,
    setCurrentTrack,
    queue,
    queueIndex,
    isPlaying,
    setIsPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    isLiked,
    likedSongs,
    addToLikedSongs,
    removeFromLikedSongs,
    isTrackLiked,
    playTrack,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    changeVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    addToQueue,
    addTracksToQueue,
    playTrackList,
    clearQueue,
    removeFromQueue,
    formatTime,
    audioRef
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};