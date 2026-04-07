# Planning Guide

NΞBU is a precision Zoom host operator console that gives hosts unified command-line control over live Zoom sessions, with Telegram and Discord extensions for remote command execution and session alerts. The landing page presents a disciplined, operator-grade control system that is product-ready and deployable.

**Experience Qualities**:
1. **Disciplined** - Every interaction feels deliberate and controlled, like operating professional-grade communication equipment with surgical precision and authority
2. **Cinematic** - The interface presents Zoom host operations through a sophisticated visual language that communicates technical depth without abstraction
3. **Premium** - Material quality and attention to detail communicate operator-grade, deployable technology, distinguishing it from generic AI/SaaS aesthetics through restrained, purposeful design choices

**Complexity Level**: Light Application (multiple features with basic state)
This is a product landing page that demonstrates NΞBU's Zoom host control capabilities through interactive visualizations of real operational features: participant flow monitoring, waiting room management, session state telemetry, and command-line controls accessible via Telegram and Discord. While the landing page itself is demonstrative, it presents authentic, deployable functionality rather than abstract concepts.

## Essential Features

### Hero Section with Zoom Control Identity
- **Functionality**: Centered NΞBU wordmark with "Command the Session" tagline and clear positioning as Zoom host operator console
- **Purpose**: Establishes immediate visual identity and communicates the core purpose: Zoom session control with Telegram/Discord extensions
- **Trigger**: Page load
- **Progression**: Page loads → wordmark fades in → "Command the Session" appears → positioning statement reveals → central node materializes representing active Zoom session
- **Success criteria**: Typography is crisp and authoritative, positioning is clear and unambiguous, visual hierarchy emphasizes Zoom as primary platform

### Scroll-Triggered Session Network Expansion
- **Functionality**: As user scrolls past hero, the central Zoom session node expands to show connected Telegram and Discord integration nodes
- **Purpose**: Demonstrates the platform hierarchy: Zoom as operational core, Telegram/Discord as command/alert extensions
- **Trigger**: User scrolls beyond 30% of hero section
- **Progression**: Scroll initiated → central Zoom node scales → Telegram and Discord nodes branch out as satellites → connection lines show integration flow → nodes settle into position
- **Success criteria**: Animation clearly shows Zoom as the central operational hub with Telegram/Discord as secondary extensions, not peers

### Session Node Hover Telemetry
- **Functionality**: Hovering over network nodes reveals Zoom-specific session data (waiting room count, participant states, hand raises, camera/mic status, recording state)
- **Purpose**: Provides granular Zoom host control information that demonstrates real operational utility
- **Trigger**: Mouse hover on any session node
- **Progression**: Hover starts → glass panel fades in → Zoom host data displays (waiting room: 3, hands raised: 2, recording: ON) → panel follows cursor subtly → hover ends → panel fades out
- **Success criteria**: Panel data feels authentic and operationally relevant to Zoom hosts, not generic placeholder metrics

### Command Input with Zoom-First Commands
- **Functionality**: Interactive command bar showing Zoom host commands with Telegram/Discord remote execution capability
- **Purpose**: Demonstrates the operator-first, keyboard-driven control paradigm for Zoom session management
- **Trigger**: User focuses on command input or scrolls to CONTROL section
- **Progression**: Focus/scroll → input bar highlights → placeholder shows "/zoom admit all" → typing triggers Zoom-specific autocomplete → command preview shows Telegram/Discord execution context
- **Success criteria**: Command examples are realistic Zoom host actions, Telegram/Discord positioning is clear as remote execution channels

### Zoom Session Status Panel
- **Functionality**: Live-updating panel showing current Zoom session states with host-relevant metrics (waiting room, active speakers, hand raises, recording status)
- **Purpose**: Provides at-a-glance Zoom session monitoring that hosts actually need
- **Trigger**: Visible when SYSTEM section is in viewport
- **Progression**: Section enters viewport → panel animates in → Zoom session metrics populate → waiting room count updates → hand raise indicators pulse → recording status shows duration
- **Success criteria**: Metrics are Zoom-specific and operationally relevant, interface feels like a deployable host dashboard

### Session Memory/Logs Viewer
- **Functionality**: Archive of Zoom session summaries, host actions logged via commands, and recorded session artifacts
- **Purpose**: Shows session history and command execution logs relevant to Zoom host operations
- **Trigger**: Scroll to MEMORY section
- **Progression**: Section visible → log entries fade in sequentially → Zoom host actions appear ("/zoom admit all - admitted 8 participants") → session recordings listed with metadata
- **Success criteria**: Log entries reflect real Zoom host workflows, data feels authentic not generic

### Real-Time Analytics Dashboard
- **Functionality**: Comprehensive metrics visualization showing participant activity, engagement patterns, session flow, and operational statistics with live updating data
- **Purpose**: Provides data-driven insights for hosts to understand session dynamics, monitor trends, and optimize Zoom meeting management
- **Trigger**: Scroll to ANALYZE section
- **Progression**: Section enters viewport → header animates in → metric cards populate with animated counters and micro-trend graphs → live activity graph draws participant flow line → audio states bar fills → timeline events appear → participant flow funnel animates
- **Success criteria**: All metrics feel operationally relevant to Zoom hosts, data updates smoothly without jarring changes, visual hierarchy guides eye to most important metrics first, animations enhance comprehension without distraction

### Session Comparison View
- **Functionality**: Full-screen overlay allowing operators to compare analytics from 2-4 Zoom sessions simultaneously with flexible layout options
- **Purpose**: Enables hosts to analyze multiple sessions at once, identify patterns across meetings, and make data-driven improvements to session management
- **Trigger**: Click "Compare Sessions" button in ANALYZE section
- **Progression**: Button clicked → full-screen comparison view fades in with backdrop blur → session selector panel appears with dropdown menus → operators select 2-4 sessions to compare → can toggle between side-by-side and stacked layouts → can add/remove sessions dynamically → each session shows full analytics dashboard → close button returns to main view
- **Success criteria**: Layout adapts intelligently to number of selected sessions (2 = 2 columns, 3 = 3 columns, 4 = 2x2 grid), session selection is intuitive with status indicators, comparison mode toggle is discoverable, all analytics remain readable at reduced sizes

## Edge Case Handling

- **Mobile/Touch Devices** - Network graph simplifies to vertical timeline, hover states become tap-to-reveal, command input shows virtual keyboard with command shortcuts
- **Slow Connections** - Critical text content loads first, animations degrade gracefully, skeleton loaders maintain layout integrity
- **Small Viewports** - Sections stack vertically, side panels become full-width, node graph scales down intelligently
- **Keyboard-Only Navigation** - All interactive elements are focusable, focus states use subtle glow matching theme, tab order follows visual hierarchy
- **Accessibility** - Glass panels maintain 4.5:1 contrast minimum, animations respect prefers-reduced-motion, screen readers get descriptive labels
- **No JavaScript** - Core content and structure remain visible, command examples show as static text, manual scroll navigation works

## Design Direction

The design should evoke the feeling of operating a professional Zoom host control console from a production environment. Think high-end operator tools for live video production meets disciplined command-line interfaces - obsidian surfaces, precise typography, controlled energy focused on Zoom session management. Every element serves a functional purpose relevant to Zoom hosts; beauty emerges from restraint and operational clarity. The interface should feel like it was designed by broadcast engineers who understand live session control, not designers creating generic communication dashboards.

## Color Selection

The palette is deliberately constrained to communicate technical precision and premium quality through contrast rather than variety.

- **Primary Color**: Obsidian Dark (#05070A / oklch(0.04 0 0)) - The foundation, communicating depth, focus, and premium quality. This near-black creates a canvas where signal colors can perform.
- **Secondary Colors**: 
  - Glass Panel: rgba(255,255,255,0.02) with rgba(255,255,255,0.08) borders - Subtle material layering that suggests sophisticated UI without competing for attention
  - Carbon Gray: oklch(0.25 0 0) - For secondary text and disabled states, maintaining readability hierarchy
- **Accent Color**: Signal Green (#00FF41 / oklch(0.90 0.27 142)) - High-energy active state indicator, used sparingly for status confirmations, active nodes, and success states. Communicates "live" and "operational"
- **Tertiary Accent**: Deep Violet (#7C3AED / oklch(0.55 0.24 286)) - For secondary signals, hover states, and command highlights. Adds depth without warmth.
- **Foreground/Background Pairings**:
  - Obsidian (#05070A): White text (oklch(0.98 0 0)) - Ratio 20.1:1 ✓
  - Glass Panel (rgba(255,255,255,0.08)): White text (oklch(0.98 0 0)) on dark background - Ratio 18.5:1 ✓
  - Signal Green (#00FF41): Dark text (oklch(0.04 0 0)) - Ratio 21.3:1 ✓
  - Deep Violet (#7C3AED): White text (oklch(0.98 0 0)) - Ratio 7.2:1 ✓

## Font Selection

Typography must communicate technical precision while maintaining readability and establishing clear hierarchy. Space Grotesk for display elements brings geometric clarity with a technical edge, while Inter handles UI and body text with excellent screen optimization.

- **Typographic Hierarchy**:
  - Hero Wordmark (NΞBU): Space Grotesk Bold / 96px / tracking: 0.05em / uppercase
  - Hero Tagline: Space Grotesk Medium / 20px / tracking: 0.15em / uppercase
  - Section Headers: Space Grotesk SemiBold / 48px / tracking: 0.02em / uppercase
  - Section Subheaders: Inter Medium / 14px / tracking: 0.1em / uppercase / opacity 0.6
  - Body Text: Inter Regular / 16px / line-height: 1.6 / opacity 0.8
  - Command Text: JetBrains Mono Regular / 14px / line-height: 1.5
  - Data/Metrics: JetBrains Mono Medium / 12px / tabular numerics
  - Micro Labels: Inter Medium / 11px / tracking: 0.05em / uppercase / opacity 0.5

## Animations

Animations serve exclusively to reinforce the system's responsiveness and guide the operator's attention. Motion follows principles of mass and momentum - nothing snaps, everything eases with purpose. The ambient pulse on the central node (3.5s cycle) provides subtle life without distraction. Network expansion uses elastic easing to suggest organic growth while maintaining precision. Glass panels fade in with backdrop blur over 200ms. All hover states respond within 100ms. Command execution triggers a brief signal pulse (150ms). Scroll-triggered animations use intersection observer with 0.2 threshold for smooth activation. All animations respect prefers-reduced-motion by reducing duration to 0.01s.

## Component Selection

- **Components**: 
  - Card: For session status panels and telemetry overlays, modified with glass effect (backdrop-blur-xl, bg-white/[0.02], border-white/[0.08])
  - Input: For command bar, styled with monospace font and terminal aesthetic
  - Badge: For status indicators (ACTIVE, WAITING, LOCKED), using variant styling with accent colors
  - Separator: For dividing panel sections, styled with minimal opacity borders
  - Tabs: For switching between memory views (Summaries / Logs / Artifacts), using subtle underline active state
  - Dialog: For expanded log detail views, full-screen with glass backdrop
  - Scroll Area: For log viewers and session lists, with invisible scrollbars that appear on hover
  
- **Customizations**: 
  - NetworkGraph component: Custom SVG-based node visualization with D3 for layout calculation
  - CommandInput component: Custom terminal-style input with autocomplete dropdown
  - NodeTelemetry component: Custom tooltip-style panel that follows cursor
  - StatusIndicator component: Custom pulsing dot with glow effect
  - SignalBeam component: Custom vertical gradient beam with shimmer animation
  
- **States**: 
  - Buttons: Minimal ghost style with border-white/[0.08] at rest, border-white/[0.16] on hover, bg-white/[0.04] when active, signal green border when focused
  - Inputs: Border-white/[0.08] at rest, border-violet on focus with subtle glow, signal green border on valid input
  - Nodes: Default state with white/[0.6] fill, hover shows white/[0.9] with scale 1.1, active pulses signal green, connected nodes show violet connection lines
  
- **Icon Selection**: 
  - Phosphor icons in regular weight: Circle (nodes), ArrowRight (navigation), Terminal (command mode), Activity (live status), Database (memory), Lightning (active sessions), Lock (secured), Record (recording active), Users (participants)
  
- **Spacing**: 
  - Consistent use of 8px base unit: 2 (16px) for tight groupings, 4 (32px) for related sections, 8 (64px) for section padding, 16 (128px) for major section breaks
  - Container max-width: 1400px for content, full-width for background effects
  
- **Mobile**: 
  - Hero: Wordmark scales to 48px, tagline to 14px, vertical spacing reduces to 4 units
  - Network graph: Transforms to vertical timeline list with connection indicators
  - Glass panels: Full-width cards with reduced blur for performance
  - Command input: Sticky bottom position with larger touch target (56px height)
  - Sections: Stack with 4-unit spacing, full-bleed backgrounds
  - Side-by-side layouts: Convert to single column, maintain visual hierarchy through card elevation
