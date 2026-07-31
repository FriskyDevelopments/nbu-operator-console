# Frisky UI & Frontend Stack

Standard stack for Frisky frontends (HostCasa, MyFenrir, LORE / PACK OS, Impulse).
Curated July 2026. UI layer is MIT + copy-paste on Tailwind. Baseline: Next.js + React + TS, Supabase, Cloudflare.

## Foundation / toolchain
- Framework + runtime: Next.js (App Router) on React — Server Components + Actions — https://react.dev/
- Bundler: Turbopack (Rust, built into Next.js) — https://nextjs.org/docs/app/api-reference/turbopack
- Compiler + minifier: SWC — https://swc.rs/
> Note: frisky-command-deck and nbu-operator-console are GitHub Spark (Vite + @vitejs/plugin-react-swc), NOT Next.js. Turbopack does not apply there.

## UI stack
- Base: shadcn/ui + Tailwind v4 (primitives: Base UI on new frontends, Radix where already in place)
- Motion/wow: Magic UI + Aceternity (landing) · motion-primitives (micro-interactions)
- Data: Tremor
- Icons: Phosphor (app code) — lucide-react confined to components/ui/ (see ICONS.md)
- Blocks: TailKits (via MCP) + HyperUI — always under shadcn

### Library reference
| Name | URL | License |
|---|---|---|
| shadcn/ui | https://ui.shadcn.com | MIT |
| Radix UI | https://www.radix-ui.com | MIT |
| Base UI | https://base-ui.com | MIT |
| Magic UI | https://magicui.design | MIT |
| Aceternity UI | https://ui.aceternity.com | MIT (some templates paid) |
| motion-primitives | https://motion-primitives.com | MIT |
| Tremor | https://tremor.so | MIT |
| HyperUI | https://www.hyperui.dev | MIT |
| TailKits | https://tailkits.com | marketplace (free+premium) |
| DaisyUI | https://daisyui.com | MIT (isolate) |
| GSAP | https://gsap.com | free (2025+) |
| Lenis | https://lenis.darkroom.engineering | MIT |
| React Three Fiber | https://r3f.docs.pmnd.rs | MIT |

## Per product
- HostCasa: shadcn/ui + Radix (starter). Tremor if analytics. Magic UI touch on landing.
- MyFenrir: shadcn/ui + HyperUI/TailKits. No heavy motion.
- LORE / PACK OS: shadcn + THE PACK skin (dark, magenta/amethyst/cyan/amber, OKLCH) + Magic UI + Aceternity + motion-primitives + Awwwards layer below.
- Impulse: shadcn/ui + Tremor for analytics. motion-primitives subtle only.

## What NOT to mix
1. Never DaisyUI + shadcn/ui in the same project (class vs CSS-var specificity clash). One component layer per project. Keep DaisyUI in the ShipFast project only.
2. One primitive layer per project: Radix OR Base UI, not both.
3. One icon set in app code: Phosphor. No lucide-react outside components/ui/. No other icon packs.
4. Magic UI/Aceternity/motion-primitives/Tremor/HyperUI/TailKits stack ON TOP of shadcn — additions, never replacements.

## Theme tokens (LORE)
All colors as OKLCH CSS vars in :root, mapped via @theme to --color-* tokens. Components consume tokens, never literal hex/oklch. Fix leaks: literal oklch()/#hex in props or hover should reference the named var (var(--primary), var(--neon-cyan)).

## Awwwards layer (LORE)
Goal: Site of the Day (~7.45–8.65/10). Scoring: Design 40% · Usability 30% · Creativity 20% · Content 10%. Design+Usability = 70%; do not over-index on motion.
Toolkit on top of base: GSAP (scroll animation, free since 2025), Lenis (smooth scroll), React Three Fiber + drei (WebGL/shaders). Magic UI/Aceternity = scaffold only; restyle until template origin is unrecognizable.
Usability guardrails: lazy-load WebGL, protect LCP/INP, hold 60fps, honor prefers-reduced-motion, visible focus + keyboard nav, mobile must translate.
Submission checklist:
- [ ] Custom type scale + grid + rhythm; no default shadcn hero
- [ ] Signature GSAP + Lenis motion pass
- [ ] One custom R3F/shader hero moment (good thumbnail)
- [ ] THE PACK tokens everywhere; zero color leaks
- [ ] prefers-reduced-motion fallback verified
- [ ] Lighthouse: LCP<2.5s, INP<200ms, CLS<0.1 on mid-tier mobile
- [ ] Keyboard + focus pass; no scroll traps
- [ ] Mobile reviewed on real device
- [ ] Real copy, not lorem
- [ ] Intentional loader / first-paint
