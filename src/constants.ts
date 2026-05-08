export const XP_PER_LEVEL = 1000;

export const RANKS = [
  { minLevel: 0, name: 'Novice' },
  { minLevel: 1, name: 'Iron Apprentice' },
  { minLevel: 3, name: 'Steel Warrior' },
  { minLevel: 5, name: 'Titan' },
];

export const getLevel = (xp: number) => Math.floor(xp / XP_PER_LEVEL);

export const getRank = (level: number) => {
  const rank = [...RANKS].reverse().find(r => level >= r.minLevel);
  return rank ? rank.name : 'Legend';
};
