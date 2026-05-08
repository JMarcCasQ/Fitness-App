import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { exercises } from '../data/exercises';

export default function WorkoutMode({ onFinish, personalRecords, setPersonalRecords }: { onFinish: (xp: number) => void, personalRecords: any[], setPersonalRecords: any }) {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const exercise = exercises.find(e => e.id === exerciseId);
  
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60); // 1 minute rest
  const [isActive, setIsActive] = useState(true);
  const [isPR, setIsPR] = useState(false);

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      setIsActive(false);
    }
  }, [isActive, timeRemaining]);

  if (!exercise) return <div>Exercise not found</div>;

  const handleFinish = () => {
    // Check if PR exists
    const currentRecord = personalRecords.find(pr => pr.exerciseId === exerciseId && pr.metric === 'reps');
    if (!currentRecord || reps > currentRecord.value) {
        setIsPR(true);
        setPersonalRecords([...personalRecords.filter(pr => pr.exerciseId !== exerciseId || pr.metric !== 'reps'), { exerciseId, metric: 'reps', value: reps, date: new Date().toISOString() }]);
        setTimeout(() => {
            onFinish(exercise.xpValue * (sets || 1));
            navigate('/');
        }, 3000);
    } else {
        onFinish(exercise.xpValue * (sets || 1));
        navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 bg-app-bg text-white p-6 flex flex-col items-center justify-center">
      {isPR && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
             <div className="text-center font-black italic text-6xl text-app-accent">NEW PR!</div>
          </motion.div>
      )}
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">{exercise.name}</h1>
      
      <div className="grid grid-cols-2 gap-8 w-full max-w-sm mb-8">
        <div className="bg-white/5 p-6 rounded-2xl text-center">
            <div className="text-5xl font-black">{sets}</div>
            <div className="text-gray-400">Sets</div>
            <button onClick={() => setSets(s => s + 1)} className="mt-4 w-full py-2 bg-app-accent rounded-lg font-bold">+</button>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl text-center">
            <div className="text-5xl font-black">{reps}</div>
            <div className="text-gray-400">Reps</div>
            <button onClick={() => setReps(r => r + 1)} className="mt-4 w-full py-2 bg-app-accent rounded-lg font-bold">+</button>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="text-2xl font-mono text-gray-500">Rest Timer</div>
        <div className="text-6xl font-black tabular-nums">{timeRemaining}s</div>
      </div>

      <button onClick={handleFinish} className="w-full max-w-sm py-4 bg-app-accent text-black font-bold uppercase rounded-full">Finish Workout</button>
    </div>
  );
}
