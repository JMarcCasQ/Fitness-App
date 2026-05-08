import { ACHIEVEMENTS } from '../constants';
import { AchievementCard } from '../components/AchievementCard';

export default function Profile({ completedQuests, level }: { completedQuests: number; level: number }) {
  
  const checkUnlocked = (achievement: typeof ACHIEVEMENTS[0]) => {
      if (achievement.id === 'first_quest' || achievement.id === 'master_quest') return completedQuests >= achievement.goal;
      if (achievement.id === 'novice_level' || achievement.id === 'titan_level') return level >= achievement.goal;
      return false;
  };

  return (
    <div className="p-8">
      <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-10">Athlete Profile</h1>
      
      <div className="bg-app-sidebar border border-white/5 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6">Achievements</h2>
        <div className="grid grid-cols-2 gap-4">
            {ACHIEVEMENTS.map(a => (
                <AchievementCard key={a.id} name={a.name} description={a.description} unlocked={checkUnlocked(a)} />
            ))}
        </div>
      </div>
    </div>
  );
}
