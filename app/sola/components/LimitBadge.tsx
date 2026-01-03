import { motion } from "framer-motion";

interface LimitBadgeProps {
  count: number;
  limit: number;
  isPremium?: boolean;
}

export default function LimitBadge({ count, limit, isPremium }: LimitBadgeProps) {
  const percentage = (count / limit) * 100;

  if (isPremium) {
    return (
      <div className="flex items-center gap-6 px-4 py-2 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 backdrop-blur-sm">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#3B3A36] uppercase font-serif">
              THAIBK+ Membership
            </span>
            <span className="text-[10px] text-[#D4AF37] font-bold tracking-[0.1em] uppercase">
              {count} / {limit}
            </span>
          </div>

          {/* Progress Bar for Premium */}
          <div className="mt-1 w-32 h-0.5 bg-[#D4AF37]/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((count / limit) * 100, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#D4AF37] rounded-full"
            />
          </div>
        </div>

        <div className="h-4 w-px bg-[#D4AF37]/30" />

        <div className="text-[10px] font-bold tracking-[0.1em] text-[#D4AF37]">
          {Math.max(0, limit - count)} LEFT
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 px-4 py-2 bg-[#E8E3D9]/20 rounded-2xl border border-[#E8E3D9]/30 backdrop-blur-sm">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#3B3A36] uppercase font-serif">
            Interpretation Credits
          </span>
          <span className="text-[10px] text-[#3B3A36]/40 font-medium">
            {count} / {limit}
          </span>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="mt-1 w-32 h-0.5 bg-[#E8E3D9] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${percentage >= 80 ? 'bg-red-400' : 'bg-[#3B3A36]/60'
              }`}
          />
        </div>
      </div>

      <div className="h-4 w-px bg-[#E8E3D9]/50" />

      <div className="text-[10px] font-bold tracking-[0.1em] text-[#3B3A36]/60">
        {Math.max(0, limit - count)} LEFT
      </div>
    </div>
  );
}