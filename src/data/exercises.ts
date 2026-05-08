export type Equipment = 'None/Bodyweight' | 'Minimal' | 'Dumbbells/Kettlebells' | 'Full Gym';
export type QuestType = 'daily' | 'weekly' | 'monthly' | 'general';

export interface Exercise {
  id: string;
  name: string;
  equipment: Equipment;
  xpValue: number;
  description: string;
  target: string;
  type: QuestType;
}

export const exercises: Exercise[] = [
  { id: '1', name: 'Push-ups', equipment: 'None/Bodyweight', xpValue: 225, description: 'Chest and tricep builder.', target: '3 sets of 15 reps', type: 'daily' },
  { id: '2', name: 'Squats', equipment: 'None/Bodyweight', xpValue: 300, description: 'Leg strength foundation.', target: '3 sets of 20 reps', type: 'daily' },
  { id: '3', name: 'Lunges', equipment: 'None/Bodyweight', xpValue: 180, description: 'Balance and leg strength.', target: '3 sets of 12 reps each', type: 'weekly' },
  { id: '4', name: 'Burpees', equipment: 'None/Bodyweight', xpValue: 150, description: 'High-intensity full-body move.', target: '3 sets of 10 reps', type: 'monthly' },
  { id: '5', name: 'Banded Row', equipment: 'Minimal', xpValue: 225, description: 'Back strength.', target: '3 sets of 15 reps', type: 'daily' },
  { id: '6', name: 'Pull-up', equipment: 'Minimal', xpValue: 120, description: 'Ultimate upper body strength.', target: '3 sets of 8 reps', type: 'weekly' },
  { id: '7', name: 'Dumbbell Press', equipment: 'Dumbbells/Kettlebells', xpValue: 150, description: 'Chest development.', target: '3 sets of 10 reps', type: 'daily' },
  { id: '8', name: 'Kettlebell Swing', equipment: 'Dumbbells/Kettlebells', xpValue: 300, description: 'Posterior chain explosive.', target: '3 sets of 20 reps', type: 'monthly' },
  { id: '9', name: 'Barbell Bench Press', equipment: 'Full Gym', xpValue: 75, description: 'Maximum chest strength.', target: '3 sets of 5 reps', type: 'general' },
  { id: '10', name: 'Deadlift', equipment: 'Full Gym', xpValue: 75, description: 'Full body power.', target: '3 sets of 5 reps', type: 'general' },
];
