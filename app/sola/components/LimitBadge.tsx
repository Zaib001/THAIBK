interface LimitBadgeProps {
  count: number;
  limit: number;
}

export default function LimitBadge({ count, limit }: LimitBadgeProps) {
  const percentage = (count / limit) * 100;
  
  return (
    <div className="bg-white rounded-2xl px-6 py-4 shadow-lg border border-[#E8E3D9]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E8E3D9] rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-[#3B3A36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-[#3B3A36] block">
              {count} / {limit} translations used
            </span>
            <span className="text-sm text-[#3B3A36]/60">
              {limit - count} free translations remaining
            </span>
          </div>
        </div>
        
        <div className="flex-1 max-w-40">
          <div className="w-full h-3 bg-[#E8E3D9] rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                percentage >= 80 ? 'bg-red-500' : 
                percentage >= 60 ? 'bg-amber-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-[#3B3A36]/50 mt-1 text-right">
            {Math.round(percentage)}%
          </div>
        </div>
      </div>
    </div>
  );
}