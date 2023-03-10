import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Swal from 'sweetalert2';

export const Forms = () => {
    const [carouselAutoplay, setCarouselAutoplay] = useState(5000);

    const handleFocus = () => { setCarouselAutoplay(999999999); }
    const handleBlur = () => { setCarouselAutoplay(5000); }

    const login = () => {
        // TODO funcionalidad de login
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Pending Login Function',
        })
    }

    const register = () => {
        // TODO funcionalidad de register
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Pending Register Function',
        })
    }

  return (
    <Box sx={{ width: "100%", height: "80vh", backgroundColor: 'rgba(25, 118, 210, 0.5)', paddingTop: "6.6vh" }}>
        <Carousel variant='dark' interval={carouselAutoplay}>
            <Carousel.Item>
                <Box sx={{ marginLeft: "25%", marginRight: "25%", height: "67vh", backgroundColor: 'rgba(25, 118, 210, 1)', border: "solid black 0.2em", 
                    paddingTop: "3em", display: "flex", flexDirection: "column" }}>

                    <Box sx={{ fontSize: "1.3em", color: "black" }}><strong> INICIAR SESIÓN </strong></Box>

                    <Box sx={{height: "7vh"}}></Box>

                    <Box sx={{marginLeft: "35%", marginRight: "35%", width: "30%"}}>
                        <TextField id="userLogin" label="Usuario" type="text" autoComplete="current-user" variant="filled" 
                            InputLabelProps={{ style: { color: 'black' }, focused: true}} onFocus={handleFocus} onBlur={handleBlur} />
                    </Box>
                    
                    <Box sx={{height: "5vh"}}></Box>
                    
                    <Box sx={{marginLeft: "35%", marginRight: "35%", width: "30%"}}>
                        <TextField id="passLogin" label="Contraseña" type="password" autoComplete="current-password" variant="filled" 
                            InputLabelProps={{ style: { color: 'black' }, focused: true}} onFocus={handleFocus} onBlur={handleBlur} />
                    </Box>

                    <Box sx={{height: "10vh"}}></Box>

                    <Box>
                        <Button variant="outlined" sx={{ color: "black", border: "solid black 0.1em" }} onClick={login}>
                            Entrar
                        </Button>
                    </Box>

                </Box>
            </Carousel.Item>

            <Carousel.Item>
                <Box sx={{ marginLeft: "25%", marginRight: "25%", height: "67vh", backgroundColor: 'rgba(25, 118, 210, 1)', border: "solid black 0.2em", 
                    paddingTop: "3em", display: "flex", flexDirection: "column"  }}>

                    <Box sx={{ fontSize: "1.3em", color: "black" }}><strong> REGISTRO </strong></Box>

                    <Box sx={{height: "5vh"}}></Box>

                    <Box sx={{marginLeft: "35%", marginRight: "35%", width: "30%"}}>
                        <TextField id="userRegister" label="Usuario" type="text" autoComplete="current-user" variant="filled" 
                            InputLabelProps={{ style: { color: 'black' }, focused: true}} onFocus={handleFocus} onBlur={handleBlur} />
                    </Box>
                    
                    <Box sx={{height: "3vh"}}></Box>
                    
                    <Box sx={{marginLeft: "35%", marginRight: "35%", width: "30%"}}>
                        <TextField id="passRegister" label="Contraseña" type="password" autoComplete="current-password" variant="filled" 
                            InputLabelProps={{ style: { color: 'black' }, focused: true}} onFocus={handleFocus} onBlur={handleBlur} />
                    </Box>

                    <Box sx={{height: "3vh"}}></Box>
                    
                    <Box sx={{marginLeft: "35%", marginRight: "35%", width: "30%"}}>
                        <TextField id="emailRegister" label="Email" type="email" autoComplete="current-email" variant="filled" 
                            InputLabelProps={{ style: { color: 'black' }, focused: true}} onFocus={handleFocus} onBlur={handleBlur} />
                    </Box>

                    <Box sx={{height: "5vh"}}></Box>

                    <Box>
                        <Button variant="outlined" sx={{ color: "black", border: "solid black 0.1em" }} onClick={register}>
                            Registrarme
                        </Button>
                    </Box>

                </Box>
            </Carousel.Item>
        </Carousel>
    </Box>
  )
}
