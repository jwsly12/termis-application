import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";


export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative z-10">
          {children}
        </main>
        
        {/* Decorative elements */}
        <div className="fixed bottom-6 right-6 opacity-20 pointer-events-none z-0">
        </div>
        <div className="fixed top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      </div>
    </div>
  );
}
