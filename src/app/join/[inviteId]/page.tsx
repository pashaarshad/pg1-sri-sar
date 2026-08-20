"use client";

import { useState, useRef } from "react";
import { Camera, Upload, ArrowRight, CheckCircle2, AlertCircle, ArrowLeft, Shield, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitApplication } from "@/actions/residents";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  occupation: string;
  workplace: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  aadhaarNumber: string;
}

export default function TenantJoinPage({ params }: { params: { inviteId: string } }) {
  const router = useRouter();
  const [step, setStep] = useState(0); // Step 0 is Welcome page
  const [agreed, setAgreed] = useState(false);
  
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aadhaarFront, setAadhaarFront] = useState<string | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ residentId: string } | null>(null);
  
  // Refs to reliably trigger file inputs
  const photoCameraRef = useRef<HTMLInputElement>(null);
  const photoGalleryRef = useRef<HTMLInputElement>(null);
  const aadhaarFrontCameraRef = useRef<HTMLInputElement>(null);
  const aadhaarFrontGalleryRef = useRef<HTMLInputElement>(null);
  const aadhaarBackCameraRef = useRef<HTMLInputElement>(null);
  const aadhaarBackGalleryRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    occupation: "",
    workplace: "",
    address: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "Parent",
    aadhaarNumber: "",
  });

  const handleInput = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string | null) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setter(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateStep1 = () => {
    if (!form.name.trim()) return "Full name is required.";
    if (!form.phone.trim() || form.phone.trim().length < 10) return "Valid mobile number is required.";
    if (!form.email.trim() || !form.email.includes("@")) return "Valid email address is required.";
    if (!form.address.trim()) return "Permanent address is required.";
    if (!form.emergencyName.trim()) return "Emergency contact name is required.";
    if (!form.emergencyPhone.trim() || form.emergencyPhone.trim().length < 10) return "Valid emergency phone number is required.";
    return null;
  };

  const validateStep2 = () => {
    if (!photoPreview) return "Profile photo is required.";
    if (!form.aadhaarNumber.trim() || form.aadhaarNumber.trim().length !== 12) {
      return "Please enter a valid 12-digit Aadhaar Card number.";
    }
    if (!aadhaarFront) return "Aadhaar card front side photo is required.";
    if (!aadhaarBack) return "Aadhaar card back side photo is required.";
    return null;
  };

  const handleSubmit = async () => {
    if (!agreed) {
      setError("You must read and accept the PG Rules & Regulations to proceed.");
      return;
    }
    setError(null);
    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => fd.append(key, val));

    fd.set("emergencyRelation", form.emergencyRelation);
    fd.set("emergencyName", form.emergencyName);
    fd.set("emergencyPhone", form.emergencyPhone);

    const result = await submitApplication(fd);
    setLoading(false);

    if (result.success && result.residentId) {
      setSuccess({ residentId: result.residentId });
    } else {
      setError(result.error || "Submission failed. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
        <p className="text-gray-500 mb-6 font-medium">Your onboarding application has been successfully submitted and is pending admin approval.</p>
        
        <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-8 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Secure Application ID</p>
          <p className="text-4xl font-extrabold text-blue-600 tracking-tight">{success.residentId}</p>
          <p className="text-xs text-gray-400 mt-3 font-medium">Keep this ID to track your room allocation and access your portal.</p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/10"
        >
          Finish Onboarding
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Onboarding Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">PG</div>
          <div>
            <h1 className="text-sm font-bold leading-tight">ABC DEF Luxury PG & Hostel</h1>
            <p className="text-[10px] text-gray-400">Tenant Self-Onboarding Portal</p>
          </div>
        </div>
        <button 
          onClick={() => router.push("/")} 
          className="text-xs font-bold border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-gray-300 px-3.5 py-2 rounded-xl transition-all"
        >
          Admin Panel →
        </button>
      </header>

      {/* Main Form Container */}
      <div className="max-w-3xl mx-auto px-4 mt-8">
        
        {/* Step Header */}
        {step > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6 flex items-center justify-between">
            <div className="flex-1 flex items-center justify-around text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px]", 
                  step >= 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500")}>
                  {step > 1 ? "✓" : "1"}
                </span>
                <span className={step === 1 ? "text-blue-600" : "text-gray-500"}>Personal</span>
              </div>
              
              <div className="w-8 h-0.5 bg-gray-200"></div>

              <div className="flex items-center gap-2">
                <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px]", 
                  step >= 2 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500")}>
                  {step > 2 ? "✓" : "2"}
                </span>
                <span className={step === 2 ? "text-blue-600" : "text-gray-500"}>KYC & Photo</span>
              </div>

              <div className="w-8 h-0.5 bg-gray-200"></div>

              <div className="flex items-center gap-2">
                <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px]", 
                  step === 3 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500")}>
                  3
                </span>
                <span className={step === 3 ? "text-blue-600" : "text-gray-500"}>Rules & Agree</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-6">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* STEP 0: Welcome Landing Page */}
        {step === 0 && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🏠</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 leading-tight">Welcome to ABC DEF PG</h2>
            <p className="text-gray-500 mt-2 text-sm">Find your comfortable and safe place to stay.</p>
            
            <div className="my-6 border-t border-gray-100"></div>
            
            <div className="space-y-4 text-left max-w-sm mx-auto mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center font-semibold">Before applying, please read our PG Rules & Regulations</p>
              
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-green-600 font-bold">✓</span>
                <p><strong>Comfortable accommodation</strong> fully loaded with modern amenities</p>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-green-600 font-bold">✓</span>
                <p><strong>Safe and secure environment</strong> with 24/7 surveillance</p>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-green-600 font-bold">✓</span>
                <p><strong>Clear and transparent billing</strong> structure with no hidden fees</p>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-bold transition-all shadow-lg shadow-blue-600/10"
            >
              Start Application
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">Provide accurate legal details for registration</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name (as on Govt ID) *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleInput("name", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleInput("phone", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                    placeholder="e.g. 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email / Gmail *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInput("email", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                    placeholder="e.g. rahul@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => handleInput("dob", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => handleInput("gender", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Occupation / College</label>
                  <input
                    type="text"
                    value={form.occupation}
                    onChange={(e) => handleInput("occupation", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                    placeholder="e.g. Software Engineer / Student"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Workplace / Company</label>
                  <input
                    type="text"
                    value={form.workplace}
                    onChange={(e) => handleInput("workplace", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                    placeholder="e.g. Infosys, Manyata Park"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Permanent Home Address *</label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleInput("address", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all resize-none"
                  placeholder="House No, Street, City, State, Pincode"
                />
              </div>

              <div className="my-6 border-t border-gray-100"></div>

              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Emergency Contact (Parent / Guardian)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Name *</label>
                  <input
                    type="text"
                    value={form.emergencyName}
                    onChange={(e) => handleInput("emergencyName", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                    placeholder="e.g. Suresh Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Relationship *</label>
                  <select
                    value={form.emergencyRelation}
                    onChange={(e) => handleInput("emergencyRelation", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                  >
                    <option>Parent</option>
                    <option>Sibling</option>
                    <option>Guardian</option>
                    <option>Spouse</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.emergencyPhone}
                    onChange={(e) => handleInput("emergencyPhone", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                    placeholder="e.g. 9811223344"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 justify-end">
              <button
                type="button"
                onClick={() => {
                  const err = validateStep1();
                  if (err) { setError(err); return; }
                  setError(null);
                  setStep(2);
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3.5 font-bold transition-all shadow-md shadow-blue-600/10"
              >
                Continue to KYC & Photo
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: KYC & Photos */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900">KYC Verification & Photos</h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">Camera capture or gallery upload. Auto-compressed under 1MB.</p>

            <div className="space-y-6">
              {/* Profile Selfie Card */}
              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Tenant Profile Photo *</p>
                <p className="text-xs text-gray-400 mb-4">Clear face photo for PG register</p>
                
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Selfie" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl text-gray-400">👤</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {/* Hidden inputs triggered programmatically by ref */}
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="user" 
                      ref={photoCameraRef} 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, setPhotoPreview)} 
                    />
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={photoGalleryRef} 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, setPhotoPreview)} 
                    />

                    <button 
                      type="button"
                      onClick={() => photoCameraRef.current?.click()}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      Take Live Selfie / Camera
                    </button>
                    <button 
                      type="button"
                      onClick={() => photoGalleryRef.current?.click()}
                      className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-blue-600" />
                      Choose from Gallery
                    </button>
                  </div>
                </div>
              </div>

              {/* Aadhaar Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Aadhaar Card Number *</label>
                <input
                  type="text"
                  maxLength={12}
                  value={form.aadhaarNumber}
                  onChange={(e) => handleInput("aadhaarNumber", e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                  placeholder="12-digit Aadhaar (e.g. 5432 1098 7654)"
                />
                <p className="text-[10px] text-gray-400 mt-1.5 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-blue-500" />
                  Masked representation will appear as: XXXX-XXXX-XXXX
                </p>
              </div>

              {/* Aadhaar Front & Back Side Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Front */}
                <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 text-center">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Aadhaar Front Side *</p>
                  <div className="aspect-[1.6/1] w-full rounded-xl border border-dashed border-gray-300 bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                    {aadhaarFront ? (
                      <img src={aadhaarFront} alt="Aadhaar Front" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">Front Photo</span>
                    )}
                  </div>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    ref={aadhaarFrontCameraRef} 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(e, setAadhaarFront)} 
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={aadhaarFrontGalleryRef} 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(e, setAadhaarFront)} 
                  />

                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => aadhaarFrontCameraRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" /> Camera
                    </button>
                    <button 
                      type="button"
                      onClick={() => aadhaarFrontGalleryRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload
                    </button>
                  </div>
                </div>

                {/* Back */}
                <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 text-center">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Aadhaar Back Side *</p>
                  <div className="aspect-[1.6/1] w-full rounded-xl border border-dashed border-gray-300 bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                    {aadhaarBack ? (
                      <img src={aadhaarBack} alt="Aadhaar Back" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">Back Photo</span>
                    )}
                  </div>

                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    ref={aadhaarBackCameraRef} 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(e, setAadhaarBack)} 
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={aadhaarBackGalleryRef} 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(e, setAadhaarBack)} 
                  />

                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => aadhaarBackCameraRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" /> Camera
                    </button>
                    <button 
                      type="button"
                      onClick={() => aadhaarBackGalleryRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6 justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => {
                  const err = validateStep2();
                  if (err) { setError(err); return; }
                  setError(null);
                  setStep(3);
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3.5 font-bold transition-all shadow-md shadow-blue-600/10"
              >
                Proceed to Rules & Agreement
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Rules & Agree */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Rules & Regulations Agreement</h2>

            <div className="bg-gray-50 p-6 rounded-2xl text-sm text-gray-700 h-64 overflow-y-auto mb-6 border border-gray-200 leading-relaxed space-y-4">
              <p><strong>1. Rent Payment:</strong> Rent must be paid on or before the 5th of every month. Late payments may attract a penalty.</p>
              <p><strong>2. Visitors Policy:</strong> No visitors are allowed in the rooms after 9:00 PM without prior permission from management.</p>
              <p><strong>3. Electricity Usage:</strong> Please turn off lights, fans, and ACs when leaving. Excessive usage will be billed separately.</p>
              <p><strong>4. Notice Period:</strong> A 30-day notice period is required before vacating to claim the security deposit.</p>
              <p><strong>5. Property Maintenance:</strong> Any damage to property or furniture will be deducted from the security deposit.</p>
              <p><strong>6. Smoking & Alcohol:</strong> Strictly prohibited on the premises.</p>
            </div>

            <label
              className={cn(
                "flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all mb-8",
                agreed ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
              onClick={() => setAgreed((v) => !v)}
            >
              <div className={cn(
                "w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                agreed ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white"
              )}>
                {agreed && <Check className="w-4 h-4 text-white font-bold" />}
              </div>
              <span className="font-semibold text-gray-900 select-none">
                I have read and agree to the Rules & Regulations
              </span>
            </label>

            <div className="flex gap-3 justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 py-4 font-bold transition-all shadow-md shadow-green-600/10 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
