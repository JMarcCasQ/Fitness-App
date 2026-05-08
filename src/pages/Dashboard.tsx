import { getRequiredXPForLevel, getLevel, getRank } from '../constants';
import { ProgressChart } from '../components/ProgressChart';
import { Leaderboard } from '../components/Leaderboard';
import { exercises } from '../data/exercises';

export default function Dashboard({ totalXP, personalRecords }: { totalXP: number, personalRecords: any[] }) {
  const level = getLevel(totalXP);
  const rank = getRank(level);
  
  // Calculate XP within current level
  let currentLevelXP = totalXP;
  let currentLevelRequired = 0;
  for (let i = 0; i < level; i++) {
    currentLevelRequired = getRequiredXPForLevel(i);
    currentLevelXP -= currentLevelRequired;
  }
  const nextLevelXP = getRequiredXPForLevel(level);
  const progressToNextLevel = (currentLevelXP / nextLevelXP) * 100;

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-end">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Dashboard</h1>
        <button className="px-6 py-3 bg-app-accent text-black font-bold uppercase rounded-xl">Continue Quest</button>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-2 bg-app-sidebar border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <div className="text-app-accent font-bold uppercase tracking-widest text-lg mb-2">{rank} (Level {level})</div>
          <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-app-accent" style={{ width: `${progressToNextLevel}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{currentLevelXP} / {nextLevelXP} XP to Level {level + 1}</p>
        </div>
        
        <div className="bg-app-sidebar border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center gap-2">
           <h2 className="text-sm text-gray-400 uppercase font-bold">Current Streak</h2>
           <div className="text-6xl font-black text-white">7<span className="text-2xl text-app-accent"> days</span></div>
        </div>
        
        <div className="bg-app-sidebar border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center gap-2">
           <h2 className="text-sm text-gray-400 uppercase font-bold">Current Rank</h2>
           <div className="text-4xl font-black text-app-accent">{rank}</div>
        </div>
      </div>
      
      <div className="bg-app-sidebar border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">Personal Records</h2>
          <div className="grid grid-cols-3 gap-6">
            {personalRecords.map(pr => {
                const exercise = exercises.find(e => e.id === pr.exerciseId);
                return (
                    <div key={pr.exerciseId} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <div className="text-app-accent text-3xl mb-2">🏆</div>
                        <h3 className="font-bold text-lg">{exercise?.name}</h3>
                        <p className="text-3xl font-black">{pr.value} {pr.metric}</p>
                        <p className="text-xs text-gray-500">Achieved on {new Date(pr.date).toLocaleDateString()}</p>
                    </div>
                );
            })}
          </div>
      </div>
    </div>
  );
}
