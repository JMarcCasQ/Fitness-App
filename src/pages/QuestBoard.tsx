import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { exercises, type QuestType, type Exercise } from '../data/exercises';

interface QuestCardProps {
  exercise: any;
  onComplete: (xp: number) => void;
}

function QuestCard({ exercise, onComplete }: QuestCardProps) {
    const [xpGained, setXPGained] = useState(false);
    const handleComplete = () => {
        onComplete(exercise.xpValue);
        setXPGained(true);
        setTimeout(() => setXPGained(false), 2000);
    };

    return (
        <motion.div layout className="relative bg-white/5 p-4 rounded-xl border border-white/5 overflow-hidden">
            <h3 className="font-bold text-app-accent">{exercise.name}</h3>
            <p className="text-sm text-gray-400 mb-2">{exercise.description}</p>
            <div className="flex justify-between items-center text-xs font-mono mb-4">
                <span className="text-gray-300">Target: {exercise.target}</span>
                <span className="text-app-accent font-bold">XP: {exercise.xpValue}</span>
            </div>
            <button onClick={handleComplete} className="w-full py-2 bg-white/10 hover:bg-app-accent hover:text-black font-bold uppercase tracking-widest text-xs rounded-lg transition-all">
                Complete Quest
            </button>
            <AnimatePresence>
                {xpGained && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: -20 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-app-bg/80 text-app-accent font-black text-2xl">
                        +{exercise.xpValue} XP!
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function QuestBoard({ equipment, onComplete }: { equipment: string, onComplete: (xp: number) => void }) {
    const filteredExercises = exercises.filter(e => e.equipment === equipment);
    const groupedExercises = {
        daily: filteredExercises.filter(e => e.type === 'daily'),
        weekly: filteredExercises.filter(e => e.type === 'weekly'),
        monthly: filteredExercises.filter(e => e.type === 'monthly'),
        general: filteredExercises.filter(e => e.type === 'general'),
    };

    return (
        <div className="p-8">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-10">Quest Board</h1>
            {Object.entries(groupedExercises).map(([type, list]) => list.length > 0 && (
                <div key={type} className="bg-app-sidebar border border-white/5 rounded-3xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4 uppercase tracking-tighter text-gray-500">{type} Quests</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {list.map(e => <QuestCard key={e.id} exercise={e} onComplete={onComplete} />)}
                    </div>
                </div>
            ))}
        </div>
    );
}
