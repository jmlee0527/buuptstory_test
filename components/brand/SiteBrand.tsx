import { siteConfig } from "@/lib/site";

type SiteBrandProps = {
  showTagline?: boolean;
  size?: "header" | "compact";
  className?: string;
};

export function SiteBrand({ showTagline = true, size = "header", className = "" }: SiteBrandProps) {
  const iconSize = size === "header" ? "size-11" : "size-9";
  const iconRadius = size === "header" ? "rounded-md" : "rounded-sm";
  const miSize = size === "header" ? "text-[1.35rem]" : "text-lg";
  const titleSize = size === "header" ? "text-[1.15rem] sm:text-xl" : "text-base";
  const taglineSize = size === "header" ? "text-[0.68rem] sm:text-[11px]" : "text-[10px]";

  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <span
        className={`relative grid shrink-0 ${iconSize} place-items-center ${iconRadius} border-2 border-[#353535] bg-[#4267A8] shadow-[2px_3px_0_rgba(53,53,53,0.15)] rotate-[-1deg]`}
        aria-hidden="true"
      >
        <span className={`relative font-black lowercase leading-none tracking-tighter text-white ${miSize}`}>
          m
          <span className="relative inline-block">
            <span className="absolute -top-[0.35em] left-1/2 size-[0.28em] min-h-[3px] min-w-[3px] -translate-x-1/2 rounded-full bg-[#FFE98A]" />
            i
          </span>
        </span>
      </span>

      <span className="flex min-w-0 flex-col justify-center leading-none">
        <span className={`font-black tracking-tight ${titleSize}`}>
          <span className="text-[#292929]">미미</span>
          <span className="text-[#4267A8]">테스트</span>
        </span>
        {showTagline && (
          <span className={`mt-1.5 font-medium tracking-[0.14em] text-[#77736E] ${taglineSize}`}>
            {siteConfig.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
