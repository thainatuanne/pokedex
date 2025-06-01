import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    List,
    ListItem,
} from '@mui/material'

interface Ability {
    ability: { name: string }
}

interface Stat {
    stat: { name: string }
    base_stat: number
}

interface Pokemon {
    id: number
    name: string
    height: number
    sprites: { front_default: string }
    abilities: Ability[]
    stats: Stat[]
}

export function TelaDetalhes() {
    const { name } = useParams()
    const navigate = useNavigate()
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [erro, setErro] = useState(false)

    useEffect(() => {
        if (!name) return
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => setPokemon(res.data))
            .catch(() => setErro(true))
    }, [name])

    if (erro) {
        return (
            <Typography textAlign="center" mt={4} color="error">
                Pokémon não encontrado!
            </Typography>
        )
    }

    if (!pokemon) {
        return (
            <Typography textAlign="center" mt={4}>
                Carregando detalhes...
            </Typography>
        )
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                background: 'linear-gradient(to bottom, #ffffff, #cc0000)',
                padding: 3,
            }}
        >
            <Card
                sx={{
                    maxWidth: 500,
                    width: '100%',
                    borderRadius: 4,
                    border: '4px solid #000',
                    boxShadow: 'inset 0 0 4px #000, 0 6px 10px rgba(0,0,0,0.4)',
                    backgroundColor: '#fff',
                }}
            >
                <Box sx={{ backgroundColor: '#000', width: '100%', height: '10px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} />

                <CardMedia
                    component="img"
                    image={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    sx={{
                        backgroundColor: '#ffcb05',
                        padding: '10px',
                        height: '200px',
                        objectFit: 'contain',
                    }}
                />

                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#cc0000' }}>
                        {pokemon.name.toUpperCase()}
                    </Typography>
                    <Typography>ID: {pokemon.id}</Typography>
                    <Typography>Altura: {pokemon.height}m</Typography>

                    <Typography variant="h6" mt={2} sx={{ fontWeight: 'bold' }}>
                        Habilidades
                    </Typography>
                    <List dense>
                        {pokemon.abilities.map((a, i) => (
                            <ListItem key={i} sx={{ justifyContent: 'center' }}>
                                {a.ability.name}
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant="h6" mt={2} sx={{ fontWeight: 'bold' }}>
                        Atributos
                    </Typography>
                    <List dense>
                        {pokemon.stats.map((s, i) => (
                            <ListItem key={i} sx={{ justifyContent: 'center' }}>
                                {s.stat.name}: {s.base_stat}
                            </ListItem>
                        ))}
                    </List>

                    <Button
                        onClick={() => navigate(-1)}
                        sx={{
                            marginTop: 2,
                            backgroundColor: '#000',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#333',
                            },
                        }}
                    >
                        Voltar
                    </Button>
                </CardContent>
            </Card>
        </Box>
    )
}
