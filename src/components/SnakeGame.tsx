import React from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { RotateCcw, Cpu, Terminal } from 'lucide-react';

export function SnakeGame() {
  const {
    snake,
    food,
    isGameOver,
    isPaused,
    score,
    highScore,
    resetGame,
    gridSize,
  } = useSnakeGame();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      {/* Score Header */}
      <div className="flex justify-between w-full mb-6 px-4 font-mono">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#0ff] uppercase tracking-widest flex items-center gap-2">
            <Cpu size={14} className="text-[#0ff]" /> DATA_YIELD
          </span>
          <span className="text-2xl text-[#f0f] font-bold mt-1">{score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-[#f0f] uppercase tracking-widest flex items-center gap-2">
            <Terminal size={14} className="text-[#f0f]" /> PEAK_CYCLES
          </span>
          <span className="text-2xl text-[#0ff] font-bold mt-1">{highScore}</span>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative p-1 bg-[#000] border-4 border-[#0ff] shadow-[0_0_20px_#0ff] shadow-[#0ff]/50">
        <div 
          className="grid bg-[#111]"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            width: 'min(80vw, 400px)',
            height: 'min(80vw, 400px)',
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const x = index % gridSize;
            const y = Math.floor(index / gridSize);
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.some((segment, i) => i !== 0 && segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                className={`w-full h-full border border-[#0ff]/10 flex items-center justify-center ${
                  isSnakeBody ? 'bg-[#0ff] opacity-80' : ''
                }`}
              >
                {isSnakeHead && <div className="w-full h-full bg-[#f0f] animate-pulse" />}
                {isFood && <div className="w-3/4 h-3/4 bg-[#0ff] animate-ping" />}
              </div>
            );
          })}
        </div>

        {/* Overlays */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 border-4 border-[#f0f]">
            <h2 
              className="text-3xl md:text-4xl text-[#f0f] mb-4 font-mono tracking-widest glitch-text"
              data-text="FATAL_ERROR"
            >
              FATAL_ERROR
            </h2>
            <p className="text-[#0ff] font-sans text-xl mb-6">YIELD: {score}</p>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black transition-colors font-mono text-sm tracking-widest uppercase"
            >
              <RotateCcw size={16} /> REBOOT_SEQ
            </button>
          </div>
        )}

        {isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 border-4 border-[#0ff]">
            <h2 className="text-3xl text-[#0ff] mb-6 font-mono tracking-widest glitch-text" data-text="SYS_HALT">SYS_HALT</h2>
            <p className="text-[#f0f] font-sans text-lg animate-pulse">AWAITING_INPUT [SPACE]</p>
          </div>
        )}
      </div>

      {/* Controls Hint */}
      <div className="mt-6 text-center text-[#0ff]/70 font-sans text-lg flex gap-4">
        <span>INPUT: [W A S D]</span>
        <span>INTERRUPT: [SPACE]</span>
      </div>
    </div>
  );
}
