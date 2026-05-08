/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { type Equipment, exercises } from './data/exercises';
import { type PersonalRecord } from './types';
import { getLevel, getRank, getRequiredXPForLevel } from './constants';
import Dashboard from './pages/Dashboard';
import QuestBoard from './pages/QuestBoard';
import RankLadder from './pages/RankLadder';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import WorkoutMode from './pages/WorkoutMode';

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
  const [userData, setUserData] = useState({
      equipment: null as Equipment | null,
      username: 'Athlete',
      avatar: '⚔️'
  });
  const [totalXP, setTotalXP] = useState(0);
  const [completedQuests, setCompletedQuests] = useState(0);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>([]);
  
  const level = getLevel(totalXP);
  const rank = getRank(level);
  let currentLevelXP = totalXP;
  let currentLevelRequired = 0;
  for (let i = 0; i < level; i++) {
    currentLevelRequired = getRequiredXPForLevel(i);
    currentLevelXP -= currentLevelRequired;
  }
  const nextLevelXP = getRequiredXPForLevel(level);
  const progressToNextLevel = (currentLevelXP / nextLevelXP) * 100;

  if (!onboarded) {
    return <Onboarding onComplete={(data) => { 
        setUserData({ equipment: data.equipment, username: data.username, avatar: data.avatar }); 
        setOnboarded(true); 
    }} />;
  }

  const filteredExercises = exercises.filter(e => e.equipment === userData.equipment);
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
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">{userData.avatar}</span>
            <h2 className="text-xl font-bold">{userData.username}</h2>
          </div>
          <div className="text-app-accent font-bold uppercase tracking-widest text-xs mb-8">{rank} (Level {level})</div>
          
          <div className="space-y-2 mb-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                  <span>XP</span>
                  <span className="text-gray-500">{currentLevelXP} / {nextLevelXP} XP</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-app-accent" style={{ width: `${progressToNextLevel}%` }}></div>
              </div>
          </div>
          
          <nav className="space-y-4">
            <Link to="/" className="block p-3 hover:bg-white/5 rounded-xl text-lg font-bold">Dashboard</Link>
            <Link to="/quests" className="block p-3 hover:bg-white/5 rounded-xl text-lg font-bold">Quests</Link>
            <Link to="/ladder" className="block p-3 hover:bg-white/5 rounded-xl text-lg font-bold">Rank Ladder</Link>
            <Link to="/profile" className="block p-3 hover:bg-white/5 rounded-xl text-lg font-bold">Profile</Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard totalXP={totalXP} personalRecords={personalRecords} />} />
            <Route path="/quests" element={<QuestBoard equipment={userData.equipment!} onComplete={(xp) => {
                setTotalXP(prev => prev + xp);
                setCompletedQuests(prev => prev + 1);
            }} />} />
            <Route path="/workout/:exerciseId" element={<WorkoutMode personalRecords={personalRecords} setPersonalRecords={setPersonalRecords} onFinish={(xp) => {
                setTotalXP(prev => prev + xp);
                setCompletedQuests(prev => prev + 1);
            }} />} />
            <Route path="/ladder" element={<RankLadder totalXP={totalXP} />} />
            <Route path="/profile" element={<Profile completedQuests={completedQuests} level={level} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

