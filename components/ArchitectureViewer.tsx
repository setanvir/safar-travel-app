
import React, { useState } from 'react';
import { ARCHITECTURE_NODES } from '../constants';
import { ArchitectureNode } from '../types';

const ArchitectureViewer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  return (
    <div className="space-y-10">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">SAFAR Microservices Topology</h3>
            <p className="text-slate-500 max-w-2xl text-base leading-relaxed">
              Strict compliance with SRS Section 5. A service-oriented architecture (SOA) 
              built entirely in Kotlin, providing sub-300ms latency and 99.9% uptime.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Docker', 'Kubernetes', 'CI/CD', 'MySQL', 'Redis', 'Elastic'].map(tag => (
              <span key={tag} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-800 shadow-lg shadow-slate-200/50">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Diagram Area */}
        <div className="relative p-12 bg-[#0F172A] rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {ARCHITECTURE_NODES.map((node) => (
              <div 
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`group p-8 rounded-[2rem] border-2 transition-all cursor-pointer ${
                  selectedNode?.id === node.id 
                  ? 'bg-orange-600/10 border-orange-500 shadow-[0_0_40px_rgba(255,87,34,0.25)]' 
                  : 'bg-[#1E293B]/60 border-slate-800 hover:border-slate-500 hover:bg-[#1E293B]'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl ${
                    node.type === 'UI' ? 'bg-sky-500/20 text-sky-400' :
                    node.type === 'SERVICE' ? 'bg-orange-500/20 text-orange-400' :
                    node.type === 'DATABASE' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-400'
                  }`}>
                     <span className="text-[10px] font-black uppercase tracking-widest">{node.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-mono">v1.0</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                  </div>
                </div>
                <h4 className="text-xl font-black text-white group-hover:text-orange-400 transition-colors mb-2">{node.name}</h4>
                <p className="text-[12px] text-slate-400 leading-relaxed line-clamp-2">{node.description}</p>
                
                <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-wrap gap-2">
                  {node.technologies.map(tech => (
                    <span key={tech} className="text-[9px] font-black bg-slate-800 text-slate-400 px-3 py-1.5 rounded-full border border-slate-700 hover:border-slate-500 transition-all">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h4 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
             <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 italic">SQL</div>
             Data Persistence & ER Model
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Core Tables (MySQL)</h5>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex justify-between items-center"><span className="font-bold">users</span> <span className="text-[10px] text-slate-400 font-mono italic">Auth, RBAC</span></li>
                <li className="flex justify-between items-center"><span className="font-bold">bookings</span> <span className="text-[10px] text-slate-400 font-mono italic">Lifecycle</span></li>
                <li className="flex justify-between items-center"><span className="font-bold">packages</span> <span className="text-[10px] text-slate-400 font-mono italic">Catalog</span></li>
                <li className="flex justify-between items-center"><span className="font-bold">payments</span> <span className="text-[10px] text-slate-400 font-mono italic">Audit Log</span></li>
              </ul>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Indexing Strategy</h5>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-blue-100 text-blue-600 text-[10px] flex items-center justify-center font-bold">ES</div>
                  <p className="text-[11px] text-slate-600">Elasticsearch indices for fuzzy search across destinations & titles (SRS 3.2).</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-red-100 text-red-600 text-[10px] flex items-center justify-center font-bold">RD</div>
                  <p className="text-[11px] text-slate-600">Redis caching for real-time WebSocket connection session tokens (SRS 3.3).</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
          <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/30">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             Comm Protocols
          </h4>
          <div className="space-y-4 flex-1">
            {[
              { label: 'REST API', value: 'JSON over HTTP/2', note: 'Gateway to Services' },
              { label: 'WebSocket', value: 'Stomp Protocol', note: 'Real-time Updates (SRS 3.3)' },
              { label: 'Event Bus', value: 'RabbitMQ', note: 'Async Notification (SRS 3.8)' },
              { label: 'Auth', value: 'JWT + OAuth2', note: 'Bearer Strategy (SRS 4.2)' },
            ].map((comm, idx) => (
              <div key={idx} className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-black text-orange-700">{comm.label}</span>
                  <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-orange-100 text-orange-500">{comm.value}</span>
                </div>
                <p className="text-[10px] text-orange-600 italic opacity-80">{comm.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureViewer;
