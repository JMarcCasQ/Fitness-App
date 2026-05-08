export interface PersonalRecord {
    exerciseId: string;
    metric: 'reps' | 'time' | 'weight';
    value: number;
    date: string;
}
