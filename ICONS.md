# Icons

One icon set for app code: Phosphor (@phosphor-icons/react).

## Rules
- Use Phosphor for every icon you write in app code.
- Do NOT import lucide-react outside src/components/ui/ (vendored shadcn — leave as-is).
- Do NOT add other icon packs (@heroicons/react, react-icons). Remove if they sneak into package.json.

## Why
Multiple icon sets ship duplicate glyphs and fragment the visual language. Phosphor's thin weights match the PACK aesthetic. Lucide only exists here inside shadcn primitives, so we confine it there.

## Phosphor <-> lucide quick map
| lucide | Phosphor |
|---|---|
| AlertTriangle | Warning |
| RefreshCw | ArrowClockwise |
| Zap | Lightning |
| Search | MagnifyingGlass |
| Settings | Gear |
| Trash2 | Trash |
| ChevronDown | CaretDown |
| ExternalLink | ArrowSquareOut |

Same size={n} prop, inherits color — drop-in swap.

## Guard (CI / pre-commit)
    grep -rn "lucide-react" src --exclude-dir=ui | grep -v "components/ui/" && { echo "lucide outside components/ui/ — use Phosphor"; exit 1; } || echo "ok: single icon set"
