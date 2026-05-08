export type Equipment = 'None/Bodyweight' | 'Minimal' | 'Dumbbells/Kettlebells' | 'Full Gym';

export interface Exercise {
  id: string;
  name: string;
  equipment: Equipment;
  xpValue: number;
  description: string;
  target: string;
}

export const exercises: Exercise[] = [
  { id: '1', name: 'Push-ups', equipment: 'None/Bodyweight', xpValue: 10, description: 'Chest and tricep builder.', target: '3 sets of 15 reps' },
  { id: '2', name: 'Squats', equipment: 'None/Bodyweight', xpValue: 10, description: 'Leg strength foundation.', target: '3 sets of 20 reps' },
  { id: '3', name: 'Lunges', equipment: 'None/Bodyweight', xpValue: 10, description: 'Balance and leg strength.', target: '3 sets of 12 reps each' },
  { id: '4', name: 'Burpees', equipment: 'None/Bodyweight', xpValue: 20, description: 'High-intensity full-body move.', target: '3 sets of 10 reps' },
  { id: '5', name: 'Banded Row', equipment: 'Minimal', xpValue: 15, description: 'Back strength.', target: '3 sets of 15 reps' },
  { id: '6', name: 'Pull-up', equipment: 'Minimal', xpValue: 30, description: 'Ultimate upper body strength.', target: '3 sets of 8 reps' },
  { id: '7', name: 'Dumbbell Press', equipment: 'Dumbbells/Kettlebells', xpValue: 25, description: 'Chest development.', target: '3 sets of 10 reps' },
  { id: '8', name: 'Kettlebell Swing', equipment: 'Dumbbells/Kettlebells', xpValue: 25, description: 'Posterior chain explosive.', target: '3 sets of 20 reps' },
  { id: '9', name: 'Barbell Bench Press', equipment: 'Full Gym', xpValue: 40, description: 'Maximum chest strength.', target: '3 sets of 5 reps' },
  { id: '10', name: 'Deadlift', equipment: 'Full Gym', xpValue: 50, description: 'Full body power.', target: '3 sets of 5 reps' },
];
