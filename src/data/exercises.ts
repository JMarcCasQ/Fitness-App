export type Equipment = 'None/Bodyweight' | 'Minimal' | 'Dumbbells/Kettlebells' | 'Full Gym';
export type QuestType = 'daily' | 'skill' | 'boss';

export interface Exercise {
  id: string;
  name: string;
  equipment: Equipment;
  xpValue: number;
  description: string;
  target: string;
  type: QuestType;
  muscleGroups: string[];
  calories: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const exercises: Exercise[] = [
  { id: '1', name: 'Push-ups', equipment: 'None/Bodyweight', xpValue: 100, description: 'Chest and tricep builder.', target: '3 sets of 15 reps', type: 'daily', muscleGroups: ['Chest', 'Triceps'], calories: 15, difficulty: 'Beginner' },
  { id: '2', name: 'Squats', equipment: 'None/Bodyweight', xpValue: 100, description: 'Leg strength foundation.', target: '3 sets of 20 reps', type: 'daily', muscleGroups: ['Quads', 'Glutes'], calories: 20, difficulty: 'Beginner' },
  { id: '3', name: 'Pull-ups', equipment: 'Minimal', xpValue: 250, description: 'Ultimate upper body strength.', target: '3 sets of 8 reps', type: 'skill', muscleGroups: ['Back', 'Biceps'], calories: 25, difficulty: 'Advanced' },
  { id: '4', name: 'Burpees', equipment: 'None/Bodyweight', xpValue: 300, description: 'High-intensity full-body move.', target: '100 reps under 10 mins', type: 'boss', muscleGroups: ['Full Body'], calories: 100, difficulty: 'Advanced' },
  { id: '5', name: 'Plank', equipment: 'None/Bodyweight', xpValue: 50, description: 'Core endurance.', target: '3 mins hold', type: 'skill', muscleGroups: ['Core'], calories: 10, difficulty: 'Beginner' },
  { id: '6', name: 'Dumbbell Press', equipment: 'Dumbbells/Kettlebells', xpValue: 150, description: 'Chest development.', target: '3 sets of 10 reps', type: 'daily', muscleGroups: ['Chest', 'Triceps'], calories: 30, difficulty: 'Intermediate' },
  { id: '7', name: 'Deadlift', equipment: 'Full Gym', xpValue: 400, description: 'Full body power.', target: '3 sets of 5 reps', type: 'skill', muscleGroups: ['Back', 'Legs', 'Core'], calories: 50, difficulty: 'Advanced' },
  { id: '8', name: 'Rows', equipment: 'Minimal', xpValue: 120, description: 'Back thickness.', target: '3 sets of 12 reps', type: 'daily', muscleGroups: ['Back'], calories: 20, difficulty: 'Intermediate' },
  { id: '9', name: 'Jump Rope', equipment: 'Minimal', xpValue: 200, description: 'Cardio improvement.', target: '10 mins', type: 'daily', muscleGroups: ['Calves', 'Cardio'], calories: 100, difficulty: 'Beginner' },
  { id: '10', name: 'Mountain Climbers', equipment: 'None/Bodyweight', xpValue: 80, description: 'Fast metabolic burn.', target: '3 sets of 30 secs', type: 'daily', muscleGroups: ['Core', 'Cardio'], calories: 20, difficulty: 'Intermediate' },
  { id: '11', name: 'Bench Press', equipment: 'Full Gym', xpValue: 250, description: 'Max chest power.', target: '3 sets of 8 reps', type: 'skill', muscleGroups: ['Chest', 'Triceps'], calories: 40, difficulty: 'Intermediate' },
  { id: '12', name: 'Shoulder Press', equipment: 'Dumbbells/Kettlebells', xpValue: 150, description: 'Shoulder stability.', target: '3 sets of 10 reps', type: 'daily', muscleGroups: ['Shoulders', 'Triceps'], calories: 25, difficulty: 'Intermediate' },
  { id: '13', name: 'Bicep Curls', equipment: 'Dumbbells/Kettlebells', xpValue: 100, description: 'Bicep isolation.', target: '3 sets of 12 reps', type: 'daily', muscleGroups: ['Biceps'], calories: 15, difficulty: 'Beginner' },
  { id: '14', name: 'Kettlebell Swing', equipment: 'Dumbbells/Kettlebells', xpValue: 250, description: 'Posterior chain explosive.', target: '3 sets of 20 reps', type: 'skill', muscleGroups: ['Glutes', 'Back'], calories: 45, difficulty: 'Advanced' },
  { id: '15', name: 'Leg Raises', equipment: 'None/Bodyweight', xpValue: 80, description: 'Abdomen strength.', target: '3 sets of 15 reps', type: 'daily', muscleGroups: ['Core'], calories: 10, difficulty: 'Intermediate' },
  { id: '16', name: 'Running', equipment: 'None/Bodyweight', xpValue: 500, description: 'Cardio foundation.', target: '5km challenge', type: 'boss', muscleGroups: ['Legs', 'Cardio'], calories: 400, difficulty: 'Advanced' },
  { id: '17', name: 'Cycling', equipment: 'Full Gym', xpValue: 300, description: 'Endurance.', target: '30 mins session', type: 'daily', muscleGroups: ['Legs', 'Cardio'], calories: 300, difficulty: 'Intermediate' },
];
