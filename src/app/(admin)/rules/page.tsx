"use client";

import { useState, useEffect, useTransition } from "react";
import { Plus, Check, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { getRules, addRule, updateRule, deleteRule, seedDefaultRules } from "@/actions/rules";

interface Rule {
  _id: string;
  number: number;
  title: string;
  content: string;
}

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const fetchRules = async () => {
    const data = await getRules();
    setRules(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleStartEdit = (rule: Rule) => {
    setEditingId(rule._id);
    setEditTitle(rule.title);
    setEditContent(rule.content);
  };

  const handleSaveEdit = async (id: string) => {
    await updateRule(id, editTitle, editContent);
    setEditingId(null);
    fetchRules();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this rule?")) return;
    await deleteRule(id);
    fetchRules();
  };

  const handleAdd = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const fd = new FormData();
    fd.append("title", newTitle);
    fd.append("content", newContent);
    await addRule(fd);
    setNewTitle("");
    setNewContent("");
    setShowAddForm(false);
    fetchRules();
  };

  const handleSeedDefaults = async () => {
    await seedDefaultRules();
    fetchRules();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Rules & Regulations</h1>
          <p className="text-gray-500 mt-1">These rules are shown to new residents during onboarding</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Rule
        </button>
      </div>

      {/* Add Rule Form */}
      {showAddForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">New Rule</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Rule Title (e.g. 'Noise Policy')"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <textarea
              placeholder="Rule description..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                <Check className="w-4 h-4" /> Save Rule
              </button>
              <button
                onClick={() => { setShowAddForm(false); setNewTitle(""); setNewContent(""); }}
                className="flex items-center gap-2 bg-white text-gray-600 border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : rules.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
          <p className="text-gray-500 mb-4">No rules added yet.</p>
          <button onClick={handleSeedDefaults} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Load Default Rules
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {rules.map((rule) => (
              <div key={rule._id} className="p-5 hover:bg-gray-50/50 transition-colors group">
                {editingId === rule._id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-4 py-2.5 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                    />
                    <div className="flex gap-3">
                      <button onClick={() => handleSaveEdit(rule._id)} className="flex items-center gap-1.5 bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        <Check className="w-4 h-4" /> Save
                      </button>
                      <button onClick={() => setEditingId(null)} className="flex items-center gap-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {rule.number}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">{rule.title}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{rule.content}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button onClick={() => handleStartEdit(rule)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(rule._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
