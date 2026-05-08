import { RANKS, XP_PER_LEVEL } from '../constants';
import { motion } from 'motion/react';

export default function RankLadder({ totalXP }: { totalXP: number }) {
  return (
    <div className="p-8">
      <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-10">Rank Ladder</h1>
      
      <div className="space-y-4">
        {RANKS.map((rank, index) => {
          const isCurrent = totalXP >= rank.minXP;
          const nextRank = RANKS[index + 1];
          const progress = nextRank 
            ? Math.min(100, Math.max(0, (totalXP - rank.minXP) / (nextRank.minXP - rank.minXP) * 100))
            : (totalXP >= rank.minXP ? 100 : 0);

          return (
            <div key={rank.name} className={`p-6 rounded-2xl border ${isCurrent ? 'bg-app-sidebar border-app-accent' : 'bg-white/5 border-white/5'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xl font-bold ${isCurrent ? 'text-app-accent' : 'text-gray-400'}`}>{rank.name}</span>
                <span className="font-mono text-gray-500">{rank.minXP} XP required</span>
              </div>
              {isCurrent && nextRank && (
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-app-accent" style={{ width: `${progress}%` }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
