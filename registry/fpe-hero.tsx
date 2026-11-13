import { FpeLogo } from "@/components/ui/fpe-logo"

type FpeHeroProps = {
  title?: string
  description?: string
  href?: string
}

/** FPE editorial brand block. Existing shadcn components still own product interactions. */
export function FpeHero({
  title = "Distinct by design.",
  description = "FPE brings precision, character and considered motion to shadcn, React and the open web.",
  href = "#explore",
}: FpeHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border border-border bg-background px-8 py-16 text-foreground md:px-14 md:py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1 bg-[image:var(--fpe-gradient-brand)]" aria-hidden="true" />
      <div className="relative max-w-3xl space-y-7">
        <FpeLogo variant="gradient" className="h-10 w-12" />
        <h1 className="font-sans text-balance text-[clamp(3rem,6vw,6.25rem)] font-semibold leading-[1.13] tracking-[-.02em]">{title}</h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        <a
          href={href}
          className="group inline-flex min-h-11 items-center justify-between gap-5 rounded-[2px] border border-transparent px-5 py-3 text-sm font-semibold text-foreground outline-offset-4 transition-transform duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transform-none motion-reduce:transition-none"
          style={{ background: "linear-gradient(var(--background), var(--background)) padding-box, var(--fpe-gradient-brand) border-box" }}
        >
          Explore FPE <span aria-hidden="true" className="inline-block bg-[image:var(--fpe-gradient-brand)] bg-clip-text text-transparent transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none">↗</span>
        </a>
      </div>
    </section>
  )
}
