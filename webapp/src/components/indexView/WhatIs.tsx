import { Box, Avatar, Typography } from '@mui/material'
import { useState } from 'react'
import ImageComponent from '../Image';

export const WhatIs = () => {
    return (
        <Box sx={{ 
            marginLeft: "25%", marginRight: "25%", height: "67vh", backgroundColor: 'rgba(25, 118, 210, 1)', border: "solid black 0.2em",
            paddingTop: "1.3em", display: 'flex', flexDirection: 'column', alignItems: 'center'
        }} >
            <Typography variant="h4" sx={{ mb: 2, color: "white", fontWeight: "bold", textShadow: "2px 2px black" }}>¿Qué es LoMap?</Typography>
            <Typography variant="body1" sx={{ mb: 4 , marginBottom: "0.25em" }}><strong>LoMap</strong> es una aplicación de mapas personalizados.</Typography>
            <Typography variant="body1" sx={{ mb: 4, marginLeft: "1em", marginRight: "1em" , marginBottom: "0.25em" }}>En <strong>LoMap</strong> puedes añadir tus lugares favoritos, para que puedas consultarlos siempre que quieras. De esta manera, tendrás tus rincones más especiales, a un simple click. </Typography>
            <img width="367px" height="161px" src="/queEsLoMap.png" alt="LoMap es3c" />
            <Typography variant="body1" sx={{ mb: 4, marginLeft: "1em", marginRight: "1em", marginTop: "0.75em" }}> <i>"Donde fuiste tan feliz, siempre regresarás"</i> </Typography>
            <Box sx={{ height: "3vh" }}></Box>
        </Box>
    );
};