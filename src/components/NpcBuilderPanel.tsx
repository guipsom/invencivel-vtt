import React, { useState } from 'react';
import { Skull, Shield, Heart, Zap, Plus, Trash2, Save, Sparkles, UserCheck } from 'lucide-react';

interface NpcPower {
  id: string;
  name: string;
  type: string;
  damage: number;
}

interface NpcData {
  id: string;
  name: string;
  threatLevel: 'LACAIO' | 'ELITE' | 'VILÃO PRINCIPAL';
  lifeMax: number;
  determinationMax: number;
  defense: number;
  unarmedDamage: number;
  powers: NpcPower[];
  notes: string;
}

export const NpcBuilderPanel: React.FC = () => {
  const [npcs, setNpcs] = useState<NpcData[]>([
    {
      id: 'npc-1',
      name: 'Soldado da S.H.A.D.O.W.',
      threatLevel: 'LACAIO',
      lifeMax: 4,
      determinationMax: 2,
      defense: 2,
      unarmedDamage: 1,
      powers: [{ id: 'p1', name: 'Rifle Laser', type: 'Ataque', damage: 3 }],
      notes: 'Ataca em grupo. Derrotado com apenas 1 sucesso decisivo.',
    },
  ]);

  const [form, setForm] = useState<Omit<NpcData, 'id'>>({
    name: '',
    threatLevel: 'ELITE',
    lifeMax: 6,
    determinationMax: 4,
    defense: 3,
    unarmedDamage: 2,
    powers: [],
    notes: '',
  });

  const [newPowerName, setNewPowerName] = useState('');
  const [newPowerDamage, setNewPowerDamage] = useState(2);

  const handleAddPower = () => {
    if (!newPowerName.trim()) return;
    setForm((prev) => ({
      ...prev,
      powers: [
        ...prev.powers,
        { id: Date.now().toString(), name: newPowerName, type: 'Ataque', damage: newPowerDamage },
      ],
    }));
    setNewPowerName('');
    setNewPowerDamage(2);
  };

  const handleSaveNpc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const newNpc: NpcData = {
      ...form,
      id: Date.now().toString(),
    };

    setNpcs((prev) => [...prev, newNpc]);
    setForm({
      name: '',
      threatLevel: 'ELITE',
      lifeMax: 6,
      determinationMax: 4,
      defense: 3,
      unarmedDamage: 2,
      powers: [],
      notes: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-800 space-y-6">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-rose-400 flex items-center gap-2">
            <Skull className="w-5 h-5 text-rose-400" /> Construtor de Fichas de PNJ & Ameaças
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Criação Rápida de Vilões, Elites e Lacaios para Encontros do Mestre
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORMULÁRIO DE CRIAÇÃO */}
        <form onSubmit={handleSaveNpc} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-rose-400" /> Novo PNJ / Ameaça
          </h2>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
              Nome da Ameaça
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Barão Vulcano"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
              Nível de Ameaça
            </label>
            <select
              value={form.threatLevel}
              onChange={(e) => setForm({ ...form, threatLevel: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            >
              <option value="LACAIO">Lacaio (Inimigo Comum)</option>
              <option value="ELITE">Elite (Subchefe)</option>
              <option value="VILÃO PRINCIPAL">Vilão Principal (Chefe de Arco)</option>
            </select>
          </div>

          {/* ATRIBUTOS BASE RÁPIDOS */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Vida</label>
              <input
                type="number"
                min={1}
                value={form.lifeMax}
                onChange={(e) => setForm({ ...form, lifeMax: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-center text-rose-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Det.</label>
              <input
                type="number"
                min={1}
                value={form.determinationMax}
                onChange={(e) => setForm({ ...form, determinationMax: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-center text-sky-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Defesa</label>
              <input
                type="number"
                min={1}
                value={form.defense}
                onChange={(e) => setForm({ ...form, defense: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-center text-amber-400 font-bold"
              />
            </div>
          </div>

          {/* PODERES RÁPIDOS */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <label className="block text-[10px] font-semibold text-slate-400 uppercase">Adicionar Poder/Ataque</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nome do Poder"
                value={newPowerName}
                onChange={(e) => setNewPowerName(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
              />
              <input
                type="number"
                title="Dano do Poder"
                value={newPowerDamage}
                onChange={(e) => setNewPowerDamage(parseInt(e.target.value) || 1)}
                className="w-12 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-center text-rose-400 font-bold"
              />
              <button
                type="button"
                onClick={handleAddPower}
                className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold"
              >
                +
              </button>
            </div>

            {/* LISTA DE PODERES ADICIONADOS */}
            <div className="space-y-1">
              {form.powers.map((p) => (
                <div key={p.id} className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-800 text-xs">
                  <span className="text-slate-300">{p.name}</span>
                  <span className="text-rose-400 font-bold">+{p.damage} Dano</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20"
          >
            <Save className="w-4 h-4" /> Guardar Ficha de PNJ
          </button>
        </form>

        {/* LISTA DE PNJS GUARDADOS */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Catálogo de Ameaças Prontas ({npcs.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {npcs.map((npc) => (
              <div key={npc.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-start border-b border-slate-800/80 pb-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">{npc.name}</h3>
                    <span className="text-[10px] text-rose-400 font-bold uppercase">{npc.threatLevel}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="text-rose-400 flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {npc.lifeMax}</span>
                    <span className="text-sky-400 flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> {npc.determinationMax}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">Ataques & Poderes:</span>
                  {npc.powers.map((p) => (
                    <div key={p.id} className="text-xs text-slate-300 flex justify-between">
                      <span>• {p.name}</span>
                      <span className="text-rose-400 font-semibold">Dano: {p.damage}</span>
                    </div>
                  ))}
                </div>

                {npc.notes && (
                  <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/80">
                    "{npc.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};