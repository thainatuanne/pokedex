# 🧾 Pokedex - Pokemons

Aplicação desenvolvida como desafio final do módulo **React III**. Aqui você pode visualizar uma lista de Pokémons consumida diretamente da [PokéAPI](https://pokeapi.co/), ver detalhes, adicionar aos favoritos (Pokedex) e até ouvir uma trilha sonora ao interagir!

## 💡 Funcionalidades

- ✅ Listagem paginada dos Pokémons
- ✅ Visualização dos detalhes de cada Pokémon
- ✅ Registro de favoritos (sua própria Pokedex)
- ✅ Remoção de Pokémons dos favoritos
- ✅ Som de interação ao adicionar
- ✅ Estilização personalizada com cores clássicas da franquia (vermelho, branco, amarelo e preto)
- ✅ Layout responsivo com Material UI

## 🚀 Tecnologias Utilizadas

- React
- Redux Toolkit
- Redux Thunk (AsyncThunk)
- React Router DOM
- TypeScript
- MUI (Material UI)
- PokéAPI
- HTML5 + CSS3

## 🎨 Layout e Design

- Fonte pixelada e destaque no estilo **Pokedex clássica**
- Cartões com bordas arredondadas, fundo amarelo e botões temáticos
- Registro de favoritos com destaque
- Gradiente vermelho no fundo simulando a interface da Pokédex

## 🔊 Extras

- Som de abertura da série ao adicionar um Pokémon à Pokedex (limite de 10 segundos)
- Armazenamento local dos favoritos com `localStorage`

## 📁 Estrutura de Pastas

```
pokemonApp/
├── public/
│   └── audio/
│       └── aberturaPokemon.mp3
│
├── src/
│   ├── app/
│   │   └── appStore.ts
│   │
│   ├── components/
│   │   ├── CardPersonagem.tsx
│   │   └── RegistroFavoritos.tsx
│   │
│   ├── features/
│   │   └── personagens/
│   │       ├── personagensSlice.ts
│   │       └── carregarPersonagens.ts
│   │
│   ├── pages/
│   │   ├── TelaInicial.tsx
│   │   └── TelaDetalhes.tsx
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
```
---


## ⚙️ Como rodar o projeto

```bash
# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
