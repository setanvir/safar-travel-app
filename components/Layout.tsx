
import React from 'react';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', name: 'Portal', icon: ICONS.Plane },
    { id: 'architecture', name: 'Architecture', icon: ICONS.Server },
    { id: 'code', name: 'Source Explorer', icon: ICONS.Code },
    { id: 'admin', name: 'Admin Dashboard', icon: ICONS.Shield },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
            <span className="text-blue-500 underline decoration-2">S</span>AFAR
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-medium">Enterprise Travel Core</p>
        </div>
        
        <div className="flex-1 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full px-6 py-3 flex items-center gap-3 transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white font-semibold' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <tab.icon />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 text-[10px] text-slate-500 text-center">
          Kotlin Microservices Engine v1.0.0-PROD
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 bg-slate-50 overflow-auto h-screen relative">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h2>
            <div className="flex items-center gap-2 text-xs text-green-600">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              K8s Cluster: Healthy
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 rounded-lg px-3 py-1.5 flex items-center gap-2 border border-slate-200">
              <span className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-600">JD</span>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold">Jane Doe</p>
                <p className="text-[10px] text-slate-500">Global Admin</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
