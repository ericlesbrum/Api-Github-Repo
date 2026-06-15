# API GitHub Dev — Estudo de React

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled--Components-6-DB7093?logo=styled-components&logoColor=white)

Projeto de estudo prático de **React 19** desenvolvido para consolidar conceitos fundamentais e intermediários do framework. O projeto consome a **API do GitHub** (ou um mock local via JSON Server) para exibir perfis e repositórios de usuários, abrangendo desde a criação de componentes até a manipulação de estado, efeitos colaterais, rotas, estilização com CSS-in-JS e criação de custom hooks.

> 🇧🇷 **[Leia em Português](README.pt-br.md)** | 🇺🇸 **[Read in English](README.en.md)**

---

## Índice

- [Objetivos de Estudo](#objetivos-de-estudo)
- [Conceitos React Praticados](#conceitos-react-praticados)
- [Funcionalidades do Projeto](#funcionalidades-do-projeto)
- [Demonstração Visual](#demonstração-visual)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Mapa de Conceitos por Arquivo](#mapa-de-conceitos-por-arquivo)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos e Instalação](#pré-requisitos-e-instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Licença](#licença)

---

## Objetivos de Estudo

Este projeto foi criado como exercício prático para aprender e aplicar:

1. **Componentes funcionais** — construção de interfaces com componentes reutilizáveis e composição de componentes
2. **Hooks do React** — uso intensivo de `useState`, `useEffect`, `useMemo`, `useCallback` e criação de custom hooks
3. **Gerenciamento de estado** — estado local com `useState`, levantamento de estado (lifting state up) e fluxo de dados unidirecional
4. **Efeitos colaterais** — carregamento de dados assíncronos com `useEffect` e cleanup
5. **Roteamento** — navegação entre páginas com React Router DOM, parâmetros de URL e navegação programática
6. **CSS-in-JS** — estilização com Styled Components, theming com `ThemeProvider` e estilos globais
7. **Consumo de API** — requisições HTTP com Axios, tratamento de dados e estados de carregamento
8. **Boas práticas** — validação de props, organização de pastas, separação de responsabilidades e código modular

---

## Conceitos React Praticados

### Hooks

| Hook          | Conceito Aprendido                                                                                             | Arquivo Principal                      |
| ------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `useState`    | Gerenciamento de estado local — controle de input, filtros, dados carregados e estado de carregamento          | `src/pages/RepositoriesPage/index.jsx` |
| `useEffect`   | Efeitos colaterais — carregamento de dados ao montar o componente, fetch assíncrono com `Promise.all`          | `src/pages/RepositoriesPage/index.jsx` |
| `useMemo`     | Memoização — cálculo de total de páginas e dados paginados para evitar recálculos desnecessários a cada render | `src/hooks/usePagination.js`           |
| `useCallback` | Estabilização de funções — funções de navegação entre páginas mantêm referência estável para evitar re-renders | `src/hooks/usePagination.js`           |
| `useParams`   | Acesso a parâmetros da URL — extração do `login` do usuário a partir da rota dinâmica                          | `src/pages/RepositoriesPage/index.jsx` |
| `useNavigate` | Navegação programática — redirecionamento ao pressionar Enter ou clicar no botão de busca                      | `src/pages/MainPage/index.jsx`         |

### Custom Hook

O projeto inclui a criação de um **custom hook** (`usePagination`) para extrair e reutilizar a lógica de paginação. Isso demonstra:

- Encapsulamento de lógica complexa em uma função reutilizável
- Uso combinado de `useState`, `useEffect`, `useMemo` e `useCallback` dentro de um hook
- Parâmetros de entrada e retorno desestruturado
- Reset automático de estado via `resetDependency`

```javascript
// Exemplo simplificado do custom hook
export function usePagination({ data, itemsPerPage, resetDependency }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reseta ao mudar o filtro
  }, [resetDependency]);

  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length, itemsPerPage],
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  return { currentPage, totalPages, paginatedData, goToPrevious, goToNext };
}
```

### Padrões de Arquitetura

| Padrão                       | Aplicação no Projeto                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| **Component Composition**    | `RepositoriesPage` compõe `Profile`, `Filter` e `Repositories` como componentes filhos             |
| **Lifting State Up**         | O estado `currentLanguage` é mantido no pai (`RepositoriesPage`) e passado via props aos filhos    |
| **Container/Presentational** | Páginas (containers) gerenciam dados e lógica; componentes internos (presentational) renderizam UI |
| **Single Responsibility**    | Cada componente cuida de uma única responsabilidade (perfil, filtro, lista, paginação)             |
| **Reusable Logic (Hooks)**   | Lógica de paginação extraída para `usePagination` e reutilizada no componente `Pagination`         |

### Fluxo de Dados

```
MainPage
  └── navigate(/:login/repositories)  ──→  URL muda

RepositoriesPage
  ├── useParams() extrai "login"
  ├── useEffect() carrega dados via API
  │     ├── getUser(login)    → setState(user)
  │     └── getRepos(login)   → setState(repositories)
  │                             → setState(languages)
  │
  ├── Profile          ← props: { user }
  ├── Filter           ← props: { languages, currentLanguage, onClick }
  │                       onClick atualiza state no pai (lifting state up)
  └── Repositories     ← props: { repositories, currentLanguage }
        ├── Filtra por linguagem (filter)
        └── usePagination() pagina os dados
              └── Pagination ← props: { currentPage, totalPages, onPrevious, onNext }
```

---

## Funcionalidades do Projeto

- **Busca por usuário** — digite o login de um usuário do GitHub e pressione **Enter** ou clique no botão de busca
- **Perfil do usuário** — exibe avatar, nome, login, seguidores, empresa, localização e blog
- **Lista de repositórios** — grid responsivo com cards contendo nome, descrição, linguagem e link
- **Filtro por linguagem** — sidebar com botões para filtrar repositórios por linguagem de programação
- **Paginação** — navegação entre páginas com 9 itens por página, resetando ao mudar o filtro
- **Tema dark customizado** — paleta de cores escura inspirada no GitHub com `ThemeProvider`

---

## Demonstração Visual

```
┌─────────────────────────────────────────────────────────┐
│                    Página Inicial                        │
│                                                         │
│                   🔍 API Github                         │
│          Explore perfis e repositórios do GitHub         │
│                                                         │
│            ┌──────────────────────┬─────┐               │
│            │ Digite o login...    │  🔎 │               │
│            └──────────────────────┴─────┘               │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────────────────┐
│      Sidebar         │         Repositórios             │
│  ┌────────────────┐  │  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │    Avatar      │  │  │ Repo │ │ Repo │ │ Repo │    │
│  │  Nome          │  │  └──────┘ └──────┘ └──────┘    │
│  │  @login        │  │  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │  👥 150        │  │  │ Repo │ │ Repo │ │ Repo │    │
│  │  🏢 Empresa    │  │  └──────┘ └──────┘ └──────┘    │
│  │  📍 Local      │  │  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │  🔗 Blog       │  │  │ Repo │ │ Repo │ │ Repo │    │
│  └────────────────┘  │  └──────┘ └──────┘ └──────┘    │
│                      │                                  │
│  Filtro:             │        < 1 2 3 ... >             │
│  [JavaScript] (12)   │                                  │
│  [Python] (5)        │                                  │
│  [HTML] (3)          │                                  │
└──────────────────────┴──────────────────────────────────┘
```

---

## Estrutura do Projeto

```
api-github-dev/
├── src/
│   ├── components/
│   │   └── Pagination/       # Componente reutilizável de paginação
│   │       ├── index.jsx
│   │       └── styles.js
│   ├── hooks/
│   │   └── usePagination.js  # Custom hook de paginação ← ESTUDO DE HOOKS
│   ├── pages/
│   │   ├── MainPage/         # Página inicial com formulário de busca
│   │   │   ├── index.jsx     # ← useState, useNavigate
│   │   │   └── styles.js
│   │   └── RepositoriesPage/ # Página principal de dados
│   │       ├── index.jsx     # ← useEffect, useParams, lifting state up
│   │       ├── styles.js
│   │       ├── Profile/      # Card do perfil ← componentes presentacionais
│   │       ├── Filter/       # Filtro por linguagem ← props callbacks
│   │       └── Repositories/ # Grid com paginação ← useMemo, filter
│   │           └── Repository/ # Card individual de repositório
│   ├── services/
│   │   └── api.js            # Configuração do Axios ← consumo de API
│   ├── styles/
│   │   ├── Theme.jsx         # ThemeProvider ← Context API do styled-components
│   │   ├── global.js         # createGlobalStyle ← estilos globais
│   │   └── langConfigColors.js # Utilitário puro (sem React)
│   ├── App.jsx               # Raiz: BrowserRouter + ThemeProvider + GlobalStyle
│   ├── main.jsx              # Entry point: ReactDOM.createRoot
│   └── routes.jsx            # Definição de rotas ← React Router
├── .env                      # Variáveis de ambiente (VITE_API_BASE_URL)
├── routes.json               # Rotas do JSON Server
├── package.json
└── vite.config.js
```

---

## Mapa de Conceitos por Arquivo

| Arquivo                                             | Conceitos React / Boas Práticas                                              |
| --------------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/main.jsx`                                      | Entry point, `createRoot` (React 18+ API)                                    |
| `src/App.jsx`                                       | Composição de providers (`BrowserRouter`, `ThemeProvider`, `GlobalStyle`)    |
| `src/routes.jsx`                                    | `Routes` e `Route`, rotas aninhadas, element prop                            |
| `src/pages/MainPage/index.jsx`                      | `useState` (input controlado), `useNavigate`, `onKeyDown`, event handling    |
| `src/pages/RepositoriesPage/index.jsx`              | `useEffect` (fetch assíncrono), `useParams`, `Promise.all`, lifting state up |
| `src/pages/RepositoriesPage/Profile/index.jsx`      | Componente presentacional, recebimento de props                              |
| `src/pages/RepositoriesPage/Filter/index.jsx`       | Props callback (`onClick`), renderização condicional                         |
| `src/pages/RepositoriesPage/Repositories/index.jsx` | `useMemo` implícito via filter, composição de componentes                    |
| `src/hooks/usePagination.js`                        | Custom hook, `useState`, `useEffect`, `useMemo`, `useCallback`               |
| `src/components/Pagination/index.jsx`               | Componente reutilizável, props de callback                                   |
| `src/services/api.js`                               | Separação de camadas, `axios.create`, variáveis de ambiente                  |
| `src/styles/Theme.jsx`                              | `ThemeProvider`, objeto de tema, prop-types                                  |
| `src/styles/global.js`                              | `createGlobalStyle`, acesso ao tema via props                                |
| `src/styles/langConfigColors.js`                    | Lógica pura (função utilitária sem dependência do React)                     |

---

## Tecnologias Utilizadas

### Core

| Tecnologia           | Versão | Propósito                                |
| -------------------- | ------ | ---------------------------------------- |
| **React**            | 19     | Biblioteca para construção de interfaces |
| **React DOM**        | 19     | Renderização de componentes React no DOM |
| **React Router DOM** | 7      | Roteamento e navegação entre páginas     |

### Estilização

| Tecnologia            | Versão | Propósito                                     |
| --------------------- | ------ | --------------------------------------------- |
| **Styled Components** | 6      | CSS-in-JS com escopo por componente e theming |
| **styled-normalize**  | 8      | Normalização cross-browser de estilos         |

### Infraestrutura

| Tecnologia      | Versão | Propósito                                    |
| --------------- | ------ | -------------------------------------------- |
| **Vite**        | 8      | Build tool com HMR e otimizações de produção |
| **Axios**       | 1      | Cliente HTTP para requisições à API          |
| **JSON Server** | 0.17   | Mock de API REST para desenvolvimento        |

### Qualidade de Código

| Tecnologia      | Versão | Propósito                                         |
| --------------- | ------ | ------------------------------------------------- |
| **ESLint**      | 10     | Análise estática e detecção de erros              |
| **Prettier**    | 3      | Formatação consistente do código                  |
| **prop-types**  | 15     | Validação de tipos das props em tempo de execução |
| **React Icons** | 5      | Biblioteca de ícones (Material Design icons)      |

---

## Pré-requisitos e Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (vem junto com o Node.js)

### Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/api-github-dev.git
cd api-github-dev

# 2. Instale as dependências
npm install

# 3. Inicie o JSON Server (mock da API) em um terminal
npm run json-server

# 4. Em outro terminal, inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em **http://localhost:5173**.

> **Importante:** O JSON Server deve estar rodando para que as requisições de dados funcionem. Certifique-se de criar o arquivo `db.json` na raiz do projeto com os dados mock antes de iniciar o servidor.

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto para configurar a URL base da API. Você pode usar tanto o JSON Server local quanto a API oficial do GitHub:

### Opção 1 — JSON Server (mock local)

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Opção 2 — API oficial do GitHub

```env
VITE_API_BASE_URL=https://api.github.com
```

| Variável            | Descrição                       | Padrão                  |
| ------------------- | ------------------------------- | ----------------------- |
| `VITE_API_BASE_URL` | URL base para requisições à API | `http://localhost:5000` |

> **Nota:** O arquivo `.env` está no `.gitignore` para evitar que dados sensíveis ou configurações locais sejam versionados.

---

## Scripts Disponíveis

| Comando               | Descrição                                   |
| --------------------- | ------------------------------------------- |
| `npm run dev`         | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build`       | Gera a build de produção em `dist/`         |
| `npm run preview`     | Serve a build de produção localmente        |
| `npm run lint`        | Executa ESLint nos arquivos `.js` e `.jsx`  |
| `npm run lint:fix`    | Corrige automaticamente problemas de lint   |
| `npm run format`      | Formata o código com Prettier               |
| `npm run json-server` | Inicia o servidor JSON mock na porta 5000   |

---

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
