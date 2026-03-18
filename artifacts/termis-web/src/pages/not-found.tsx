import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[999] min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md p-8 glass-panel rounded-3xl animate-in fade-in zoom-in duration-300">
        
        <div className="flex justify-center">
          <div className="p-4 bg-destructive/10 rounded-full animate-bounce">
            <AlertTriangle className="w-12 h-12 text-destructive" />
          </div>
        </div>

        <div>
          <h1 className="text-7xl font-display font-bold text-foreground mb-2 tracking-tighter">
            404
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            Ops! Esta página não existe.
          </p>
        </div>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20 w-full"
        >
          Voltar ao Início
        </Link>

      </div>
    </div>
  );
}