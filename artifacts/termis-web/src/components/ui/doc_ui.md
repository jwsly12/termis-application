# Guia de Componentes: UI Library

Esta seção detalha sobre todos os componentes atômicos da nossa biblioteca, fornecendo uma introdução sobre sua aplicação no contexto do termostato e exemplos de implementação.

## 1. Accordion

**Introdução:** Organiza informações em seções colapsáveis. No **Termis**, é ideal para agrupar configurações avançadas ou detalhes técnicos de sensores na página de *Settings*, mantendo a interface limpa.

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ConfigSensores() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="sensor-1">
        <AccordionTrigger>Sensor de Umidade Externo</AccordionTrigger>
        <AccordionContent>
          Frequência de atualização: 5s. Calibração atual: +0.2%.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

```

## 2. Alert

**Introdução:** Fornece mensagens de status importantes. Essencial para notificar o usuário sobre anomalias térmicas ou falhas de conexão com o hardware do termostato.

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThermometerSnowflake } from "lucide-react";

export function AlertaGeada() {
  return (
    <Alert variant="destructive">
      <ThermometerSnowflake className="h-4 w-4" />
      <AlertTitle>Risco de Congelamento</AlertTitle>
      <AlertDescription>Temperatura externa abaixo de 0°C detectada.</AlertDescription>
    </Alert>
  );
}

```

## 3. Alert Dialog

**Introdução:** Uma janela modal de interrupção para ações críticas. Utilize para confirmar exclusões de usuários ou reinicialização dos parâmetros da IA.

```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function ConfirmarExclusao() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Remover Operador</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar ação?</AlertDialogTitle>
          <AlertDialogDescription>Este usuário perderá acesso imediato ao painel de controle.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Voltar</AlertDialogCancel>
          <AlertDialogAction>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

```

## 4. Aspect Ratio

**Introdução:** Mantém proporções fixas para elementos visuais. Útil para garantir que imagens de manuais técnicos ou previews de gráficos não distorçam em diferentes telas.

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function PreviewEquipamento() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio ratio={16 / 9}>
        <img src="/hardware-view.png" alt="Termostato" className="rounded-md object-cover" />
      </AspectRatio>
    </div>
  );
}

```

## 5. Avatar

**Introdução:** Representação visual do perfil. No sistema, é utilizado na *Sidebar* para mostrar o operador logado e suas iniciais como fallback.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfile() {
  return (
    <Avatar>
      <AvatarImage src="/profiles/sky.png" />
      <AvatarFallback>SK</AvatarFallback>
    </Avatar>
  );
}

```

## 6. Badge

**Introdução:** Rótulos informativos compactos. Perfeito para indicar o nível de privilégio (Admin/User) ou o estado operacional (Online/Offline).

```tsx
import { Badge } from "@/components/ui/badge";

export function StatusBadge() {
  return <Badge variant="secondary">Modo Eco Ativo</Badge>;
}

```

## 7. Breadcrumb

**Introdução:** Indica o caminho hierárquico da navegação. Fundamental para a página de *Users* ou *Logs* quando o usuário entra em subníveis de detalhes.

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export function Navegacao() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/dashboard">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Gerenciar Usuários</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

```

## 8. Button

**Introdução:** O componente interativo principal. Suporta variantes customizadas no Termis para ações de confirmação, cancelamento e links fantasmagóricos.

```tsx
import { Button } from "@/components/ui/button";

export function AcaoPrincipal() {
  return <Button variant="default" size="lg">Salvar Parâmetros</Button>;
}

```

## 9. Button Group

**Introdução:** Agrupamento lógico de botões. Excelente para seletores de intervalo de tempo nos gráficos (1h, 6h, 24h, 7d).

```tsx
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function IntervaloGrafico() {
  return (
    <ButtonGroup orientation="horizontal">
      <Button variant="outline">1H</Button>
      <Button variant="outline">24H</Button>
      <Button variant="outline">7D</Button>
    </ButtonGroup>
  );
}

```

## 10. Calendar

**Introdução:** Seletor de datas interativo. Essencial para a funcionalidade de "Programação Sazonal", onde o usuário define ciclos de temperatura para feriados ou datas futuras.

```tsx
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function AgendarManutencao() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}

```
Aqui está a continuação da documentação, seguindo exatamente o mesmo formato técnico e aplicado ao projeto **Termis**, cobrindo do componente 11 ao 20.

---

## 11. Card

**Introdução:** O principal container de conteúdo da interface. É utilizado no Dashboard para agrupar métricas específicas, como "Temperatura Atual", "Humidade" ou "Status do Sistema", fornecendo uma separação visual clara.

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricaTemperatura() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sala de Estar</CardTitle>
        <CardDescription>Sensor Norte - Ativo</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">22.5°C</p>
      </CardContent>
    </Card>
  );
}

```

## 12. Carousel

**Introdução:** Permite navegar por múltiplos itens em um espaço restrito. No Termis, pode ser usado para alternar entre diferentes câmeras de monitoramento térmico ou diferentes zonas da residência.

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function ZonasResidenciais() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>Zona 1: Cozinha</CarouselItem>
        <CarouselItem>Zona 2: Quartos</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

```

## 13. Chart (Container & Tooltip)

**Introdução:** Fornece a infraestrutura necessária para renderizar gráficos complexos usando Recharts. É o "motor" por trás da visualização de dados históricos de consumo e temperatura.

```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";

const config = { temperatura: { label: "Temp.", color: "#2563eb" } };

export function HistoricoGrafico() {
  return (
    <ChartContainer config={config}>
      <BarChart data={[{ data: "01/03", temp: 22 }]}>
        <Bar dataKey="temp" fill="var(--color-temperatura)" />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
}

```

## 14. Charts (Visualizações Customizadas)

**Introdução:** Contém componentes de visualização específicos, como o `DonutChart`, ideal para mostrar percentagens de eficiência energética ou progresso de metas de economia.

```tsx
import { DonutChart } from "@/components/ui/charts";

export function EficienciaIA() {
  return (
    <div className="flex flex-col items-center">
      <DonutChart percentage={85} size={150} />
      <span className="text-sm font-medium">Eficiência do B-R-O Mode</span>
    </div>
  );
}

```

## 15. Checkbox

**Introdução:** Permite a seleção de múltiplas opções. Útil na página de configurações para ativar/desativar notificações específicas ou selecionar dias da semana para rotinas automáticas.

```tsx
import { Checkbox } from "@/components/ui/checkbox";

export function NotificacoesConfig() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="alertas" />
      <label htmlFor="alertas">Alertas Críticos via Push</label>
    </div>
  );
}

```

## 16. Collapsible

**Introdução:** Semelhante ao Accordion, mas focado em um único bloco de conteúdo que pode ser expandido. Útil para mostrar logs detalhados de comandos que, por padrão, ficam escondidos.

```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function LogSimples() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Ver Log de Eventos</CollapsibleTrigger>
      <CollapsibleContent>
        [10:00:05] Ventilação ativada pela IA.
      </CollapsibleContent>
    </Collapsible>
  );
}

```

## 17. Command

**Introdução:** Uma interface de busca e comando "estilo K". Permite que o operador técnico busque rapidamente por usuários, dispositivos ou execute ações via teclado.

```tsx
import { Command, CommandInput, CommandList, CommandItem, CommandGroup } from "@/components/ui/command";

export function QuickSearch() {
  return (
    <Command>
      <CommandInput placeholder="Buscar dispositivo..." />
      <CommandList>
        <CommandGroup heading="Ações">
          <CommandItem>Reiniciar Sensores</CommandItem>
          <CommandItem>Exportar Logs</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

```

## 18. Context Menu

**Introdução:** Menu de opções que aparece ao clicar com o botão direito. Pode ser implementado nos cards de dispositivos para ações rápidas como "Calibrar" ou "Desativar" sem abrir uma página nova.

```tsx
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

export function AreaDispositivo({ children }: { children: React.ReactNode }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Editar Nome</ContextMenuItem>
        <ContextMenuItem className="text-destructive">Resetar</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

```

## 19. Dialog

**Introdução:** Uma janela sobreposta (modal) para tarefas focadas. Utilizado para formulários de criação de novos usuários ou edição de perfis de temperatura.

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function NovoUsuario() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar Operador</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Usuário</DialogTitle>
        </DialogHeader>
        {/* Formulário viria aqui */}
      </DialogContent>
    </Dialog>
  );
}

```

## 20. Drawer

**Introdução:** Um painel que desliza da borda da tela (geralmente do fundo no mobile). Ideal para controles rápidos do termostato em dispositivos móveis, como ajustar a temperatura atual.

```tsx
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export function MobileControls() {
  return (
    <Drawer>
      <DrawerTrigger>Ajuste Rápido</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Definir Temperatura</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 text-center text-2xl font-bold">24°C</div>
      </DrawerContent>
    </Drawer>
  );
}

```
Continuando a documentação dos componentes de UI para o projeto **Termis**, seguindo o padrão técnico estabelecido (21 ao 30):

---

## 21. Dropdown Menu

**Introdução:** Exibe uma lista de ações ou opções — como um menu de contexto, mas disparado por um botão. No Termis, é utilizado no cabeçalho para ações de perfil do usuário ou para trocar rapidamente entre unidades de medida (Celsius/Fahrenheit).

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function MenuUsuario() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Configurações</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

```

## 22. Empty

**Introdução:** Fornece um estado visual quando não há dados para exibir. Essencial para telas de "Histórico de Alertas" vazio ou quando nenhum sensor foi cadastrado ainda no sistema.

```tsx
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty";
import { SearchX } from "lucide-react";

export function SemAlertas() {
  return (
    <Empty>
      <EmptyMedia variant="icon"><SearchX /></EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>Nenhum alerta registrado</EmptyTitle>
        <EmptyDescription>O sistema está operando dentro dos parâmetros normais.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

```

## 23. Field

**Introdução:** Um conjunto de subcomponentes para construir campos de formulário consistentes, incluindo `FieldSet`, `FieldGroup` e `FieldError`. Garante que os rótulos e mensagens de erro estejam alinhados.

```tsx
import { FieldSet, FieldLegend, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function FormularioZona() {
  return (
    <FieldSet>
      <FieldLegend>Informações da Zona</FieldLegend>
      <FieldGroup>
        <Input placeholder="Ex: Escritório" />
      </FieldGroup>
    </FieldSet>
  );
}

```

## 24. Form

**Introdução:** Uma integração poderosa com `react-hook-form`. Fornece contexto e validação para entradas complexas, como a configuração de regras de automação do termostato.

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export function FormConfig() {
  const form = useForm();
  return (
    <Form {...form}>
      <FormField
        name="tempMax"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Temperatura Máxima</FormLabel>
            <FormControl><Input {...field} type="number" /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}

```

## 25. Hover Card

**Introdução:** Exibe informações detalhadas quando o usuário passa o mouse sobre um elemento. No Dashboard, pode ser usado para mostrar o status de bateria e sinal Wi-Fi de um sensor ao passar o mouse sobre o ícone dele.

```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function InfoSensor() {
  return (
    <HoverCard>
      <HoverCardTrigger className="underline">Sensor ID: 04</HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Hardware V2.1</p>
          <p className="text-xs text-muted-foreground">Bateria: 85% | Sinal: Excelente</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

```

## 26. Input

**Introdução:** O campo de entrada de texto padrão. No Termis, é estilizado para ser minimalista e funcional, utilizado em todos os diálogos de inserção de dados.

```tsx
import { Input } from "@/components/ui/input";

export function InputNomeSensor() {
  return <Input type="text" placeholder="Apelido do sensor..." />;
}

```

## 27. Input Group

**Introdução:** Agrupa inputs com botões ou ícones internos. Útil para campos de busca de logs ou inputs que possuem unidades de medida fixas (ex: campo de temperatura com "°C" fixo no final).

```tsx
import { InputGroup, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Thermometer } from "lucide-react";

export function InputTemperatura() {
  return (
    <InputGroup>
      <InputGroupText><Thermometer className="size-4" /></InputGroupText>
      <InputGroupInput type="number" placeholder="22" />
      <InputGroupText>°C</InputGroupText>
    </InputGroup>
  );
}

```

## 28. Input OTP

**Introdução:** Campo especializado para senhas de uso único (One-Time Password). Pode ser implementado no Termis como uma camada extra de segurança para autorizar mudanças críticas no sistema.

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function CodigoSeguranca() {
  return (
    <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}

```

## 29. Item

**Introdução:** Um componente flexível para criar listas de itens com títulos, descrições e ações. Ideal para a "Lista de Atividades Recentes" ou "Lista de Dispositivos Conectados".

```tsx
import { ItemGroup, Item, ItemHeader, ItemTitle, ItemDescription } from "@/components/ui/item";

export function ListaDispositivos() {
  return (
    <ItemGroup>
      <Item>
        <ItemHeader>
          <ItemTitle>Termostato Principal</ItemTitle>
        </ItemHeader>
        <ItemDescription>Conectado via MQTT - Online há 4 dias</ItemDescription>
      </Item>
    </ItemGroup>
  );
}

```

## 30. Kbd (Keyboard Key)

**Introdução:** Renderiza visualmente teclas do teclado. Utilizado dentro do `Command` ou em tooltips para ensinar atalhos de navegação rápida aos operadores do sistema.

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function AtalhoBusca() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Buscar Dispositivo:</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  );
}

## 31. Label

**Introdução:** Rótulo acessível vinculado a um campo de formulário. No Termis, é utilizado em todos os formulários de configuração para identificar claramente cada campo, como "Temperatura Mínima" ou "Nome do Operador".

```tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function CampoSetPoint() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="setpoint">Set Point (°C)</Label>
      <Input id="setpoint" type="number" placeholder="23" />
    </div>
  );
}

```

## 32. Menubar

**Introdução:** Uma barra de menus horizontal no estilo de aplicações desktop. Pode ser usada em páginas administrativas do Termis para agrupar ações como "Arquivo", "Exportar Logs" e "Relatórios".

```tsx
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";

export function BarraMenuAdmin() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Sistema</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Exportar Relatório</MenubarItem>
          <MenubarItem>Backup de Configurações</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Reiniciar Serviço</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Logs</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Ver Logs de Hoje</MenubarItem>
          <MenubarItem>Filtrar por Evento</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

```

## 33. Navigation Menu

**Introdução:** Navegação principal com suporte a submenus expansíveis. Ideal para uma versão de topbar do Termis com categorias como "Monitoramento", "Configurações" e "Relatórios".

```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export function NavPrincipal() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Monitoramento</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
            <NavigationMenuLink href="/sensores">Sensores</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/relatorios">Relatórios</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

```

## 34. Pagination

**Introdução:** Controla a navegação entre páginas de dados tabulares. Essencial na página de *Usuários* ou em listas de histórico de eventos com grande volume de registros.

```tsx
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export function PaginacaoLogs() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

```

## 35. Popover

**Introdução:** Uma sobreposição flutuante ancorada a um elemento. No Termis, é utilizado para exibir detalhes rápidos de um sensor ao clicar no ícone dele no mapa de zonas, sem abandonar a tela atual.

```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function DetalheSensor() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon"><Info className="size-4" /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="font-semibold text-sm">Sensor #03 — Sala</p>
        <p className="text-xs text-muted-foreground mt-1">Temp: 23.1°C | Umidade: 55% | Sinal: Ótimo</p>
      </PopoverContent>
    </Popover>
  );
}

```

## 36. Progress

**Introdução:** Barra de progresso linear. No Termis, pode representar visualmente a carga atual do sistema de refrigeração (%), o progresso de uma calibração ou o consumo energético em relação à meta diária.

```tsx
import { Progress } from "@/components/ui/progress";

export function CargaSistema() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Carga do Sistema</span>
        <span className="font-semibold">45%</span>
      </div>
      <Progress value={45} className="h-2" />
    </div>
  );
}

```

## 37. Radio Group

**Introdução:** Seleção exclusiva entre múltiplas opções. Utilizado na página de *Configurações* para que o operador escolha entre os modos de operação da IA: "Automático", "Manual" ou "Econômico".

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function SeletorModoIA() {
  return (
    <RadioGroup defaultValue="automatico">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="automatico" id="auto" />
        <Label htmlFor="auto">Automático (IA)</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="economico" id="eco" />
        <Label htmlFor="eco">Econômico</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="manual" id="manual" />
        <Label htmlFor="manual">Manual</Label>
      </div>
    </RadioGroup>
  );
}

```

## 38. Resizable

**Introdução:** Painéis com divisórias arrastáveis pelo usuário. No Termis, permite que o operador ajuste o espaço entre o painel de gráficos e o log de eventos no Dashboard, personalizando seu ambiente de trabalho.

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export function LayoutDashboard() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-[400px] rounded-lg border">
      <ResizablePanel defaultSize={65}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm text-muted-foreground">Gráfico de Temperatura</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={35}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm text-muted-foreground">Log de Eventos</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

```

## 39. Scroll Area

**Introdução:** Área de rolagem customizada com scrollbar estilizada. Fundamental no painel de "LOG DE EVENTOS (Tempo Real)" do Dashboard, mantendo o histórico acessível sem desconfigurar o layout da tela.

```tsx
import { ScrollArea } from "@/components/ui/scroll-area";

const eventos = [
  "[13:00] Evento IA — Ajuste de Set Point.",
  "[13:05] Ajuste de Carga Confirmado.",
  "[13:08] Temperatura Estável.",
  "[13:10] Carga do Sistema Estável.",
  "[13:15] Sincronização de Nuvem Concluída.",
];

export function LogEventos() {
  return (
    <ScrollArea className="h-40 rounded-md border p-3">
      <div className="space-y-1">
        {eventos.map((e, i) => (
          <p key={i} className="text-xs text-muted-foreground">{e}</p>
        ))}
      </div>
    </ScrollArea>
  );
}

```

## 40. Select

**Introdução:** Menu suspenso de seleção única. No Termis, é utilizado para que o operador escolha a zona de monitoramento ativa, o intervalo de tempo dos gráficos ou o tipo de relatório a ser gerado.

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SeletorZona() {
  return (
    <Select defaultValue="sala">
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Selecionar zona..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sala">Sala de Estar</SelectItem>
        <SelectItem value="cozinha">Cozinha</SelectItem>
        <SelectItem value="quarto">Quarto Principal</SelectItem>
        <SelectItem value="escritorio">Escritório</SelectItem>
      </SelectContent>
    </Select>
  );
}

```

## 41. Separator

**Introdução:** Uma linha divisória horizontal ou vertical para organizar visualmente seções distintas. No Termis, separa grupos de configurações dentro de um card, como "Parâmetros de Temperatura" e "Parâmetros de Umidade".

```tsx
import { Separator } from "@/components/ui/separator";

export function SecaoConfig() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold">Parâmetros de Temperatura</h4>
        <p className="text-xs text-muted-foreground">Set Point mínimo e máximo permitidos.</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-semibold">Parâmetros de Umidade</h4>
        <p className="text-xs text-muted-foreground">Faixa de operação do desumidificador.</p>
      </div>
    </div>
  );
}

```

## 42. Sheet

**Introdução:** Um painel lateral deslizante (off-canvas). No Termis, é ideal para exibir os detalhes completos de um usuário ou de um sensor ao clicar em um item da lista, sem abandonar o contexto da página principal.

```tsx
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function DetalhesOperador() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Ver Perfil</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ana Silva</SheetTitle>
          <SheetDescription>Administradora do Sistema — Ativa desde Jan/2024</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-2 text-sm">
          <p><span className="text-muted-foreground">E-mail:</span> ana.silva@termis.com</p>
          <p><span className="text-muted-foreground">Último acesso:</span> Hoje, 10:23</p>
          <p><span className="text-muted-foreground">Permissões:</span> Total</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

```

## 43. Sidebar

**Introdução:** O componente de navegação lateral estrutural da aplicação. No Termis, é o container que engloba o logo "PROTÓTIPO DE TERMOSTATO PREDITIVO", os links de navegação (Home, Usuários, Configurações) e o perfil do operador logado na base.

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Settings, Users } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="font-bold text-xs tracking-wider">PROTÓTIPO DE TERMOSTATO PREDITIVO</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive><Home /> Home</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><Users /> Usuários</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><Settings /> Configurações</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground">João Doe — Admin</p>
      </SidebarFooter>
    </Sidebar>
  );
}

```

## 44. Skeleton

**Introdução:** Placeholder animado que indica carregamento de conteúdo. Utilizado no Dashboard enquanto os dados do termostato (temperatura atual, estatísticas do dia) são buscados da API, evitando a sensação de tela em branco.

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDashboard() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-16 w-40" />
      <div className="flex gap-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

```

## 45. Slider

**Introdução:** Controle deslizante para seleção de valores numéricos em uma faixa. No Termis, é o componente ideal para o ajuste manual do Set Point de temperatura, permitindo uma interação mais intuitiva do que um campo numérico.

```tsx
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function AjusteSetPoint() {
  const [value, setValue] = useState([23]);
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span>Set Point</span>
        <span className="font-bold text-primary">{value[0]}°C</span>
      </div>
      <Slider
        min={16}
        max={30}
        step={0.5}
        value={value}
        onValueChange={setValue}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>16°C</span>
        <span>30°C</span>
      </div>
    </div>
  );
}

```

## 46. Sonner

**Introdução:** Sistema de notificações toast não-intrusivas baseado na biblioteca Sonner. No Termis, é disparado em resposta a eventos como "Set Point atualizado com sucesso" ou "Falha na conexão com o sensor".

```tsx
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function BotaoSalvar() {
  const handleSave = () => {
    toast.success("Parâmetros salvos!", {
      description: "O novo Set Point de 23°C foi aplicado com sucesso.",
    });
  };

  return (
    <Button onClick={handleSave}>Salvar Configurações</Button>
  );
}

```

## 47. Spinner

**Introdução:** Indicador circular de carregamento. No Termis, é exibido dentro de botões durante o envio de comandos à API (ex: ao confirmar um novo Set Point) ou enquanto a IA está processando uma nova predição.

```tsx
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function BotaoAplicar() {
  const [loading, setLoading] = useState(false);

  const aplicar = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button onClick={aplicar} disabled={loading}>
      {loading ? <Spinner className="mr-2" /> : null}
      {loading ? "Aplicando..." : "Aplicar Modo IA"}
    </Button>
  );
}

```

## 48. Switch

**Introdução:** Alternância binária de estado (ligado/desligado). É o componente central do painel de "CONTROLES" no Dashboard, utilizado para o "MODO IA" — permitindo ativar ou desativar a predição inteligente com um único clique.

```tsx
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function ControleModoIA() {
  const [ativo, setAtivo] = useState(true);
  return (
    <div className="flex items-center gap-3">
      <Switch id="modo-ia" checked={ativo} onCheckedChange={setAtivo} />
      <Label htmlFor="modo-ia" className="font-semibold tracking-widest text-xs">
        MODO IA
      </Label>
    </div>
  );
}

```

## 49. Table

**Introdução:** Tabela de dados estruturada e acessível. É o componente principal da página de *Usuários*, exibindo colunas como Nome, E-mail, Função, Status e Ações de forma organizada e responsiva.

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const usuarios = [
  { nome: "Ana Silva", email: "ana@termis.com", role: "Admin", status: "Ativo" },
  { nome: "Carlos Mendes", email: "carlos@termis.com", role: "Usuário", status: "Ativo" },
];

export function TabelaUsuarios() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Função</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usuarios.map((u) => (
          <TableRow key={u.email}>
            <TableCell className="font-medium">{u.nome}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.role}</TableCell>
            <TableCell>
              <Badge variant={u.status === "Ativo" ? "default" : "secondary"}>{u.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

```

## 50. Tabs

**Introdução:** Navegação por abas para alternar entre seções de conteúdo dentro de uma mesma página. Na página de *Configurações* do Termis, organiza grupos distintos como "Predição de IA", "Agendamentos" e "Notificações".

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ConfigTabs() {
  return (
    <Tabs defaultValue="ia">
      <TabsList>
        <TabsTrigger value="ia">Predição de IA</TabsTrigger>
        <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
        <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
      </TabsList>
      <TabsContent value="ia">
        <p className="text-sm text-muted-foreground">Parâmetros do modelo preditivo e thresholds de ativação.</p>
      </TabsContent>
      <TabsContent value="agendamentos">
        <p className="text-sm text-muted-foreground">Rotinas programadas por dia da semana e feriados.</p>
      </TabsContent>
      <TabsContent value="notificacoes">
        <p className="text-sm text-muted-foreground">Canais de alerta: Push, E-mail, SMS.</p>
      </TabsContent>
    </Tabs>
  );
}

```

## 51. Textarea

**Introdução:** Campo de texto multilinha. No Termis, utilizado para que o operador adicione notas de manutenção a um sensor específico ou descreva o motivo de uma intervenção manual no sistema.

```tsx
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function NotaManutencao() {
  return (
    <div className="space-y-2">
      <Label htmlFor="nota">Nota de Manutenção</Label>
      <Textarea
        id="nota"
        placeholder="Descreva a intervenção realizada ou o motivo do ajuste manual..."
        className="min-h-24 resize-none"
      />
    </div>
  );
}

```

## 52. Toast

**Introdução:** O componente primitivo de notificação temporária, base para o sistema de toasts da aplicação. No Termis, é a camada de infraestrutura que suporta as notificações de confirmação e erro exibidas ao usuário.

```tsx
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function BotaoConectar() {
  const { toast } = useToast();

  const conectar = () => {
    toast({
      title: "Conexão estabelecida",
      description: "Termostato principal sincronizado com sucesso.",
    });
  };

  return <Button onClick={conectar}>Conectar Dispositivo</Button>;
}

```

## 53. Toaster

**Introdução:** O container global que renderiza todos os toasts na tela. É adicionado uma única vez no `App.tsx` e garante que as notificações do Termis apareçam corretamente em todas as páginas da aplicação.

```tsx
import { Toaster } from "@/components/ui/toaster";

export function AppRoot() {
  return (
    <>
      {/* ... rotas e providers ... */}
      <Toaster />
    </>
  );
}

```

## 54. Toggle

**Introdução:** Botão com estado alternável (pressionado/não-pressionado). No Termis, é utilizado nos controles rápidos do painel para ativar modos como "ECONOMIA" ou "CONFORTO RÁPIDO", mantendo o estado visual ativo visivelmente destacado.

```tsx
import { Toggle } from "@/components/ui/toggle";
import { Leaf } from "lucide-react";

export function BotaoEconomia() {
  return (
    <Toggle aria-label="Modo Economia" className="w-full justify-start gap-2">
      <Leaf className="size-4" />
      ECONOMIA
    </Toggle>
  );
}

```

## 55. Toggle Group

**Introdução:** Grupo de toggles mutuamente exclusivos ou independentes. No Termis, substitui os botões de seleção de modo ("ECONOMIA" / "CONFORTO RÁPIDO") garantindo que apenas um modo esteja ativo por vez.

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Leaf, Zap } from "lucide-react";

export function SeletorModo() {
  return (
    <ToggleGroup type="single" defaultValue="economia" className="flex-col w-full">
      <ToggleGroupItem value="economia" className="w-full justify-start gap-2">
        <Leaf className="size-4" /> ECONOMIA
      </ToggleGroupItem>
      <ToggleGroupItem value="conforto" className="w-full justify-start gap-2">
        <Zap className="size-4" /> CONFORTO RÁPIDO
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

```

## 56. Tooltip

**Introdução:** Dica flutuante exibida ao passar o mouse sobre um elemento. No Termis, enriquece os ícones da topbar (nuvem, usuário, microfone) com descrições contextuais, e explica métricas como "Eficiência da Predição" sem poluir a interface principal.

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Cloud } from "lucide-react";

export function IconeNuvem() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-green-400"><Cloud className="size-5" /></button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sincronizado com a nuvem — Última sync: 13:15</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

