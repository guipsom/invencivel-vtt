import React, { useState } from 'react';
import { ShieldAlert, Flame, Zap, EyeOff, Lock, AlertCircle, Plus, Trash2 } from 'lucide-react';

interface Condition {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  durationRounds: number; // Duração em rodadas (-1 para permanente até remoção)
}

interface CombatantStatus {
  id: string;
  name: string;
  activeConditions: Condition[];
}

export const StatusConditionsPanel: React.FC = () => {
  const availableConditions: Omit<Condition, 'durationRounds'>[] = [
    { id: 'stunned', name: 'Atordoado', icon: 'Zap', color: 'bg-amber-950 text-amber-300 border-amber-800', description: 'Perde a próxima ação na rodada.' },
    { id: 'prone', name: 'Caído', icon: 'Lock', color: 'bg-slate-800 text-slate-300 border-slate-700', description: 'Sofre penalidade em defesa contra ataques corpo a corpo.' },
    { id: 'burning', name: 'Em Chamas', icon: 'Flame', color: 'bg-rose-950 text-rose-300 border-rose-800', description: 'Recebe dano contínuo de fogo no início de cada turno.' },
    { id: 'blinded', name: 'Cego', icon: 'EyeOff', color: 'bg-purple-950 text-purple-300 border-purple-800', description: 'Falha automática em testes de visão e penalidade extrema em ataques.' },
    { id: 'vulnerable', name: 'Vulnerável', icon: 'ShieldAlert', color: 'bg-red-950 text-red-300 border-red-800', description: 'Sua defesa base é reduzida à metade.' },
  ];

  const [combatants, setCombatants] = useState<CombatantStatus[]>([
    {
      id: '1',
      name: 'Vanguarda',
      activeConditions: [
        { ...availableConditions[0], durationRounds: 1 }, // Atordoado
      ],
    },
    {
      id: '2',
      name: 'Vilão Principal',
      activeConditions: [
        { ...availableConditions[2], durationRounds: 3 }, // Em Chamas
      ],
    },
  ]);

  const [selectedCombatantId, setSelectedCombatantId] = useState<string>('1');
  const [selectedConditionId, setSelectedConditionId] = useState<string>('burning');
  const [durationInput, setDurationInput] = useState<number>(2);

  const handleAddCondition = () => {
    const conditionBase = availableConditions.find((c) => c.id === selectedConditionId);
    if (!conditionBase) return;

    setCombatants((prev) =>
      prev.map((c) => {
        if (c.id === selectedCombatantId) {
          const exists = c.activeConditions.some((ac) => ac.id === conditionBase.id);
          if (exists) return c;
          return {
            ...c,
            activeConditions: [
              ...c.activeConditions,
              { ...conditionBase, durationRounds: durationInput },
            ],
          };
        }
        return c;
      })
    );
  };

  const handleRemoveCondition = (combatantId: string, conditionId: string) => {
    setCombatants((prev) =>
      prev.map((c) => {
        if (c.id === combatantId) {
          return {
            ...c,
            activeConditions: c.activeConditions.filter((ac) => ac.id !== conditionId),
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-800 space-y-6">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-amber-400 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" /> Gestão de Condições & Status Tácticos
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Aplicação e Monitorização de Efeitos Negativos e Condições de Combate
          </p>
        </div>
      </div>

      {/* FORMULÁRIO DE APLICAÇÃO RÁPIDA DE CONDIÇÃO */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* SELEÇÃO DO COMBATENTE */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
              Alvo
            </label>
            <select
              value={selectedCombatantId}
              onChange={(e) => setSelectedCombatantId(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {combatants.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* SELEÇÃO DA CONDIÇÃO */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
              Condição
            </label>
            <select
              value={selectedConditionId}
              onChange={(e) => setSelectedConditionId(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {availableConditions.map((cond) => (
                <option key={cond.id} value={cond.id}>
                  {cond.name}
                </option>
              ))}
            </select>
          </div>

          {/* DURAÇÃO (RODADAS) */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
              Duração (Rodadas)
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={durationInput}
              onChange={(e) => setDurationInput(parseInt(e.target.value) || 1)}
              className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-center text-amber-400 font-bold focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleAddCondition}
          className="w-full md:w-auto px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20"
        >
          <Plus className="w-4 h-4" /> Aplicar Condição
        </button>
      </div>

      {/* LISTA DE COMBATENTES E CONDIÇÕES ATIVAS */}
      <div className="space-y-4">
        {combatants.map((combatant) => (
          <div
            key={combatant.id}
            className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3"
          >
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <h3 className="font-bold text-sm text-slate-200">{combatant.name}</h3>
              <span className="text-[10px] text-slate-500">
                {combatant.activeConditions.length} Condição(ões) Ativa(s)
              </span>
            </div>

            {/* BADGES DAS CONDIÇÕES */}
            <div className="flex flex-wrap gap-2">
              {combatant.activeConditions.length === 0 ? (
                <span className="text-xs text-slate-500 italic">Nenhuma condição ativa.</span>
              ) : (
                combatant.activeConditions.map((cond) => (
                  <div
                    key={cond.id}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${cond.color}`}
                  >
                    <span className="font-semibold">{cond.name}</span>
                    <span className="text-[10px] opacity-75">({cond.durationRounds} rod.)</span>
                    <button
                      onClick={() => handleRemoveCondition(combatant.id, cond.id)}
                      className="ml-1 hover:opacity-100 opacity-60 transition"
                      title="Remover Condição"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};