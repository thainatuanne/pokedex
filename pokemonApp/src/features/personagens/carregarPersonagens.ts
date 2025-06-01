import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { Personagem } from './personagensSlice'

export const carregarPersonagens = createAsyncThunk(
    'personagens/carregar',
    async (paginaAtual: number = 0): Promise<Personagem[]> => {
        const limite = 10
        const offset = paginaAtual

        const resposta = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pokemon`, {
            params: { offset, limit: limite },
        })

        const resultados = await Promise.all(
            resposta.data.results.map(async (p: { url: string }) => {
                const detalhes = await axios.get(p.url)
                return {
                    id: detalhes.data.id,
                    name: detalhes.data.name,
                    height: detalhes.data.height,
                    image: detalhes.data.sprites.front_default,
                    abilities: detalhes.data.abilities,
                    stats: detalhes.data.stats,
                }
            })
        )

        return resultados
    }
)
