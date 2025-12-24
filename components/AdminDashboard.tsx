
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', bookings: 40, revenue: 2400 },
  { name: 'Tue', bookings: 30, revenue: 1398 },
  { name: 'Wed', bookings: 20, revenue: 9800 },
  { name: 'Thu', bookings: 27, revenue: 3908 },
  { name: 'Fri', bookings: 18, revenue: 4800 },
  { name: 'Sat', bookings: 23, revenue: 3800 },
  { name: 'Sun', bookings: 34, revenue: 4300 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Sessions', val: '12,482', change: '+12%', color: 'blue' },
          { label: 'Platform Revenue', val: '$142.4K', change: '+8.4%', color: 'green' },
          { label: 'Pending Bookings', val: '154', change: '-5', color: 'amber' },
          { label: 'System Uptime', val: '99.99%', change: 'Stable', color: 'emerald' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{stat.val}</h3>
              <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-slate-400'}`}>
                {stat.change}
              </span>
            </div>
            <div className={`mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden`}>
              <div className={`h-full bg-${stat.color}-500 w-[70%]`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800">Booking Volume vs Revenue</h3>
            <select className="bg-slate-50 border border-slate-200 text-xs px-2 py-1 rounded">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6">Cluster Health</h3>
          <div className="space-y-6 flex-1">
            {[
              { name: 'Gateway', status: 'Healthy', load: '14%', color: 'green' },
              { name: 'User Service', status: 'Healthy', load: '32%', color: 'green' },
              { name: 'Payment Service', status: 'High Traffic', load: '88%', color: 'amber' },
              { name: 'Search Service', status: 'Healthy', load: '12%', color: 'green' },
              { name: 'Elasticsearch', status: 'Optimized', load: '45%', color: 'green' },
            ].map((svc) => (
              <div key={svc.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{svc.name}</p>
                  <p className={`text-[10px] text-${svc.color}-500 font-medium`}>{svc.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-slate-500">{svc.load}</p>
                  <div className="w-16 h-1 bg-slate-100 rounded-full mt-1">
                    <div className={`h-full bg-${svc.color}-500 rounded-full`} style={{width: svc.load}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
            View Kubernetes Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
