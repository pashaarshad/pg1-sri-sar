"use client";

import { useState } from "react";
import { Camera, Upload, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewResidentPage() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mocking 1MB compression
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Resident</h1>
        <p className="text-gray-500 mt-1">Tenant onboarding and application</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center mb-8 gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex flex-col gap-2">
            <div className={cn(
              "h-2 w-full rounded-full transition-colors",
              s <= step ? "bg-blue-600" : "bg-gray-200"
            )} />
            <span className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              s <= step ? "text-blue-600" : "text-gray-400"
            )}>
              {s === 1 ? "Rules" : s === 2 ? "Details" : "Documents"}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Rules & Regulations</h2>
            <div className="bg-gray-50 p-6 rounded-xl text-sm text-gray-700 h-64 overflow-y-auto mb-6 border border-gray-200 leading-relaxed space-y-4">
              <p><strong>1. Rent Payment:</strong> Rent must be paid on or before the 5th of every month. Late payments may attract a penalty.</p>
              <p><strong>2. Visitors:</strong> No visitors are allowed in the rooms after 9:00 PM without prior permission from the management.</p>
              <p><strong>3. Electricity:</strong> Please turn off lights, fans, and ACs when leaving the room. Excessive usage will be billed separately.</p>
              <p><strong>4. Notice Period:</strong> A 30-day notice period is required before vacating to claim the security deposit.</p>
              <p><strong>5. Maintenance:</strong> Any damages to the property or furniture will be deducted from the security deposit.</p>
            </div>
            
            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors mb-8">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="font-medium text-gray-900 select-none">I agree to the Rules & Regulations</span>
            </label>
            
            <button 
              onClick={() => setStep(2)}
              disabled={!agreed}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-4 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Details
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="Enter full name" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="+91" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gmail Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="user@gmail.com" />
                </div>
              </div>
            </div>

            <hr className="border-gray-100 my-8" />

            <h3 className="text-lg font-bold text-gray-900 mb-4">Emergency Contact</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="Parent or Guardian name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Relation</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="e.g. Father" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Phone</label>
                <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="+91" />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button onClick={() => setStep(1)} className="px-6 py-4 font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-4 font-semibold hover:bg-blue-700 transition-colors">
                Next: Documents
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <h2 className="text-xl font-bold text-gray-900">Document Uploads</h2>
            
            {/* Photo Upload */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Resident Photo</h3>
              <p className="text-xs text-gray-500 mb-6">Face clearly visible. Max 1 MB (auto-compressed).</p>
              
              {photoPreview ? (
                <div className="relative inline-block">
                  <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md mb-4" />
                  <button onClick={() => setPhotoPreview(null)} className="absolute bottom-4 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded-full shadow-sm hover:bg-gray-800">Change</button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <label className="relative flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-6 py-4 rounded-xl font-semibold cursor-pointer hover:bg-blue-100 transition-colors">
                    <Camera className="w-5 h-5" />
                    Take Photo
                    <input type="file" accept="image/*" capture="user" className="hidden" onChange={handlePhotoCapture} />
                  </label>
                  <label className="relative flex items-center justify-center gap-2 bg-gray-50 text-gray-700 px-6 py-4 rounded-xl font-semibold cursor-pointer hover:bg-gray-100 border border-gray-200 transition-colors">
                    <Upload className="w-5 h-5" />
                    Upload from Gallery
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoCapture} />
                  </label>
                </div>
              )}
            </div>

            {/* Aadhaar Upload */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Aadhaar Card / Govt ID</h3>
              <p className="text-xs text-gray-500 mb-6">Front and back side. Max 1 MB.</p>
              
              <label className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-4 rounded-xl font-semibold cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                <Upload className="w-5 h-5 text-blue-600" />
                Upload ID Document
                <input type="file" accept="image/*,.pdf" className="hidden" />
              </label>
            </div>

            <div className="flex gap-4 pt-6">
              <button onClick={() => setStep(2)} className="px-6 py-4 font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">Back</button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white rounded-xl px-5 py-4 font-semibold hover:bg-green-700 transition-colors shadow-md shadow-green-600/20">
                <CheckCircle2 className="w-5 h-5" />
                Submit Application
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
