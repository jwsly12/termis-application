# Documentação de Arquitetura: Termis Front-End

Esta documentação detalha a organização técnica e a estrutura de diretórios do **Termis** (Protótipo de Termostato Preditivo), servindo como guia para manutenção e escalabilidade do projeto.

---

## 1. Visão Geral do Ecossistema

O projeto é construído sobre uma arquitetura de **Single Page Application (SPA)** moderna, utilizando:

* **Vite**: Bundler de alta performance.
* **React + TypeScript**: Biblioteca de UI com tipagem estrita.
* **Tailwind CSS**: Estilização baseada em utilitários.
* **Shadcn/UI**: Sistema de design baseado em Radix UI.
* **Wouter**: Roteamento leve e eficiente.

---

## 2. Estrutura da Raiz do Projeto

Arquivos de configuração que orquestram o ambiente de desenvolvimento e build.

| Arquivo | Finalidade |
| :--- | :--- |
| `components.json` | Configurações do CLI Shadcn para instalação de componentes UI. |
| `index.html` | Ponto de montagem (mount) da aplicação no DOM. |
| `package.json` | Manifesto do Node.js: dependências, scripts e versões. |
| `tsconfig.json` | Regras do compilador TypeScript e mapeamento de aliases (`@/*`). |
| `vite.config.ts` | Definições de plugins, segurança e otimização do servidor local. |
| `requirements.yaml` | Documentação técnica de dependências de infraestrutura. |

---

## 3. Organização do Diretório `/src`

Onde reside a inteligência e os ativos visuais da aplicação.

### 3.1 Fluxo Principal

* **`main.tsx`**: Inicializa o React e injeta os provedores globais.
* **`App.tsx`**: Orquestrador de rotas e lógica de layout condicional (Login vs. Dashboard).
* **`index.css`**: Configurações globais de estilo e variáveis de cor (CSS Variables).

### 3.2 Arquitetura de Componentes (`/components`)

#### 3.2.1 Layout
Define a estrutura (shell) persistente do sistema.
* **`AppLayout.tsx`**: Container que injeta a Sidebar e Topbar em rotas autenticadas.
* **`Sidebar.tsx`**: Barra lateral de navegação com estados ativos.
* **`Topbar.tsx`**: Barra superior com informações de telemetria externa (Clima/Umidade).

#### 3.2.2 UI (Biblioteca Atômica)

* Atencão **`Caso queria saber como implementar algum compenente, você pode consultar o arquivo doc_ui.md dentro da pasta ui`**

Componentes modulares baseados no **Shadcn/UI**. São agnósticos à regra de negócio.

| Categoria | Componentes | Finalidade |
| :--- | :--- | :--- |
| **Estrutura** | `card`, `separator`, `scroll-area`, `resizable` | Organização de containers. |
| **Documentação** | `doc_ui` | Documentação de cada componente |
| **Entrada de Dados** | `button`, `input`, `select`, `switch`, `slider` | Interação e parâmetros. |
| **Feedback** | `alert`, `badge`, `progress`, `skeleton`, `toast` | Status e notificações. |
| **Navegação** | `breadcrumb`, `tabs`, `navigation-menu` | Deslocamento interno. |
| **Overlays** | `dialog`, `drawer`, `sheet`, `popover`, `tooltip` | Modais e elementos flutuantes. |
| **Dados** | `table`, `accordion`, `dropdown-menu`, `charts` | Telemetria e listagens. |

### 3.3 Camada de Dados e Lógica

#### 3.3.1 Hooks (`/src/hooks`)
Ponte entre a interface e o backend (NestJS).
* **`use-dashboard.ts`**: Gerencia telemetria, modos de IA e logs em tempo real.
* **`use-users.ts`**: CRUD de gerenciamento de operadores.
* **`use-toast.ts`**: Interface para disparar notificações.
* **`use-mobile.tsx`**: Adaptação de layout para dispositivos móveis.

#### 3.3.2 Utilitários (`/src/lib`)
* **`utils.ts`**: Contém a função `cn()` para manipulação dinâmica de classes Tailwind.

### 3.4 Páginas (`/src/pages`)
* **`Login.tsx`**: Ponto de entrada e autenticação.
* **`Dashboard.tsx`**: Monitoramento térmico e controle preditivo (B-R-O Mode).
* **`Users.tsx`**: Gestão de perfis e permissões.
* **`Settings.tsx`**: Configurações técnicas e calibração.
* **`not-found.tsx`**: Tratamento de erro 404.

---

## 4. Mapeamento Visual de Diretórios

```text
.
├── src/
│   ├── components/
│   │   ├── layout/      # Estrutura (Sidebar, Topbar)
│   │   └── ui/          # Componentes base (Botões, Modais, etc)
│   ├── hooks/           # Lógica de telemetria e chamadas API
│   ├── lib/             # Helpers e utilitários (cn function)
│   ├── pages/           # Views principais (Dashboard, Login, etc)
│   ├── App.tsx          # Router e lógica de proteção
│   └── main.tsx         # Bootstrap da aplicação
└── public/              # Assets estáticos (Ícones, Logo)
```

## 5. Fluxo de Desenvolvimento

### Instalação e Execução

Certifique-se de utilizar o **pnpm** para manter a consistência dos pacotes:

```bash
# Iniciar ambiente de desenvolvimento
pnpm dev

# Validar tipagem do TypeScript
pnpm tsc

# Gerar pacote de produção
pnpm build

```

### Padrão de Codificação

1. **Imports**: Utilize o alias `@/` para referenciar a pasta `src`.
2. **Componentes**: Devem ser criados com `export default` para facilitar o code-splitting.
3. **Estilos**: Priorize classes Tailwind. Evite estilos inline ou arquivos `.css` individuais por componente.

---
