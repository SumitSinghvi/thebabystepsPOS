"use client";

import { useEffect } from "react";
import { X, ImageIcon } from "lucide-react";

interface ImageViewerModalProps {
  imageUrl: string | null;
  altText: string;
  onClose: () => void;
}

export function ImageViewerModal({ imageUrl, altText, onClose }: ImageViewerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm overlay-enter" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col items-center justify-center modal-enter pointer-events-none">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors pointer-events-auto"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full rounded-2xl overflow-hidden pointer-events-auto flex items-center justify-center">
          {imageUrl ? (
             <img
               src={imageUrl}
               alt={altText}
               className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
             />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center bg-black/50 rounded-xl border border-white/10">
               <ImageIcon className="w-16 h-16 text-white/30" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
