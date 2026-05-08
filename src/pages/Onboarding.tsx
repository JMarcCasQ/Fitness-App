import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { type Equipment } from '../data/exercises';

export default function Onboarding({ onComplete }: { onComplete: (data: any) => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    equipment: null as Equipment | null,
    goal: '',
    difficulty: '',
    username: '',
    avatar: '⚔️'
  });

  const steps = [
    { title: 'Welcome to Iron Path', subtitle: 'Embark on your fitness journey to reach legendary status.' },
    { title: 'Select Equipment', subtitle: 'What do you have access to?' },
    { title: 'Fitness Goal', subtitle: 'Define your main objective.' },
    { title: 'Difficulty', subtitle: 'What is your current fitness level?' },
    { title: 'Create Athlete Profile', subtitle: 'Who are you?' }
  ];

  const goNext = () => setStep(prev => prev + 1);
  
  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center">
            <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4 text-white">Iron Path</h1>
            <p className="text-gray-400 mb-8">Fitness RPG</p>
            <button onClick={goNext} className="px-8 py-4 bg-app-accent text-black font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:scale-105 transition-transform">Get Started</button>
          </motion.div>
        );
      case 1:
        const equipmentOptions: Equipment[] = ['None/Bodyweight', 'Minimal', 'Dumbbells/Kettlebells', 'Full Gym'];
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {equipmentOptions.map(opt => (
                <button key={opt} onClick={() => setData({...data, equipment: opt})} className={`p-4 rounded-xl border ${data.equipment === opt ? 'bg-app-accent text-black' : 'bg-white/5 border-white/5'}`}>{opt}</button>
              ))}
            </div>
            <button onClick={goNext} disabled={!data.equipment} className="w-full py-4 bg-app-accent text-black rounded-full font-bold">Next</button>
          </motion.div>
        );
      case 2:
        const goals = ['Strength', 'Endurance', 'Weight Loss', 'Muscle Gain'];
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {goals.map(goal => (
                <button key={goal} onClick={() => setData({...data, goal})} className={`p-4 rounded-xl border ${data.goal === goal ? 'bg-app-accent text-black' : 'bg-white/5 border-white/5'}`}>{goal}</button>
              ))}
            </div>
            <button onClick={goNext} disabled={!data.goal} className="w-full py-4 bg-app-accent text-black rounded-full font-bold">Next</button>
          </motion.div>
        );
      case 3:
        const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex flex-col gap-4 mb-8">
              {difficulties.map(diff => (
                <button key={diff} onClick={() => setData({...data, difficulty: diff})} className={`p-4 rounded-xl border ${data.difficulty === diff ? 'bg-app-accent text-black' : 'bg-white/5 border-white/5'}`}>{diff}</button>
              ))}
            </div>
            <button onClick={goNext} disabled={!data.difficulty} className="w-full py-4 bg-app-accent text-black rounded-full font-bold">Next</button>
          </motion.div>
        );
      case 4:
        const avatars = ['⚔️', '🛡️', '🧙‍♂️', '🏹'];
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <input type="text" value={data.username} onChange={(e) => setData({...data, username: e.target.value})} placeholder="Enter Username" className="w-full p-4 bg-white/5 border border-white/5 rounded-xl mb-4 text-white" />
            <div className="flex justify-center gap-4 mb-8">
              {avatars.map(av => (
                <button key={av} onClick={() => setData({...data, avatar: av})} className={`p-4 text-3xl rounded-full ${data.avatar === av ? 'bg-app-accent' : 'bg-white/5'}`}>{av}</button>
              ))}
            </div>
            <button onClick={() => onComplete(data)} disabled={!data.username} className="w-full py-4 bg-app-accent text-black rounded-full font-bold">Complete Training</button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-app-bg text-app-text">
        <div className="w-full max-w-md bg-app-sidebar p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-black italic uppercase mb-2">{steps[step].title}</h2>
            <p className="text-gray-400 mb-8">{steps[step].subtitle}</p>
            {renderStep()}
        </div>
    </div>
  );
}
