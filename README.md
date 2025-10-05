# TO-DO App

Um gerenciador de tarefas simples e intuitivo desenvolvido com React. Este projeto permite criar, editar, visualizar, completar e deletar tarefas de forma eficiente.

## 📋 Sobre o Projeto

Este é um aplicativo de gerenciamento de tarefas (To-Do List) que permite aos usuários organizar suas atividades diárias. O projeto utiliza tecnologias modernas do ecossistema React e foi desenvolvido com foco em qualidade de código, testes e boas práticas.

## ✨ Funcionalidades

- ✅ Criar novas tarefas
- ✏️ Editar tarefas existentes
- 👁️ Visualizar detalhes das tarefas
- ✔️ Marcar tarefas como completas
- 🗑️ Deletar tarefas
- 📱 Interface responsiva e moderna

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **Material-UI (MUI)** - Componentes de interface
- **React Router DOM** - Roteamento
- **React Hook Form + Zod** - Gerenciamento e validação de formulários
- **TanStack Query (React Query)** - Gerenciamento de estado assíncrono
- **Mirage JS** - Mock de API para desenvolvimento
- **Vitest** - Framework de testes
- **Testing Library** - Testes de componentes React

## 📦 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/dougvil/teste-tecnico-react-unidocs.git
cd ambev-tech
```

2. Instale as dependências:

```bash
npm install
```

## 🎯 Como Usar

### Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build de Produção

Para criar uma build otimizada:

```bash
npm run build
```

### Preview da Build

Para visualizar a build de produção localmente:

```bash
npm run preview
```

### Deploy no GitHub Pages

O projeto está configurado para deploy automático no GitHub Pages. Toda vez que houver um push na branch `main`, uma GitHub Action será executada automaticamente para fazer o build e deploy da aplicação.

A aplicação estará disponível em: https://dougvil.github.io/teste-tecnico-react-ambev-tech/

## 🧪 Testes

### Executar todos os testes

```bash
npm test
```

### Executar testes com interface visual

```bash
npm run test:ui
```

### Gerar relatório de cobertura

```bash
npm run test:coverage
```

## 📁 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
├── hooks/            # Custom hooks
├── pages/            # Páginas da aplicação
├── providers/        # Providers (Query, Router, Theme)
├── services/         # Serviços e chamadas API
├── theme/            # Configurações de tema (cores, tipografia)
├── mocks/            # Mock server (Mirage JS)
└── test/             # Utilitários de teste
```

## 🎨 Padrões de Código

O projeto utiliza:

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **TypeScript** - Tipagem estática

Para verificar o código:

```bash
npm run lint
```

## 📝 Licença

Este projeto foi desenvolvido como teste técnico.

## 👨‍💻 Autor

Desenvolvido por Douglas Viliano

---
