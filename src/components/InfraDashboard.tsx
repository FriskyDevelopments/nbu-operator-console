import { motion } from 'framer-motion'
import { 
  Cloud,
  ShieldCheck,
  Globe,
  CaretRight,
  Lightning,
  HardDrive,
  Robot,
  IdentificationCard,
  CurrencyDollar
} from '@phosphor-icons/react'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { Separator } from './ui/separator'

export default function InfraDashboard() {
  const sections = [
    {
      id: 'deployment',
      title: 'Deployment Ecosystem',
      icon: Cloud,
      items: [
        { label: 'Coolify Hub', value: 'Active', status: 'success' },
        { label: 'Production Gate', value: 'Owner Auth Required', status: 'warning' },
        { label: 'Rollback Strategy', value: 'Configured', status: 'success' }
      ]
    },
    {
      id: 'digitalocean',
      title: 'DigitalOcean Core',
      icon: HardDrive,
      items: [
        { label: 'Droplet', value: 'frisky-do-core-01', status: 'success' },
        { label: 'Infisical', value: 'Pending', status: 'warning' },
        { label: 'Coolify', value: 'Next Phase', status: 'neutral' }
      ]
    },
    {
      id: 'access',
      title: 'Access Layer',
      icon: ShieldCheck,
      items: [
        { label: 'Primary Truth', value: 'Supabase', status: 'success' },
        { label: 'Fallback', value: 'Local Stars/Stripe', status: 'neutral' },
        { label: 'Tiers', value: 'Free, Client, Operator', status: 'neutral' }
      ]
    },
    {
      id: 'budget',
      title: 'Budget & Credits',
      icon: CurrencyDollar,
      items: [
        { label: 'Monthly Burn', value: '$200 (DO)', status: 'neutral' },
        { label: 'GCloud Credits', value: '$250 (60d)', status: 'success' },
        { label: 'Startup Priority', value: 'Google, Cloudflare', status: 'neutral' }
      ]
    },
    {
      id: 'agents',
      title: 'Active Agents',
      icon: Robot,
      items: [
        { label: 'Codex', value: 'Coordinator', status: 'success' },
        { label: 'Jules', value: 'Implementation', status: 'success' },
        { label: 'Gemini CLI', value: 'Architecture', status: 'success' }
      ]
    },
    {
      id: 'auth',
      title: 'Admin Auth',
      icon: IdentificationCard,
      items: [
        { label: 'Provider', value: 'Supabase Auth', status: 'success' },
        { label: 'Allowed Roles', value: 'Owner, Admin', status: 'success' },
        { label: 'Gate', value: 'Operator Token', status: 'success' }
      ]
    }
  ]

  return (
    <div className="w-full space-y-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground uppercase mb-2">
            Infrastructure Dashboard
          </h2>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Operator Console — FriskyDEVOS Alpha
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-panel rounded-md px-4 py-2 flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-[pulse-glow_3s_ease-in-out_infinite]" />
              <Globe size={16} className="text-primary relative" weight="bold" />
            </div>
            <span className="text-sm font-mono text-foreground uppercase tracking-wider">System Online</span>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] uppercase border-white/10 bg-white/5">
            v0.42.0-infra
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Card className="glass-panel border-white/[0.08] hover:border-white/[0.12] transition-colors p-6 flex flex-col h-full group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors">
                    <section.icon size={20} className="text-accent" weight="duotone" />
                  </div>
                  <h3 className="font-display font-medium text-foreground uppercase tracking-wide">
                    {section.title}
                  </h3>
                </div>
                <CaretRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="space-y-4 flex-grow">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-body text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-foreground uppercase tracking-tight">{item.value}</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'success' ? 'bg-primary' : 
                        item.status === 'warning' ? 'bg-amber-500' : 
                        'bg-slate-500'
                      } ${item.status === 'success' ? 'animate-[pulse-glow_2s_ease-in-out_infinite]' : ''}`} />
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6 bg-white/[0.05]" />
              
              <button className="w-full py-2 rounded font-mono text-[10px] uppercase tracking-widest bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all text-muted-foreground hover:text-foreground">
                Manage {section.title.split(' ')[0]}
              </button>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="glass-panel rounded-lg p-6 border-white/[0.08]"
      >
        <div className="flex items-center gap-4 mb-4">
          <Lightning size={20} className="text-primary" weight="fill" />
          <h3 className="font-display text-lg font-semibold text-foreground uppercase tracking-wide">
            Real-time Health
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Memory Usage', value: '42%' },
            { label: 'CPU Load', value: '18%' },
            { label: 'Storage', value: '2.4TB / 10TB' },
            { label: 'Uptime', value: '99.98%' }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
              <div className="mt-2 h-1 bg-white/[0.03] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: stat.value.includes('%') ? stat.value : '24%' }}
                  className="h-full bg-primary/40"
                  transition={{ delay: 1 + (i * 0.1), duration: 1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
