import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/appStore'
import { carregarPersonagens } from '../features/personagens/carregarPersonagens'
import { definirPaginaAtual } from '../features/personagens/personagensSlice'
import { CardPersonagem } from '../components/CardPersonagem'
import { RegistroFavoritos } from '../components/RegistroFavoritos'
import {
    Box,
    Typography,
    Button,
    Container,
} from '@mui/material'

export function TelaInicial() {
    const dispatch = useDispatch<AppDispatch>()
    const { lista, carregando, paginaAtual } = useSelector((state: RootState) => state.personagens)

    useEffect(() => {
        dispatch(carregarPersonagens(paginaAtual))
    }, [dispatch, paginaAtual])

    const proximaPagina = () => {
        dispatch(definirPaginaAtual(paginaAtual + 10))
    }

    const paginaAnterior = () => {
        if (paginaAtual > 0) {
            dispatch(definirPaginaAtual(paginaAtual - 10))
        }
    }

    return (
        <Box
            sx={{
                background: 'linear-gradient(180deg, #ffffff 0%, #cc0000 100%)',
                minHeight: '100vh',
                py: 4,
                px: 2,
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{
                        fontFamily: '"Press Start 2P", monospace',
                        fontSize: '1.5rem',
                        color: '#000',
                        textShadow: '2px 2px #ffcb05',
                        mb: 4,
                    }}
                >
                    Pokedex - Pokemons
                </Typography>

                <Box display="flex" justifyContent="center" gap={2} mt={2} mb={4}>
                    <Button
                        variant="contained"
                        onClick={paginaAnterior}
                        disabled={paginaAtual === 0}
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#333' },
                        }}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="contained"
                        onClick={proximaPagina}
                        sx={{
                            backgroundColor: '#cc0000',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#a00000' },
                        }}
                    >
                        Próxima
                    </Button>
                </Box>

                {carregando ? (
                    <Typography align="center" sx={{ color: '#000', fontWeight: 'bold' }}>
                        Carregando personagens...
                    </Typography>
                ) : (
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        gap={3}
                    >
                        {lista.map((p) => (
                            <Box
                                key={p.id}
                                sx={{
                                    flex: '1 1 250px',
                                    maxWidth: '300px',
                                }}
                            >
                                <CardPersonagem personagem={p} />
                            </Box>
                        ))}
                    </Box>
                )}

                <Box mt={6}>
                    <RegistroFavoritos />
                </Box>
            </Container>
        </Box>
    )
}
