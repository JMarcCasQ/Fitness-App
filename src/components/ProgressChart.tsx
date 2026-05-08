import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Day 1', xp: 100 },
  { name: 'Day 2', xp: 300 },
  { name: 'Day 3', xp: 500 },
  { name: 'Day 4', xp: 800 },
  { name: 'Day 5', xp: 1200 },
];

export function ProgressChart() {
  return (
    <div className="h-64 w-full bg-app-sidebar border border-white/5 rounded-3xl p-6">
      <h3 className="text-lg font-bold mb-4">Growth Chart</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={10} />
          <YAxis stroke="#6b7280" fontSize={10} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#121214', border: '1px solid #ffffff10' }} 
            itemStyle={{ color: '#FF6B00' }}
          />
          <Area type="monotone" dataKey="xp" stroke="#FF6B00" fill="#FF6B00" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
