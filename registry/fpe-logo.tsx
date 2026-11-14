import { useId, type ComponentPropsWithoutRef } from "react"

type FpeLogoProps = ComponentPropsWithoutRef<"svg"> & {
  variant?: "gradient" | "pink" | "white" | "black" | "inherit"
  title?: string
}

/** FPE identity mark. Brand artwork is not part of the software MIT grant. */
export function FpeLogo({ variant = "gradient", title, ...props }: FpeLogoProps) {
  const gradientId = useId()
  const fill = variant === "white" ? "#FFFFFF" : variant === "black" ? "#000000" : variant === "inherit" ? "currentColor" : "var(--fpe-pink, #F23D9F)"
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 293 250"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      fill="none"
      {...props}
    >
      {variant === "gradient" && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--fpe-pink-highlight, #FF8FD3)" />
            <stop offset=".46" stopColor="var(--fpe-pink, #F23D9F)" />
            <stop offset="1" stopColor="var(--fpe-violet-bright, #C34BE5)" />
          </linearGradient>
        </defs>
      )}
      <path fill={variant === "gradient" ? `url(#${gradientId})` : fill} fillRule="evenodd" d="M0 0H293V148H168V205H293V250H124V148H46V102H124V45H0Z M168 45H249V102H168Z" />
    </svg>
  )
}

/** Optional byline for FPE-authored pages. Not a license attribution requirement. */
export function FpeCredit() {
  return (
    <span className="inline-flex items-baseline gap-[.42em] font-sans text-[13px] font-medium leading-[1.4] text-current whitespace-nowrap">
      Designed by François
      <FpeLogo variant="inherit" className="h-[9px] w-auto shrink-0" />
    </span>
  )
}
