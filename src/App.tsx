import React, { useState } from 'react';
import { Shield, Users, Map, BookOpen, Music, FileDown } from 'lucide-react';
import { StatusConditionsPanel } from './components/StatusConditionsPanel';
import { NpcBuilderPanel } from './components/NpcBuilderPanel';
import { GmNotesPanel } from './components/GmNotesPanel';
import { AudioPanel } from './components/AudioPanel';

export function App() {
  const [activeTab, setActiveTab] = useState<'status' | 'npc' | 'notes' | 'audio'>('status');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* BARRA DE NAVEGAÇÃO / CABEÇALHO */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-slate-100 tracking-wider">
                INVENCÍVEL <span className="text-amber-400">VTT</span>
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                RPG de Super-Heróis • Painel do Mestre & Jogador
              </p>
            </div>
          </div>

          {/* MENUS DE NAVEGAÇÃO */}
          <nav className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('status')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'status'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Shield className="w-4 h-4" /> Condições & Status
            </button>

            <button
              onClick={() => setActiveTab('npc')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'npc'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Users className="w-4 h-4" /> Criaturas & PNJs
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'notes'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Notas & Aventuras
            </button>

            <button
              onClick={() => setActiveTab('audio')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'audio'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Music className="w-4 h-4" /> Áudio & SFX
            </button>
          </nav>
        </div>
      </header>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-6">
        {activeTab === 'status' && <StatusConditionsPanel />}
        {activeTab === 'npc' && <NpcBuilderPanel />}
        {activeTab === 'notes' && <GmNotesPanel />}
        {activeTab === 'audio' && <AudioPanel />}
      </main>

      {/* RODAPÉ */}
      <footer className="border-t border-slate-900 bg-slate-950 p-4 text-center text-xs text-slate-600">
        Invencível RPG VTT • Desenvolvido para sessões táticas de super-heróis
      </footer>
    </div>
  );
}

export default App;