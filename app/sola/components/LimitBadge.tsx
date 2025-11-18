interface LimitBadgeProps {
  count: number;
  limit: number;
}

export default function LimitBadge({ count, limit }: LimitBadgeProps) {
  const percentage = (count / limit) * 100;
  
  return (
    <div className="bg-white rounded-full px-6 py-3 shadow-lg border">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-700">
            {count} / {limit} free translations
          </span>
        </div>
        
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              percentage >= 80 ? 'bg-red-500' : 
              percentage >= 60 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}