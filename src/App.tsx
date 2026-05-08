/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { type Equipment, exercises } from './data/exercises';

function QuestCard({ exercise }: { exercise: any }) {
    const [xpGained, setXPGained] = useState(false);

    const handleComplete = () => {
        setXPGained(true);
        setTimeout(() => setXPGained(false), 2000);
    };

    return (
        <motion.div 
            layout
            className="relative bg-white/5 p-4 rounded-xl border border-white/5 overflow-hidden"
        >
            <h3 className="font-bold text-app-accent">{exercise.name}</h3>
            <p className="text-sm text-gray-400 mb-2">{exercise.description}</p>
            <div className="flex justify-between items-center text-xs font-mono mb-4">
                <span className="text-gray-300">Target: {exercise.target}</span>
                <span className="text-app-accent font-bold">XP: {exercise.xpValue}</span>
            </div>
            
            <button
                onClick={handleComplete}
                className="w-full py-2 bg-white/10 hover:bg-app-accent hover:text-black font-bold uppercase tracking-widest text-xs rounded-lg transition-all"
            >
                Complete Quest
            </button>

            <AnimatePresence>
                {xpGained && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: -20 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-app-bg/80 text-app-accent font-black text-2xl"
                    >
                        +{exercise.xpValue} XP!
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const equipmentOptions: Equipment[] = ['None/Bodyweight', 'Minimal', 'Dumbbells/Kettlebells', 'Full Gym'];

  if (!onboarded) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center p-4 bg-app-bg text-app-text"
      >
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-6 text-white">Welcome to Iron Path</h1>
        <p className="mb-8 text-gray-400">Select your available equipment:</p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
            {equipmentOptions.map((option) => (
                <button
                    key={option}
                    onClick={() => setSelectedEquipment(option)}
                    className={`px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-all ${
                        selectedEquipment === option 
                        ? 'bg-app-accent text-black scale-105' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                >
                    {option}
                </button>
            ))}
        </div>
        <button 
          onClick={() => setOnboarded(true)}
          disabled={!selectedEquipment}
          className={`px-8 py-4 bg-app-accent text-black font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:scale-105 transition-transform ${!selectedEquipment ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            Get Started
        </button>
      </motion.div>
    );
  }

  const filteredExercises = exercises.filter(e => e.equipment === selectedEquipment);

  return (
    <div className="flex w-full h-screen bg-app-bg text-app-text overflow-hidden">
      {/* Sidebar: Simplified placeholder */}
      <aside className="w-72 bg-app-sidebar border-r border-white/5 flex flex-col p-6 shrink-0">
        <h2 className="text-xl font-bold mb-8">Jax_Dagger</h2>
        <div className="text-app-accent font-bold uppercase tracking-widest text-xs">Steel Warrior</div>
        <div className="mt-4 text-sm text-gray-400">Equipment: {selectedEquipment}</div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-10">Dashboard</h1>
        <div className="bg-app-sidebar border border-white/5 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">Available Quests</h2>
            <div className="grid grid-cols-2 gap-4">
                {filteredExercises.map(e => <QuestCard key={e.id} exercise={e} />)}
            </div>
        </div>
      </main>
    </div>
  );
}

