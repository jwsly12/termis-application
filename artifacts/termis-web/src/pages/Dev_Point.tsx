import { useState } from "react";
import { Bug, Terminal, RefreshCw, Layout } from "lucide-react";

export default function DevPoint() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header Principal */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Terminal className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Dev Point</h1>
            <p className="text-muted-foreground text-sm">Sandbox para testes de componentes e lógica.</p>
          </div>
        </div>
      </div>

      {/* BANNER VISUAL (A Imagem Estratégica) */}
      <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-black/20 h-[200px] transition-all hover:border-primary/30">
        {/* Efeito de brilho ao fundo (Glow) baseado na imagem */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative h-full w-full flex flex-col md:flex-row items-center overflow-hidden rounded-3xl">
          {/* Texto de Sobreposição no Banner */}
          <div className="z-10 p-8 flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">Visual Debugger</h2>
            <p className="text-gray-400 max-w-md">
              Acompanhe as mudanças de estado e variáveis de ambiente em tempo real nesta interface.
            </p>
          </div>

          {/* A Imagem vinda do /public */}
          <div className="relative w-full md:w-1/4 h-full">
            <img 
              src="public/image.png" 
              alt="Visual Header" 
              className="absolute inset-0 w-full h-full object-cover object-center mask-gradient-side"
              // Dica: 'mask-gradient-side' é opcional, mas você pode usar uma máscara CSS 
              // para suavizar a borda esquerda da imagem com o background
            />
            {/* Overlay para suavizar a transição com o fundo escuro da esquerda */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:from-black/80 md:via-transparent" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card de Teste de Estado */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-primary" /> Teste de Estado
          </h2>
          <p className="text-sm text-muted-foreground">Verifique se o re-render está funcionando.</p>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-mono font-bold text-white">{count}</span>
            <button 
              onClick={() => setCount(prev => prev + 1)}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:brightness-110 active:scale-95 transition-all font-medium"
            >
              Incrementar
            </button>
          </div>
        </div>

        {/* Card de Logs/Debug */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-md space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-destructive">
            <Bug className="w-5 h-5" /> Debug Info
          </h2>
          <pre className="text-[10px] md:text-xs font-mono p-4 bg-black/40 rounded-xl overflow-auto text-green-400 border border-white/5">
            {JSON.stringify({
              url: typeof window !== 'undefined' ? window.location.pathname : 'server',
              screen: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '0x0',
              timestamp: new Date().toLocaleTimeString()
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}