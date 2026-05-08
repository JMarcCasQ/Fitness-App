export const getRequiredXPForLevel = (level: number) => Math.floor(1000 * level * 1.2 || 1000);

export const RANKS = [
  { minLevel: 0, minXP: 0, name: 'Novice' },
  { minLevel: 1, minXP: 1000, name: 'Iron Apprentice' },
  { minLevel: 3, minXP: 3000, name: 'Steel Warrior' },
  { minLevel: 5, minXP: 5000, name: 'Titan' },
];

export const ACHIEVEMENTS = [
  { id: 'first_quest', name: 'First Steps', description: 'Complete your first quest', goal: 1 },
  { id: 'novice_level', name: 'Rising Star', description: 'Reach Level 1', goal: 1 },
  { id: 'master_quest', name: 'Quest Master', description: 'Complete 5 quests', goal: 5 },
  { id: 'titan_level', name: 'Titan Rising', description: 'Reach Level 5', goal: 5 },
];

export const getLevel = (totalXP: number) => {
  let level = 0;
  let remainingXP = totalXP;
  while (remainingXP >= getRequiredXPForLevel(level)) {
    remainingXP -= getRequiredXPForLevel(level);
    level++;
  }
  return level;
};

export const getRank = (level: number) => {
  const rank = [...RANKS].reverse().find(r => level >= r.minLevel);
  return rank ? rank.name : 'Legend';
};
