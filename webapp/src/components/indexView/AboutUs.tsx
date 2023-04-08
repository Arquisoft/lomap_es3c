import { Box, Avatar, Typography } from '@mui/material';

export const AboutUs = () => {
    return (
        <Box sx={{ 
            marginLeft: "20%", marginRight: "20%", height: "67vh", backgroundColor: 'rgba(25, 118, 210, 1)', border: "solid black 0.2em",
            paddingTop: "1.3em", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }} >
            <Typography variant="h4" sx={{ mb: 2, color: "white", fontWeight: "bold", textShadow: "2px 2px black" }}>Sobre el proyecto</Typography>
            <Typography variant="body1" sx={{ mb: 4, marginBottom: "0.25em" }}>La empresa HappySw se ha propuesto desarrollar un sistema de mapas personalizados. </Typography>
            <Typography variant="body1" sx={{ mb: 4, marginBottom: "0.25em" }}>La entidad solicitante ha sido el ayuntamiento de Bruselas.  </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>El equipo de desarrollo está constituido por:  </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar alt="Participante 1" src="/uo282294.jpg" sx={{ width: 80, height: 80, mb: 1 }} />
                    <Typography variant="subtitle1">Jorge Casatejada</Typography>
                    <Typography variant="body2">UO282294</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar alt="Participante 2" src="/uo282936.jpg" sx={{ width: 80, height: 80, mb: 1 }} />
                    <Typography variant="subtitle1">Alex Rodríguez</Typography>
                    <Typography variant="body2">UO282936</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar alt="Participante 3" src="/uo282162.jpg" sx={{ width: 80, height: 80, mb: 1 }} />
                    <Typography variant="subtitle1">Israel Solís</Typography>
                    <Typography variant="body2">UO282162</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar alt="Participante 4" src="/uo282867.jpg" sx={{ width: 80, height: 80, mb: 1 }} />
                    <Typography variant="subtitle1">Enrique Hilanderas</Typography>
                    <Typography variant="body2">UO282867</Typography>
                </Box>
            </Box>
            <Typography variant="body2" sx={{marginTop: "1em"}}>Proyecto realizado para la asignatura de Arquitectura del Software, Universidad de Oviedo - Curso 22/23</Typography>

            <Box sx={{ height: "3vh" }}></Box>
        </Box>
    );
};