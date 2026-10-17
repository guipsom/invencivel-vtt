import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Flame, Zap, Shield, Play, Pause, Disc } from 'lucide-react';

interface SoundEffect {
  id: string;
  name: string;
  category: string;
  icon: string;
}

interface AmbientTrack {
  id: string;
  title: string;
  genre: string;
  duration: string;
  isPlaying: boolean;
}

export const AudioPanel: React.FC = () => {
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [tracks, setTracks] = useState<AmbientTrack[]>([
    { id: 't1', title: 'Perseguição Noturna na Cidade', genre: 'Ação / Cyberpunk', duration: '03:45', isPlaying: true },
    { id: 't2', title: 'Laboratório Abandonado', genre: 'MISTÉRIO', duration: '04:20', isPlaying: false },
    { id: 't3', title: 'Confronto Epico - Vilão Principal', genre: 'COMBATEÉPICO', duration: '05:10', isPlaying: false },
  ]);

  const soundEffects: SoundEffect[] = [
    { id: 'sfx1', name: 'Impacto / Pancada', category: 'Combate', icon: 'Shield' },
    { id: 'sfx2', name: 'Explosão de Energia', category: 'Poderes', icon: 'Flame' },
    { id: 'sfx3', name: 'Raio / Eletricidade', category: 'Poderes', icon: 'Zap' },
  ];

  const togglePlayTrack = (id: string) => {
    setTracks((prev) =>
      prev.map((t) => ({
        ...t,
        isPlaying: t.id === id ? !t.isPlaying : false,
      }))
    );
  };

  const handlePlaySfx = (name: string) => {
    // Dispara a reprodução do efeito sonoro na sala do VTT via WebSocket
    console.log(`Reproduzindo SFX: ${name}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-800 space-y-6">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-indigo-400 flex items-center gap-2">
            <Music className="w-5 h-5 text-indigo-400" /> Painel de Áudio & Efeitos Sonoros (SFX)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Música de Ambiente Sincronizada • Disparo Rápido de Efeitos em Combate
          </p>
        </div>

        {/* CONTROLE DE VOLUME MASTER */}
        <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-slate-400 hover:text-slate-200 transition"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-indigo-400" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseInt(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-24 accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-bold text-slate-300 w-8 text-right">
            {isMuted ? '0%' : `${volume}%`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TRILHAS AMBIENTES */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Disc className="w-4 h-4 text-indigo-400" /> Trilhas de Fundo
          </h2>

          <div className="space-y-2">
            {tracks.map((track) => (
              <div
                key={track.id}
                className={`p-3 rounded-lg border flex items-center justify-between transition ${
                  track.isPlaying
                    ? 'bg-indigo-950/40 border-indigo-600'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-200">{track.title}</h3>
                  <span className="text-[10px] text-indigo-300 font-semibold">{track.genre}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-500">{track.duration}</span>
                  <button
                    onClick={() => togglePlayTrack(track.id)}
                    className={`p-2 rounded-full transition ${
                      track.isPlaying
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {track.isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EFEITOS SONOROS RÁPIDOS (SFX) */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Disparo de SFX de Combate
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {soundEffects.map((sfx) => (
              <button
                key={sfx.id}
                onClick={() => handlePlaySfx(sfx.name)}
                className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 rounded-xl text-left transition flex items-center gap-3 group"
              >
                <div className="p-2 bg-indigo-950 text-indigo-400 rounded-lg group-hover:scale-110 transition-transform">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-200">{sfx.name}</span>
                  <span className="text-[10px] text-slate-500">{sfx.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};