import { Box, Avatar, Typography } from '@mui/material'
import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { RegisterProvider } from './RegisterProvider'

interface Props {
    index: number;
    setIndex: (index: number) => void;
}

export const Forms = ({ index, setIndex }: Props) => {
    //Carousel
    const [carouselAutoplay, setCarouselAutoplay] = useState<number | null>(5000);
    const handleFocus = () => { setCarouselAutoplay(null); }
    const handleBlur = () => { setCarouselAutoplay(5000); }

    return (
        <Box sx={{ width: "100%", height: "80vh", backgroundColor: 'rgba(25, 118, 210, 0.5)', paddingTop: "6.6vh" }}>
            <Carousel variant='dark' activeIndex={index} onSelect={setIndex} interval={carouselAutoplay} >
                <Carousel.Item>
                    <RegisterProvider />
                </Carousel.Item>
                <Carousel.Item>
                    <Box sx={{ marginLeft: "10%", marginRight: "10%",display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 4, backgroundColor: 'rgba(25, 118, 210, 1)', border: "solid black 0.2em" }} onFocus={handleFocus} onBlur={handleBlur}>
                        <Typography variant="h4" sx={{ mb: 2, color: "white", fontWeight: "bold", textShadow: "2px 2px black" }}>Proyecto LOMAP_ES3C</Typography>
                        <Typography variant="body1" sx={{ mb: 4 }}>Aplicación de mapas personalizados sobre lugares y negocios locales de la ciudad de Bruselas </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar alt="Participante 1" src="/uo282294.jpg" sx={{ width: 80, height: 80, mb: 1 }} />
                                <Typography variant="subtitle1">Jorge Casatejada Santamarta</Typography>
                                <Typography variant="body2">UO282294</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar alt="Participante 2" src="/uo282936.jpg" sx={{ width: 80, height: 80, mb: 1 }} />
                                <Typography variant="subtitle1">Alex Rodríguez Valdés</Typography>
                                <Typography variant="body2">UO282936</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar alt="Participante 3" src="/uo282162.jpg" sx={{ width: 80, height: 80, mb: 1 }} />
                                <Typography variant="subtitle1">Israel Solís Iglesias</Typography>
                                <Typography variant="body2">UO282162</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar alt="Participante 4" src="/uo282867.jpg" sx={{ width: 80, height: 80, mb: 1 }} />
                                <Typography variant="subtitle1">Enrique Hilanderas Corbillón</Typography>
                                <Typography variant="body2">UO282867</Typography>
                            </Box>
                        </Box>
                        <Typography variant="body1" sx={{ mt: 4 }}>Información extra:</Typography>
                        <Typography variant="body2">Proyecto realizado para Arquitectura del Software, UniOvi</Typography>

                        <Box sx={{ height: "3vh" }}></Box>
                    </Box>
                </Carousel.Item>
            </Carousel>
        </Box>
    );
};