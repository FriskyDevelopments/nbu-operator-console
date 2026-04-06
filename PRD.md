# Planning Guide

NΞBU is an ultra-minimalist operator control system landing page that serves as a high-fidelity interface for commanding multi-platform communication sessions through a sophisticated node-based architecture.

**Experience Qualities**:
1. **Precision** - Every interaction feels deliberate and controlled, like operating military-grade communication equipment with surgical accuracy
2. **Mysterious** - The interface reveals its power gradually through subtle interactions, maintaining an air of sophisticated technical depth without overwhelming the operator
3. **Premium** - Material quality and attention to detail communicate high-end boutique technology, distinguishing it from generic AI/tech aesthetics through restrained design choices

**Complexity Level**: Light Application (multiple features with basic state)
This is fundamentally a marketing/showcase landing page with interactive demonstrations of the system's capabilities. While it presents complex concepts (network graphs, session management, command interfaces), the actual functionality is demonstrative rather than fully operational, making it a light application with scroll-driven interactions and hover states.

## Essential Features

### Hero Section with Animated Node
- **Functionality**: Centered NΞBU wordmark with tagline, minimal subtext, and a glowing central node symbol with vertical signal beam
- **Purpose**: Establishes immediate visual identity and communicates the core concept of network control
- **Trigger**: Page load
- **Progression**: Page loads → wordmark fades in → central node materializes → vertical beam animates → subtle ambient pulse begins
- **Success criteria**: Node pulses smoothly at 3-4 second intervals, beam is visible but subtle, typography is crisp and properly spaced

### Scroll-Triggered Network Expansion
- **Functionality**: As user scrolls past hero, the central node expands into a network graph showing connected session nodes
- **Purpose**: Demonstrates the system's ability to manage multiple concurrent sessions visually
- **Trigger**: User scrolls beyond 30% of hero section
- **Progression**: Scroll initiated → central node scales → connected nodes branch out radially → connection lines draw → nodes settle into position
- **Success criteria**: Animation completes within 800ms, nodes are evenly distributed, graph feels organic not mechanical

### Session Node Hover Telemetry
- **Functionality**: Hovering over any network node reveals a glass panel with session data (participant count, status, recording state)
- **Purpose**: Provides granular control information without cluttering the base interface
- **Trigger**: Mouse hover on any session node
- **Progression**: Hover starts → glass panel fades in with blur effect → data displays (status badge, metrics, timestamp) → panel follows cursor subtly → hover ends → panel fades out
- **Success criteria**: Panel appears within 150ms, follows cursor with slight lag for smoothness, data is readable with high contrast

### Command Input Demonstration
- **Functionality**: Interactive command bar showing Telegram/Discord command syntax with autocomplete hints
- **Purpose**: Demonstrates the operator-first, keyboard-driven control paradigm
- **Trigger**: User focuses on command input or scrolls to CONTROL section
- **Progression**: Focus/scroll → input bar highlights → placeholder shows example command → typing triggers autocomplete → enter executes mock command → success feedback displays
- **Success criteria**: Input feels responsive, monospaced font is clear, autocomplete suggestions appear contextually

### Session Status Panel
- **Functionality**: Live-updating panel showing current system state with color-coded status indicators
- **Purpose**: Provides at-a-glance system health monitoring
- **Trigger**: Visible when SYSTEM section is in viewport
- **Progression**: Section enters viewport → panel animates in from left → status indicators populate → mock updates cycle every 5 seconds → hover on any row shows detail
- **Success criteria**: Status colors are immediately distinguishable (green=active, amber=waiting, red=locked), updates feel real-time

### Memory/Logs Viewer
- **Functionality**: Clean data panel displaying session summaries, logs, and recorded artifacts
- **Purpose**: Shows the system's archival and memory capabilities
- **Trigger**: Scroll to MEMORY section
- **Progression**: Section visible → log entries fade in sequentially → timestamps align → hover on entry expands preview → click opens detail modal
- **Success criteria**: Text is monospaced and aligned, timestamps are precise, data feels authentic not placeholder

## Edge Case Handling

- **Mobile/Touch Devices** - Network graph simplifies to vertical timeline, hover states become tap-to-reveal, command input shows virtual keyboard with command shortcuts
- **Slow Connections** - Critical text content loads first, animations degrade gracefully, skeleton loaders maintain layout integrity
- **Small Viewports** - Sections stack vertically, side panels become full-width, node graph scales down intelligently
- **Keyboard-Only Navigation** - All interactive elements are focusable, focus states use subtle glow matching theme, tab order follows visual hierarchy
- **Accessibility** - Glass panels maintain 4.5:1 contrast minimum, animations respect prefers-reduced-motion, screen readers get descriptive labels
- **No JavaScript** - Core content and structure remain visible, command examples show as static text, manual scroll navigation works

## Design Direction

The design should evoke the feeling of operating sophisticated black-ops communication infrastructure from a secure facility. Think high-end developer tools meets cyber-occult minimalism - obsidian surfaces, precise typography, controlled energy. Every element serves a function; beauty emerges from restraint and precision. The interface should feel like it was designed by engineers who appreciate aesthetics, not designers chasing trends.

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
