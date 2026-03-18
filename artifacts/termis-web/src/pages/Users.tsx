import { useState } from "react";
import { Plus, Search, Trash2, Edit, Loader2 } from "lucide-react";
import { useUsers, useDeleteUser } from "@/hooks/use-users";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// 1. Schema do Zod (Validação igual ao seu Login)
const registerSchema = z.object({
  username: z.string().min(3, "O usuário deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Users() {
  const { data: users, isLoading, refetch } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [open, setOpen] = useState(false); // Estado para fechar o modal

  // 2. Hook Form configurado com Zod
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" }
  });

  // 3. Função de Registro (Ajustada do seu padrão de fetch)
  async function handleRegister(values: RegisterFormValues) {
    setIsLoadingSubmit(true);
    try {
      const response = await fetch('/api/auth/register', { 
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const responseText = await response.text();
      let data;
      try { data = JSON.parse(responseText); } catch (e) {
        throw new Error("Erro na resposta do servidor.");
      }

      if (!response.ok) {
        const errorMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errorMsg || "Erro ao cadastrar");
      }

      toast({ title: "Sucesso", description: "Operador cadastrado!" });
      
      reset(); // Limpa o form
      setOpen(false); // Fecha o modal
      refetch(); // Atualiza a tabela na hora

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no Cadastro",
        description: error.message,
      });
    } finally {
      setIsLoadingSubmit(false);
    }
  }

  const filteredUsers = users?.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground mt-1">Administre o acesso ao painel do termostato preditivo.</p>
        </div>

        {/* Modal controlado pelo state 'open' */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 shrink-0">
              <Plus className="w-5 h-5" />
              Novo Usuário
            </button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[425px] glass-panel border-white/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">Cadastrar Operador</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Insira as credenciais para o novo acesso ao sistema Termis.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleRegister)} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="username" className={errors.username ? "text-destructive" : ""}>Nome de Usuário</Label>
                <Input 
                  id="username" 
                  {...register("username")}
                  autoComplete="off" 
                  className="bg-background/50" 
                />
                {errors.username && <p className="text-xs text-destructive">{errors.username.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>E-mail</Label>
                <Input 
                  id="email" 
                  {...register("email")}
                  autoComplete="off"
                  className="bg-background/50" 
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  {...register("password")}
                  autoComplete="new-password"
                  className="bg-background/50" 
                />
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>

              <DialogFooter className="mt-4">
                <Button type="submit" disabled={isLoadingSubmit} className="w-full">
                  {isLoadingSubmit && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  Finalizar e Salvar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-card/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-muted-foreground font-medium border-b border-white/5 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Último Login</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center animate-pulse">Carregando...</td></tr>
              ) : filteredUsers?.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-secondary text-xs">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs border", user.status === 'Ativo' ? "text-primary border-primary/20" : "text-muted-foreground border-border")}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", user.status === 'Ativo' ? "bg-primary" : "bg-muted-foreground")} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => deleteUser(user.id)} disabled={isDeleting} className="p-1.5 hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}