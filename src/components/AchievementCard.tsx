import { motion } from 'motion/react';

export function AchievementCard({ name, description, unlocked }: { name: string; description: string; unlocked: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${unlocked ? 'bg-app-sidebar border-app-accent' : 'bg-white/5 border-white/5 opacity-50'} flex items-center space-x-4`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${unlocked ? 'bg-app-accent text-black' : 'bg-white/10 text-gray-500'}`}>
            {unlocked ? '★' : '?'}
        </div>
        <div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-xs text-gray-400">{description}</p>
        </div>
    </div>
  );
}
