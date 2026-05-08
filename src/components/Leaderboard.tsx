export function Leaderboard() {
  const users = [
    { name: 'Jax_Dagger', xp: 12450, rank: 'Titan' },
    { name: 'Iron_Master', xp: 10200, rank: 'Steel Warrior' },
    { name: 'Fit_Ghost', xp: 8700, rank: 'Steel Warrior' },
  ];

  return (
    <div className="bg-app-sidebar border border-white/5 rounded-3xl p-6">
      <h3 className="text-lg font-bold mb-4">Leaderboard</h3>
      <div className="space-y-4">
        {users.map((user, i) => (
          <div key={user.name} className="flex justify-between items-center text-sm">
            <span className={i === 0 ? 'text-app-accent font-bold' : ''}>{i + 1}. {user.name}</span>
            <span className="font-mono text-gray-400">{user.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}
