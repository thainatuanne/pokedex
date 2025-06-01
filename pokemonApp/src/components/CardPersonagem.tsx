import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/appStore'
import {
    adicionarAoRegistro,
    removerDoRegistro,
} from '../features/personagens/personagensSlice'

interface Props {
    personagem: {
        id: number
        name: string
        image: string
    }
}

export function CardPersonagem({ personagem }: Props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isFavorito = useSelector((state: RootState) =>
        state.personagens.registro.some(p => p.id === personagem.id)
    )

    const handleClick = () => {
        if (isFavorito) {
            dispatch(removerDoRegistro(personagem))
        } else {
            dispatch(adicionarAoRegistro(personagem))

            const clickSound = new Audio('/audio/aberturaPokemon.mp3')
            clickSound.play()
            setTimeout(() => clickSound.pause(), 10000)
        }
    }

    return (
        <Card
            sx={{
                border: '4px solid #000',
                borderRadius: '16px',
                backgroundColor: '#fff',
                boxShadow: 'inset 0 0 4px #000, 0 4px 8px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#000',
                    width: '100%',
                    height: '10px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                }}
            />

            <CardMedia
                component="img"
                image={personagem.image}
                alt={personagem.name}
                sx={{
                    backgroundColor: '#ffcb05',
                    padding: '10px',
                    height: '150px',
                    objectFit: 'contain',
                }}
            />

            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: '#cc0000', fontWeight: 'bold' }}>
                    {personagem.name.toUpperCase()}
                </Typography>

                <Box display="flex" justifyContent="center" gap={1} mt={2}>
                    <Button
                        onClick={() => navigate(`/pokemon/${personagem.name}`)}
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            fontSize: '0.75rem',
                            '&:hover': { backgroundColor: '#333' },
                        }}
                    >
                        Ver Detalhes
                    </Button>

                    <Button
                        onClick={handleClick}
                        sx={{
                            backgroundColor: isFavorito ? '#555' : '#cc0000',
                            color: '#fff',
                            fontSize: '0.75rem',
                            '&:hover': {
                                backgroundColor: isFavorito ? '#333' : '#a00000',
                            },
                        }}
                    >
                        {isFavorito ? 'Remover' : 'Adicionar'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}
