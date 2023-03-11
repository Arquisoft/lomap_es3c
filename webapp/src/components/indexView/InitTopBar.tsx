import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ImageComponent from '../Image';
import Container from '@mui/material/Container';
import Swal from 'sweetalert2';

const goLogin = () => {
  //TODO redirigir a ventana de login
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Pending Login Redirection Function',
  })
};

const goRegister = () => {
  //TODO redirigir a ventana de registro
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Pending Register Redirection Function',
  })
};

export default function InitTopBar() {
  return (
    <AppBar position="static" sx={{borderBottom: "solid black 0.25em", width: "100%"}}>
      <Container sx={{marginLeft: "1em", width: "100%", minWidth: "100%"}}>
        <Toolbar disableGutters sx={{width: "100%"}}>
          <a href="/">
            <ImageComponent src="/barLogo.png" alt="LoMap es3c" />
          </a>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:"right", marginRight: "5em" }}>

            <Button 
              key={"LoginNav"}
              onClick={goLogin}
              sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em', marginRight: "3em" }}
            >
              {<strong>Inicio Sesión</strong>}
            </Button>

            <Button 
              key={"RegisterNav"}
              onClick={goRegister}
              sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em' }}
            >
              {<strong>Registro</strong>}
            </Button>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}