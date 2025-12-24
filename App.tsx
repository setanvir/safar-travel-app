
import React, { useState, useRef } from 'react';
import Layout from './components/Layout';
import ArchitectureViewer from './components/ArchitectureViewer';
import SourceExplorer from './components/SourceExplorer';
import AdminDashboard from './components/AdminDashboard';
import { MOCK_PACKAGES } from './constants';
import { askSafarArchitect } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const aiInputRef = useRef<HTMLInputElement>(null);

  const handleAiAsk = async () => {
    const val = aiInputRef.current?.value;
    if (!val) return;
    setIsAiLoading(true);
    setAiResponse(null);
    const resp = await askSafarArchitect(val);
    setAiResponse(resp);
    setIsAiLoading(false);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'home' && (
        <div className="space-y-16 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {/* SRS-Branded Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-orange-50 px-5 py-2.5 rounded-[1.25rem] text-[11px] font-black text-orange-600 border border-orange-100 tracking-[0.2em] shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse shadow-[0_0_8px_rgba(255,87,34,0.5)]"></span>
                KOTLIN-BASED TRAVEL CORE
              </div>
              <h2 className="text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
                SAFAR <br/>
                <span className="text-orange-600">Booking Engine</span>
              </h2>
              <p className="text-slate-500 text-xl leading-relaxed max-w-xl">
                A high-performance travel marketplace ecosystem. Developed entirely in <strong>Kotlin</strong>, powered by <strong>Spring Boot 3</strong> microservices, and delivered via <strong>Compose Multiplatform</strong>.
              </p>
              <div className="flex flex-wrap gap-5">
                <button 
                  onClick={() => setActiveTab('code')}
                  className="bg-slate-900 text-white px-10 py-5 rounded-[1.75rem] font-black text-sm hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 uppercase tracking-widest"
                >
                  Source Explorer
                </button>
                <button 
                  onClick={() => setActiveTab('architecture')}
                  className="bg-white text-slate-900 border-2 border-slate-200 px-10 py-5 rounded-[1.75rem] font-black text-sm hover:bg-slate-50 transition-all uppercase tracking-widest"
                >
                  Architectural Spec
                </button>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-6 bg-orange-600/5 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
              <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl relative z-10 transition-transform duration-700 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-10">
                  <h4 className="font-black text-slate-900 text-lg tracking-tight">System Initialization</h4>
                  <div className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[9px] font-black tracking-widest border border-green-100">PROD-READY</div>
                </div>
                <div className="space-y-5">
                  {[
                    { label: 'safar-user-service', type: 'JWT AUTH', status: 'Online' },
                    { label: 'safar-booking-service', type: 'CO-ROUTINES', status: 'Online' },
                    { label: 'safar-payment-service', type: 'GATEWAY INT', status: 'Online' },
                    { label: 'safar-search-service', type: 'ELASTICSEARCH', status: 'Indexing' },
                  ].map((mod) => (
                    <div key={mod.label} className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.75rem] border border-slate-100 hover:border-orange-200 transition-colors">
                      <div>
                        <p className="text-sm font-black text-slate-800">{mod.label}</p>
                        <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest mt-0.5">{mod.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-900">{mod.status}</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics from SRS 4.1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {[
               { label: 'Latency', val: '< 300ms', desc: 'SRS 4.1: 90% Response Target' },
               { label: 'Availability', val: '99.9%', desc: 'SRS 4.4: High-Reliability Spec' },
               { label: 'Concurrency', val: '10K+', desc: 'Parallel Coroutine Threads' }
             ].map((m, i) => (
               <div key={i} className="bg-orange-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-orange-200 transition-transform hover:scale-105 duration-500">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">{m.label}</p>
                 <h3 className="text-4xl font-black mb-2">{m.val}</h3>
                 <p className="text-xs font-medium opacity-70 italic">{m.desc}</p>
               </div>
             ))}
          </div>

          <div className="pt-20 border-t border-slate-200 flex flex-col items-center">
             <h3 className="font-black text-slate-300 text-sm uppercase tracking-[0.5em] mb-16">Enterprise Integration Ecosystem</h3>
             <div className="flex flex-wrap justify-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                {['PayPal', 'Stripe', 'SSLCommerz', 'Twilio', 'Firebase', 'Maps'].map(tech => (
                  <div key={tech} className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-3xl border-2 border-slate-100 flex items-center justify-center shadow-sm">
                      <span className="text-slate-900 font-black text-xs">{tech[0]}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tech}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {activeTab === 'architecture' && <ArchitectureViewer />}
      {activeTab === 'code' && <SourceExplorer />}
      {activeTab === 'admin' && <AdminDashboard />}

      {/* AI Architectural Assistant */}
      <div className={`fixed bottom-10 right-10 z-50 transition-all duration-500 ${isAiOpen ? 'w-[480px]' : 'w-auto'}`}>
        {!isAiOpen ? (
          <button 
            onClick={() => setIsAiOpen(true)}
            className="w-16 h-16 bg-orange-600 text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform ring-8 ring-orange-100/50"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-slate-200 overflow-hidden flex flex-col max-h-[650px] ring-1 ring-slate-200/50">
            <div className="bg-[#0F172A] p-8 text-white flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h4 className="font-black text-base tracking-tight">SAFAR Dev Assistant</h4>
                  <p className="text-[10px] text-orange-400 uppercase tracking-[0.2em] font-black">Architecture Engine v2.4</p>
                </div>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-xl">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-1 p-8 overflow-auto bg-slate-50 min-h-[400px]">
              {aiResponse ? (
                <div className="prose prose-sm prose-slate max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br/>') }} className="text-slate-700 leading-relaxed text-[13px] whitespace-pre-wrap font-sans" />
                </div>
              ) : isAiLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                  <div className="text-center">
                    <p className="text-sm font-black text-slate-900 animate-pulse uppercase tracking-widest">Compiling Architectural Logic</p>
                    <p className="text-[10px] text-slate-400 mt-1">Applying Kotlin Coroutines patterns...</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-10 space-y-6">
                  <div className="w-20 h-20 bg-white rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-slate-900 font-black text-lg">System Design Consultant</h5>
                    <p className="text-sm text-slate-500 leading-relaxed mt-2 max-w-[250px] mx-auto">Query the system for MySQL schemas, Spring Security config, or KMP state management.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-slate-100 bg-white">
              <div className="flex gap-3">
                <input 
                  ref={aiInputRef}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
                  type="text" 
                  placeholder="Ask for SRS-specific implementations..."
                  className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-6 py-4 text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all placeholder:text-slate-400 font-medium"
                />
                <button 
                  disabled={isAiLoading}
                  onClick={handleAiAsk}
                  className="bg-orange-600 text-white w-14 h-14 rounded-[1.5rem] hover:bg-orange-700 disabled:opacity-50 transition-all flex items-center justify-center shadow-xl shadow-orange-500/30"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
