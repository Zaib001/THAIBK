"use client";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl max-w-sm text-center">
        <h2 className="text-2xl font-serif mb-4">Upgrade to THAIBK+</h2>
        <p className="text-gray-600 mb-6">
          You’ve used your 5 free translations. Upgrade to unlock unlimited usage.
        </p>

        <button className="bg-black text-white px-6 py-3 rounded-lg mb-3 w-full">
          Upgrade Now
        </button>

        <button className="text-gray-600 underline" onClick={onClose}>
          Not now
        </button>
      </div>
    </div>
  );
}
