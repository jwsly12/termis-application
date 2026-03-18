import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AppLayout } from "@/components/layout/AppLayout";

import Dashboard from "@/pages/Dashboard";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import DevPoint from "./pages/Dev_Point";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

 /*
Configuração das rotas da aplicação
  
/ --> Login
/users --> Usuários
/home --> Dashboard
/config --> configurações

O Redirecionamento também está mapeado em Sidebar.tsx
*/ 

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dev" component={DevPoint} />
      <Route path="/home">
        <AppLayout><Dashboard /></AppLayout>
      </Route>
      
      <Route path="/users">
        <AppLayout><Users /></AppLayout>
      </Route>

      <Route path="/config">
        <AppLayout><Settings /></AppLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;