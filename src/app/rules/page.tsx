"use client";

import { useState } from "react";
import { Plus, Check, Edit2, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const initialRules = [
  "Rent must be paid on or before the 5th of every month. Late payments may attract a penalty.",
  "No visitors are allowed in the rooms after 9:00 PM without prior permission from the management.",
  "Please turn off lights, fans, and ACs when leaving the room. Excessive usage will be billed separately.",
  "A 30-day notice period is required before vacating to claim the security deposit.",
  "Any damages to the property or furniture will be deducted from the security deposit.",
  "Smoking and alcohol consumption are strictly prohibited on the premises.",
];

export default function RulesPage() {
  const [rules, setRules] = useState(initialRules);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(rules[index]);
  };

  const handleSave = (index: number) => {
    const newRules = [...rules];
    newRules[index] = editValue;
    setRules(newRules);
    setEditingIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Rules & Regulations</h1>
          <p className="text-gray-500 mt-1">These rules are shown to new residents during onboarding</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Add Rule
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center text-sm font-semibold text-gray-600">
          <span>Rule Description</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-gray-100">
          {rules.map((rule, index) => (
            <div key={index} className="p-4 sm:p-5 flex items-start gap-4 hover:bg-gray-50/50 transition-colors group">
              <div className="mt-1 cursor-grab text-gray-400 hover:text-gray-600 hidden sm:block">
                <GripVertical className="w-5 h-5" />
              </div>
              <div className="flex-1">
                {editingIndex === index ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <textarea 
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 p-3 border border-blue-300 focus:ring-2 focus:ring-blue-500 rounded-lg text-sm bg-white outline-none resize-none"
                      rows={3}
                    />
                    <div className="flex sm:flex-col gap-2">
                      <button 
                        onClick={() => handleSave(index)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                        <Check className="w-4 h-4" /> Save
                      </button>
                      <button 
                        onClick={() => setEditingIndex(null)}
                        className="flex-1 sm:flex-none flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-gray-900 mt-0.5">{index + 1}.</span>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">{rule}</p>
                  </div>
                )}
              </div>
              
              {editingIndex !== index && (
                <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(index)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
