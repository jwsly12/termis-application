import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, Settings, Activity } from "lucide-react";
import { cn } from "@/lib/utils";


/*
Aqui ficam os mopeamento das páginas
*/
const navItems = [
  { name: "Home", href: "/home", icon: LayoutDashboard },
  { name: "Configurações", href: "/config", icon: Settings },
  { name: "Usuários", href: "/users", icon: Users },
  { name: "Análise Avançada", href: "#", icon: Activity },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col hidden md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-sm tracking-wide text-sidebar-foreground leading-tight">
            PROTÓTIPO DE<br/>TERMOSTATO PREDITIVO
          </span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
              isActive 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-card rounded-xl p-4 border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
            JD
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">João Doe</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
