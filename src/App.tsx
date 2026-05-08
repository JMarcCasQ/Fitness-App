/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { type Equipment, exercises } from './data/exercises';
import { getLevel, getRank, XP_PER_LEVEL } from './constants';
import Dashboard from './pages/Dashboard';
import QuestBoard from './pages/QuestBoard';

function QuestCard({ exercise, onComplete }: { exercise: any, onComplete: (xp: number) => void }) {
    const [xpGained, setXPGained] = useState(false);

    const handleComplete = () => {
        onComplete(exercise.xpValue);
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
  const [totalXP, setTotalXP] = useState(0);

  const level = getLevel(totalXP);
  const rank = getRank(level);
  const xpInLevel = totalXP % XP_PER_LEVEL;
  const progressToNextLevel = (xpInLevel / XP_PER_LEVEL) * 100;

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
  const groupedExercises = {
    daily: filteredExercises.filter(e => e.type === 'daily'),
    weekly: filteredExercises.filter(e => e.type === 'weekly'),
    monthly: filteredExercises.filter(e => e.type === 'monthly'),
    general: filteredExercises.filter(e => e.type === 'general'),
  };

  return (
    <Router>
      <div className="flex w-full h-screen bg-app-bg text-app-text overflow-hidden">
        <aside className="w-72 bg-app-sidebar border-r border-white/5 flex flex-col p-6 shrink-0">
          <h2 className="text-xl font-bold mb-2">Jax_Dagger</h2>
          <div className="text-app-accent font-bold uppercase tracking-widest text-xs mb-8">{rank} (Level {level})</div>
          
          <div className="space-y-2 mb-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                  <span>XP</span>
                  <span className="text-gray-500">{xpInLevel} / {XP_PER_LEVEL}</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-app-accent" style={{ width: `${progressToNextLevel}%` }}></div>
              </div>
          </div>
          
          <nav className="space-y-4">
            <Link to="/" className="block p-3 hover:bg-white/5 rounded-xl text-lg font-bold">Dashboard</Link>
            <Link to="/quests" className="block p-3 hover:bg-white/5 rounded-xl text-lg font-bold">Quests</Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard totalXP={totalXP} />} />
            <Route path="/quests" element={<QuestBoard equipment={selectedEquipment!} onComplete={(xp) => setTotalXP(prev => prev + xp)} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

