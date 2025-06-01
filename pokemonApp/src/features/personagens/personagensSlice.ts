import { createSlice } from '@reduxjs/toolkit'
import { carregarPersonagens } from './carregarPersonagens'

interface Habilidade {
    ability: { name: string }
}

interface Atributo {
    stat: { name: string }
    base_stat: number
}

export interface Personagem {
    id: number
    name: string
    height: number
    image: string
    abilities: Habilidade[]
    stats: Atributo[]
}

interface PersonagemState {
    lista: Personagem[]
    registro: Personagem[]
    paginaAtual: number
    carregando: boolean
    erro: string | null
}

const initialState: PersonagemState = {
    lista: [],
    registro: JSON.parse(localStorage.getItem('registro') || '[]'),
    paginaAtual: 0,
    carregando: false,
    erro: null,
}

const personagensSlice = createSlice({
    name: 'personagens',
    initialState,
    reducers: {
        adicionarAoRegistro(state, action) {
            const existe = state.registro.some(p => p.id === action.payload.id)
            if (!existe) {
                state.registro.push(action.payload)
                localStorage.setItem('registro', JSON.stringify(state.registro))
            }
        },
        removerDoRegistro(state, action) {
            state.registro = state.registro.filter(p => p.id !== action.payload.id)
            localStorage.setItem('registro', JSON.stringify(state.registro))
        },
        definirPaginaAtual(state, action) {
            state.paginaAtual = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(carregarPersonagens.pending, state => {
                state.carregando = true
            })
            .addCase(carregarPersonagens.fulfilled, (state, action) => {
                state.carregando = false
                state.lista = action.payload
            })
            .addCase(carregarPersonagens.rejected, (state, action) => {
                state.carregando = false
                state.erro = action.error.message || 'Erro ao buscar personagens'
            })
    },
})

export const {
    adicionarAoRegistro,
    removerDoRegistro,
    definirPaginaAtual,
} = personagensSlice.actions

export default personagensSlice.reducer
