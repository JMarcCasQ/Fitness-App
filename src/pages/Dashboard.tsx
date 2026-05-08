import { useState } from 'react';
import { XP_PER_LEVEL, getLevel, getRank } from '../constants';

export default function Dashboard({ totalXP }: { totalXP: number }) {
  const level = getLevel(totalXP);
  const rank = getRank(level);
  const xpInLevel = totalXP % XP_PER_LEVEL;
  const progressToNextLevel = (xpInLevel / XP_PER_LEVEL) * 100;

  return (
    <div className="p-8">
      <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-10">Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-app-sidebar border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <div className="text-app-accent font-bold uppercase tracking-widest text-lg mb-2">{rank} (Level {level})</div>
          <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-app-accent" style={{ width: `${progressToNextLevel}%` }}></div>
          </div>
        </div>
        
        <div className="bg-app-sidebar border border-white/5 rounded-3xl p-8">
           <h2 className="text-2xl font-bold mb-4">Rank</h2>
           <div className="text-6xl font-black">{rank[0]}</div>
        </div>
      </div>
    </div>
  );
}
