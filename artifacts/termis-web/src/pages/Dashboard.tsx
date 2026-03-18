import { motion } from "framer-motion";
import { Activity, Power, Snowflake, Thermometer, Zap, AlertTriangle, TrendingDown, Sun } from "lucide-react";
import { DonutChart, GaugeChart } from "@/components/ui/charts";
import { useSystemStatus, useEventLogs, useUpdateControls } from "@/hooks/use-dashboard";
import { cn } from "@/lib/utils";

function Card({ children, className, title }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <div className={cn("glass-panel rounded-2xl flex flex-col overflow-hidden", className)}>
      {title && (
        <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <h3 className="font-display font-semibold text-lg text-foreground tracking-tight">{title}</h3>
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: status, isLoading } = useSystemStatus();
  const { data: events } = useEventLogs();
  const { mutate: updateControls, isPending } = useUpdateControls();

  if (isLoading || !status) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-mono text-sm animate-pulse">Inicializando sistemas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: Temp & AI */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-gradient-to-br from-card to-card/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Temperatura Atual</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-display font-bold text-foreground tracking-tighter">
                    {status.currentTemp}
                  </span>
                  <span className="text-3xl text-muted-foreground">°C</span>
                </div>
              </div>
              <div className="p-3 bg-secondary/50 rounded-xl">
                <Thermometer className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">SET POINT:</span>
              <span className="text-xl font-mono text-foreground">{status.setPoint.toFixed(1)}°C</span>
            </div>
          </Card>

          <Card title="Análise de Desempenho da IA">
            <div className="flex flex-col items-center py-4">
              <DonutChart percentage={status.aiEfficiency} size={140} strokeWidth={12} className="mb-6" />
              
              <div className="w-full text-center mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Eficiência da Predição</p>
                <p className="text-xl font-bold text-warning font-display">EXCELENTE ({status.aiEfficiency}%)</p>
              </div>

              <div className="w-full space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">Ajuste de Carga</span>
                  </div>
                  <span className="font-mono font-medium">{status.loadAdjustment}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-muted-foreground">Conforto</span>
                  </div>
                  <span className="font-mono font-medium">{status.comfort}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning"></div>
                    <span className="text-muted-foreground">Economia</span>
                  </div>
                  <span className="font-mono font-medium">{status.savings}%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Column 2: Stats */}
        <div className="lg:col-span-4 space-y-6">
          <Card title="Estatísticas do Dia" className="h-full">
            <div className="space-y-8 py-2">
              
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Consumo de Energia</p>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {status.energyConsumption} <span className="text-sm text-muted-foreground font-sans font-normal">kWh (estimado)</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-500/10 rounded-xl shrink-0">
                  <Snowflake className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Tempo de Refrigeração</p>
                  <p className="text-2xl font-display font-bold text-foreground">
                    6h 15m
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Carga do Sistema: {status.systemLoad}%</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <h4 className="text-sm font-medium text-foreground mb-6">Estimativa de Economia</h4>
                <div className="flex flex-col items-center">
                  <GaugeChart percentage={status.estimatedEnergySavings} size={180} />
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-4">Economia Estimada</p>
                  
                  <div className="mt-6 w-full bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingDown className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-primary">Redução Projetada:</span>
                    </div>
                    <span className="font-mono font-bold text-primary">R$ {status.projectedSavings.toFixed(2)}/mês</span>
                  </div>
                </div>
              </div>

            </div>
          </Card>
        </div>

        {/* Column 3: Controls */}
        <div className="lg:col-span-4 space-y-6">
          <Card title="Controles" className="bg-secondary/20">
            <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-white/5 mb-6">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">MODO IA</span>
              </div>
              <button 
                onClick={() => updateControls({ aiModeEnabled: !status.aiModeEnabled })}
                disabled={isPending}
                className={cn(
                  "w-14 h-7 rounded-full relative transition-colors duration-300 focus:outline-none",
                  status.aiModeEnabled ? "bg-primary" : "bg-muted"
                )}
              >
                <motion.div 
                  layout
                  className="w-5 h-5 bg-white rounded-full absolute top-1"
                  animate={{ left: status.aiModeEnabled ? "calc(100% - 24px)" : "4px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => updateControls({ activeProfile: 'ECONOMIA' })}
                disabled={!status.aiModeEnabled || isPending}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 border",
                  status.activeProfile === 'ECONOMIA' 
                    ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                    : "bg-card border-white/5 text-muted-foreground hover:bg-card/80",
                  !status.aiModeEnabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="font-semibold tracking-wide">ECONOMIA</span>
                {status.activeProfile === 'ECONOMIA' && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
              </button>

              <button 
                onClick={() => updateControls({ activeProfile: 'CONFORTO_RAPIDO' })}
                disabled={!status.aiModeEnabled || isPending}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 border",
                  status.activeProfile === 'CONFORTO_RAPIDO' 
                    ? "bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                    : "bg-card border-white/5 text-muted-foreground hover:bg-card/80",
                  !status.aiModeEnabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="font-semibold tracking-wide">CONFORTO RÁPIDO</span>
                {status.activeProfile === 'CONFORTO_RAPIDO' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
              </button>

              <button 
                onClick={() => updateControls({ activeProfile: 'BRO_MODE' })}
                disabled={!status.aiModeEnabled || isPending}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 border",
                  status.activeProfile === 'BRO_MODE' 
                    ? "bg-accent/10 border-accent text-accent shadow-[0_0_15px_rgba(245,158,11,0.15)]" 
                    : "bg-card border-white/5 text-muted-foreground hover:bg-card/80",
                  !status.aiModeEnabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-2">
                  <Sun className={cn("w-5 h-5", status.activeProfile === 'BRO_MODE' ? "text-accent" : "text-muted-foreground")} />
                  <span className="font-semibold tracking-wide">B-R-O Bró Mode</span>
                </div>
                {status.activeProfile === 'BRO_MODE' && <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Event Log */}
      <Card title="Log de Eventos (Tempo Real)" className="mt-6">
        <div className="h-48 overflow-y-auto pr-4 scrollbar-thin space-y-3 font-mono text-sm">
          {!events ? (
            <div className="animate-pulse text-muted-foreground">Carregando logs...</div>
          ) : events.map((event) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={event.id} 
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <span className="text-cyan-400 shrink-0">[{event.timestamp}]</span>
              <span className={cn(
                "shrink-0",
                event.type === 'info' && "text-blue-400",
                event.type === 'warning' && "text-warning",
                event.type === 'success' && "text-primary"
              )}>
                {event.type === 'info' && 'ℹ'}
                {event.type === 'warning' && '⚠'}
                {event.type === 'success' && '✓'}
              </span>
              <span className="text-muted-foreground break-words">{event.message}</span>
            </motion.div>
          ))}
        </div>
      </Card>

    </div>
  );
}
