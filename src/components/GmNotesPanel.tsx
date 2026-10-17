import React, { useState } from 'react';
import { BookOpen, Upload, Eye, EyeOff, FileText, Lock, Plus, Save, Trash2, Check } from 'lucide-react';

interface CampaignDocument {
  id: string;
  title: string;
  fileName: string;
  uploadedAt: string;
  size: string;
}

interface SecretNote {
  id: string;
  title: string;
  content: string;
  isRevealedToPlayers: boolean;
}

export const GmNotesPanel: React.FC = () => {
  const [documents, setDocuments] = useState<CampaignDocument[]>([
    {
      id: 'doc-1',
      title: 'Aventuras na Cidade das Sombras - Ato I',
      fileName: 'ato1_cidade_sombras.pdf',
      uploadedAt: '12/10/2026',
      size: '2.4 MB',
    },
  ]);

  const [notes, setNotes] = useState<SecretNote[]>([
    {
      id: 'note-1',
      title: 'Segredo do Doutor Kaos',
      content: 'O Doutor Kaos não quer destruir a cidade, apenas desativar a rede elétrica para libertar a inteligência artificial confinada no mainframe.',
      isRevealedToPlayers: false,
    },
    {
      id: 'note-2',
      title: 'Localização do Esconderijo Secreto',
      content: 'O esconderijo fica sob a estação abandonada do metrô da Linha 4.',
      isRevealedToPlayers: true,
    },
  ]);

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const newNote: SecretNote = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      isRevealedToPlayers: false,
    };

    setNotes((prev) => [...prev, newNote]);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleToggleReveal = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRevealedToPlayers: !n.isRevealedToPlayers } : n))
    );
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-800 space-y-6">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-indigo-400 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> Anotações do Mestre & Documentos de Campanha
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestão de PDFs de Aventuras • Bloco de Notas Secretas • Revelação Narrativa para Jogadores
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SEÇÃO DE UPLOAD E DOCUMENTOS */}
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-indigo-400" /> Upload de Aventuras
            </h2>

            <div className="border-2 border-dashed border-slate-800 hover:border-indigo-600/50 rounded-lg p-6 text-center cursor-pointer transition">
              <FileText className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <span className="block text-xs font-semibold text-slate-300">
                Arraste ficheiros PDF, DOCX ou TXT
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Tamanho máximo: 25MB</span>
            </div>
          </div>

          {/* LISTA DE DOCUMENTOS CARREGADOS */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Documentos de Apoio ({documents.length})
            </h2>

            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-200">{doc.title}</h3>
                      <span className="text-[10px] text-slate-500">
                        {doc.fileName} • {doc.size}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BLOCO DE NOTAS SECRETAS */}
        <div className="lg:col-span-2 space-y-4">
          {/* CRIAR NOVA NOTA */}
          <form onSubmit={handleAddNote} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-indigo-400" /> Nova Nota Secreta
            </h2>

            <input
              type="text"
              required
              placeholder="Título do Segredo / Pista..."
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />

            <textarea
              rows={3}
              required
              placeholder="Conteúdo confidencial para o Mestre..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-500"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <Save className="w-4 h-4" /> Guardar Nota
              </button>
            </div>
          </form>

          {/* LISTA DE NOTAS */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Notas Guardadas ({notes.length})
            </h2>

            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`p-4 rounded-xl border transition ${
                    note.isRevealedToPlayers
                      ? 'bg-emerald-950/20 border-emerald-800/60'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-start border-b border-slate-800/80 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <h3 className="font-bold text-sm text-slate-100">{note.title}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleReveal(note.id)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold border transition flex items-center gap-1 ${
                          note.isRevealedToPlayers
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {note.isRevealedToPlayers ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-400" /> Revelado aos Jogadores
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" /> Secreto (Apenas Mestre)
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};