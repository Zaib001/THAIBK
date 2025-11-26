"use client";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#3B3A36]/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-[#E8E3D9] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3B3A36] to-[#2A2722] p-8 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <svg className="w-10 h-10 text-[#E8E3D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#E8E3D9] mb-2">Upgrade to SOLA Pro</h2>
          <p className="text-[#E8E3D9]/80">Unlock unlimited translations</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-4xl font-bold text-[#3B3A36]">$9.99</span>
              <span className="text-[#3B3A36]/60">/month</span>
            </div>
            <p className="text-[#3B3A36]/70 mb-6">
              You've used your 5 free translations. Upgrade for unlimited access and premium features.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 p-3 bg-[#F4F1EC] rounded-xl">
              <div className="w-6 h-6 bg-[#3B3A36] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[#3B3A36] font-medium">Unlimited translations</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#F4F1EC] rounded-xl">
              <div className="w-6 h-6 bg-[#3B3A36] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[#3B3A36] font-medium">Faster processing speed</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#F4F1EC] rounded-xl">
              <div className="w-6 h-6 bg-[#3B3A36] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[#3B3A36] font-medium">Priority voice recognition</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#F4F1EC] rounded-xl">
              <div className="w-6 h-6 bg-[#3B3A36] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[#3B3A36] font-medium">Advanced AI models</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-[#3B3A36] text-[#E8E3D9] px-6 py-4 rounded-xl font-semibold transition-all hover:bg-[#3B3A36]/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg">
              Upgrade Now - $9.99/month
            </button>
            <button 
              className="w-full text-[#3B3A36]/60 hover:text-[#3B3A36] transition-colors py-3 font-medium"
              onClick={onClose}
            >
              Continue with free version
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}