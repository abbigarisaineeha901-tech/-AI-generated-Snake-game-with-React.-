import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Radio } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "TRACK_01.DAT",
    artist: "SYS_ADMIN",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "text-[#0ff]",
    borderColor: "border-[#0ff]"
  },
  {
    id: 2,
    title: "NULL_POINTER",
    artist: "KERNEL_PANIC",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "text-[#f0f]",
    borderColor: "border-[#f0f]"
  },
  {
    id: 3,
    title: "MEM_LEAK",
    artist: "DAEMON_09",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "text-[#0ff]",
    borderColor: "border-[#0ff]"
  }
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto p-4 bg-black border-2 ${currentTrack.borderColor} shadow-[4px_4px_0px_currentColor] ${currentTrack.color} font-mono`}>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        loop={false}
      />
      
      <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-current pb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 flex items-center justify-center border-2 ${currentTrack.borderColor} ${isPlaying ? 'animate-pulse' : ''}`}>
            <Radio size={20} className={currentTrack.color} />
          </div>
          <div>
            <h3 className={`font-bold text-sm ${currentTrack.color} tracking-widest`}>{currentTrack.title}</h3>
            <p className="text-[10px] opacity-70 mt-1">SRC: {currentTrack.artist}</p>
          </div>
        </div>
        
        {/* Visualizer bars */}
        <div className="flex items-end gap-1 h-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className={`w-2 bg-current ${isPlaying ? 'animate-pulse' : 'h-1'}`}
              style={{ 
                height: isPlaying ? `${Math.random() * 100 + 10}%` : '4px',
                animationDuration: `${0.1 + i * 0.05}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-[#111] border border-current mb-4 relative">
        <div 
          className={`absolute top-0 left-0 h-full bg-current transition-all duration-100`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button 
          onClick={toggleMute}
          className={`p-2 border border-transparent hover:border-current transition-colors`}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <div className="flex items-center gap-4">
          <button 
            onClick={prevTrack}
            className="p-2 border border-transparent hover:border-current transition-colors"
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={togglePlay}
            className={`p-2 border-2 ${currentTrack.borderColor} hover:bg-current hover:text-black transition-all`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button 
            onClick={nextTrack}
            className="p-2 border border-transparent hover:border-current transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="text-[10px] tracking-widest">
          {isPlaying ? 'STREAMING' : 'IDLE'}
        </div>
      </div>
    </div>
  );
}
