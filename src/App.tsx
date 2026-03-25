import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#0ff] flex flex-col relative overflow-hidden font-sans screen-tear">
      <div className="static-noise"></div>
      <div className="scanlines"></div>
      
      <header className="w-full py-8 text-center z-10 relative border-b-4 border-[#f0f] bg-black/50">
        <h1 className="text-3xl md:text-5xl font-mono tracking-tighter glitch-text text-[#0ff]" data-text="SYS.OP_SNAKE">
          SYS.OP_SNAKE
        </h1>
        <p className="text-[#f0f] font-mono text-xs md:text-sm mt-4 tracking-widest animate-pulse">
          STATUS: ONLINE // AWAITING_INPUT
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 z-10 relative gap-8">
        <div className="w-full">
          <SnakeGame />
        </div>
        
        <div className="w-full pb-8">
          <MusicPlayer />
        </div>
      </main>
    </div>
  );
}
