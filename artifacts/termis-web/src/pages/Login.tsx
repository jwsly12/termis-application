import { useState } from "react";
import { LogIn, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { da } from "date-fns/locale";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  
});

export default function LoginPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit"
  });

 /*
 Formulário de envio da  requisição
 Formato:
{ 
 email: "teste@gmail.com",
 password:"123456"
 }

 */  
  async function onSubmit(values: z.infer<typeof loginSchema>) {
  setIsLoading(true);
  console.log("1. Enviando dados:", values);

  try {
    const response = await fetch('/api/auth/login', { 
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    console.log("2. Status HTTP:", response.status);

    // Pega a resposta como texto primeiro para evitar o SyntaxError
    const responseText = await response.text();
    console.log("3. Conteúdo bruto da resposta:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      // Se cair aqui, a API retornou HTML ou Vazio (Erro de Proxy/Rota)
      throw new Error(`O servidor não enviou um JSON válido. Status: ${response.status}`);
    }

    if (!response.ok) {
      throw new Error(data.message || "Falha na Autenticação");
    }

    console.log("4. Login OK!");
    localStorage.setItem("token", data.access_token);
    
    toast({ title: "Sucesso", description: "Login realizado!" });

  } catch (error: any) {
    console.error("5. Detalhes do Erro:", error);
    toast({
      variant: "destructive",
      title: "Erro de Conexão",
      description: error.message,
    });
  } finally {
    setIsLoading(false);
  }
}

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

      <Card className="w-full max-w-[400px] border-white/5 bg-card/50 backdrop-blur-2xl rounded-3xl shadow-2xl relative z-10">
        <CardHeader className="space-y-2 pb-8">
          <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 mb-2">
            <ShieldCheck className="text-primary w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-bold text-center text-foreground tracking-tight">
            Termis Login
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground text-sm">
            Administração de Termostato Preditivo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">E-mail</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="operador@termis.com" 
                        {...field} 
                        className="bg-background/50 border-white/10 rounded-xl h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Senha</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        className="bg-background/50 border-white/10 rounded-xl h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl"
              >
                {isLoading ? "Carregando..." : "Entrar no Painel"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}