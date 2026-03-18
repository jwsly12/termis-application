import { useState } from "react";
import { Save, Cpu, ThermometerSun, Bell } from "lucide-react";

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Configurações do Sistema</h1>
        <p className="text-muted-foreground mt-1">Ajuste os parâmetros da IA e limites de temperatura.</p>
      </div>

      <div className="grid gap-6">
        
        {/* IA Configs */}
        <section className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Modelo de Inteligência Artificial</h2>
          </div>
          
          <div className="space-y-4 max-w-2xl">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Agressividade da Predição</label>
              <select className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary">
                <option value="balanced">Balanceado (Padrão)</option>
                <option value="eco">Foco em Economia</option>
                <option value="comfort">Foco em Conforto</option>
              </select>
              <p className="text-xs text-muted-foreground">Define o quão agressivo o modelo será ao antecipar variações climáticas.</p>
            </div>

            <div className="grid gap-2 pt-2">
              <label className="text-sm font-medium text-foreground flex items-center justify-between">
                <span>Taxa de Aprendizado Contínuo</span>
                <span className="text-primary font-mono text-xs bg-primary/10 px-2 py-0.5 rounded">Ativo</span>
              </label>
              <div className="flex items-center gap-4">
                <input type="range" className="flex-1 accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>
        </section>

        {/* Thermostat Configs */}
        <section className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="p-2 bg-warning/10 rounded-lg text-warning">
              <ThermometerSun className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Limites de Temperatura</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Temperatura Máxima (°C)</label>
              <input 
                type="number" 
                defaultValue={26}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Temperatura Mínima (°C)</label>
              <input 
                type="number" 
                defaultValue={18}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Histerese (°C)</label>
              <input 
                type="number" 
                step="0.1"
                defaultValue={0.5}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">Diferença de temperatura para ligar/desligar o compressor.</p>
            </div>
          </div>
        </section>

      </div>

      <div className="flex justify-end pt-4 pb-12">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isSaving ? "Salvando..." : "Salvar Configurações"}
        </button>
      </div>
    </div>
  );
}
