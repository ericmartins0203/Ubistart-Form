# Cadastro de CEP

Esta aplicação é uma página de cadastro de CEP, onde é possível criar, editar, deletar e filtrar registros de endereços.

## Deploy

[Veja o site online](https://ericmartins0203.github.io/Ubistart-Form/)

## Funcionalidades

- **Cadastro de CEP**: Adicione novos endereços preenchendo um formulário com nome, email e CEP.
- **Edição de CEP**: Edite os endereços cadastrados.
- **Deleção de CEP**: Exclua endereços cadastrados.
- **Filtragem de CEP**: Filtre os endereços cadastrados por qualquer campo.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápida para projetos front-end.
- **CSS Modules**: Escopo local para estilos CSS.

## Estrutura do Projeto

```markdown
src/
├── App.module.css
├── App.tsx
├── assets/
├── components/
│   ├── form/
│   │   ├── form.module.css
│   │   ├── index.tsx
│   │   └── validate.ts
│   ├── input/
│   │   ├── index.tsx
│   │   └── input.module.css
│   ├── list/
│   │   ├── index.tsx
│   │   └── list.module.css
│   └── modal/
│       ├── index.tsx
│       └── modal.module.css
├── index.css
├── interface/
│   └── index.ts
├── main.tsx
├── provider/
│   └── DataContext.tsx
├── utils/
└── vite-env.d.ts
```


## Como Executar

1. Clone o repositório:
   ```sh
   git clone https://github.com/ericmartins0203/Ubistart-Form
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Execute o projeto em modo de desenvolvimento:
   ```sh
   npm run dev
   ```
5. Abra o navegador e acesse:
   ```
   http://localhost:5173
   ```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run preview`: Visualiza a versão de produção.
- `npm run lint`: Executa o linter para verificar problemas no código.
