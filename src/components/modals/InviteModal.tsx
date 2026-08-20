"use client";

import { X, Copy, Check, MessageSquare, ExternalLink, Share2 } from "lucide-react";
import { useState } from "react";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  // Generate a random mock invite ID matching the user's style: inv-bxpn460q
  const mockInviteUrl = `${window.location.origin}/join/inv-bxpn460q`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mockInviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Welcome! Please complete your onboarding for ABC DEF PG by clicking this link: ${mockInviteUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative border border-gray-100 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 p-1.5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
            <Share2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">Invite New Resident</h2>
            <p className="text-sm text-gray-500 mt-1">Share digital onboarding link</p>
          </div>
        </div>

        {/* Modal Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Share this unique invitation link with prospective tenants. They will accept PG rules, input emergency contacts, and upload verified camera KYC under 1 MB.
        </p>

        {/* Link Display Box */}
        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-2xl mb-6">
          <input 
            type="text" 
            readOnly 
            value={mockInviteUrl}
            className="flex-1 bg-transparent text-sm font-medium text-gray-700 outline-none select-all px-1"
          />
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-blue-600" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm py-3.5 rounded-2xl transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            Share WhatsApp
          </button>
          
          <a 
            href={`/join/inv-bxpn460q`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-2xl transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Open Onboarding
          </a>
        </div>

      </div>
    </div>
  );
}
