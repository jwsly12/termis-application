import { Menu, Mic, CloudRain, Bell, Search, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Topbar() {
  const now = new Date();
  
  return (
    <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 rounded-lg text-muted-foreground hover:bg-accent/10 md:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
          <Mic className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-6 px-6 py-2 rounded-full bg-secondary/50 border border-white/5 shadow-inner">
        <span className="text-sm font-medium text-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          TERESINA-PI
        </span>
        <div className="w-px h-4 bg-border"></div>
        <span className="text-sm text-muted-foreground flex items-center gap-2">
          CLIMA EXT: <span className="text-warning font-semibold">38°C</span> (Alta Previsão)
        </span>
        <div className="w-px h-4 bg-border"></div>
        <span className="text-sm text-muted-foreground flex items-center gap-2">
          UMIDADE: <span className="text-destructive font-semibold">20%</span> (Muito Baixa)
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border">
          <span className="text-xs font-mono text-primary font-medium">00:03:43</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-muted-foreground hover:bg-secondary transition-colors relative">
            <CloudRain className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full text-muted-foreground hover:bg-secondary transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-background"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
