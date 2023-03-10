import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ImageComponent from '../Image';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';

const settings = ['Mi Perfil', 'Mi Cuenta', 'Cerrar Sesión'];

function TopBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const miPerfil = () => {
    //TODO funcionalidad relativa al perfil del usuario
    handleCloseUserMenu();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending Profile Function',
    })
  };

  const miCuenta = () => {
    //TODO funcionalidad relativa a la cuenta del usuario
    handleCloseUserMenu();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending Account Function',
    })
  };

  const cerrarSesion = () => {
    //TODO funcionalidad relativa a la sesión del usuario
    handleCloseUserMenu();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending Session Function',
    })
  };

  const nuevoMapa = () => {
    //TODO funcionalidad relativa a la creación de un mapa
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending New Map Function',
    })
  };

  const añadirAmigo = () => {
    //TODO funcionalidad relativa a la adición de un amigo
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending New Friend Function',
    })
  };

  return (
    <AppBar position="static" sx={{borderBottom: "solid black 0.25em", width: "100%"}}>
      <Container sx={{marginLeft: "1em", width: "100%", minWidth: "100%"}}>
        <Toolbar disableGutters sx={{width: "100%"}}>
          <a href="/home">
            <ImageComponent src="/barLogo.png" alt="LoMap es3c" />
          </a>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:"right", marginRight: "5em" }}>

              <Button
                key={"Nuevo Mapa"}
                onClick={nuevoMapa}
                sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em', marginRight: "3em" }}
              >
                {<strong>Nuevo Mapa</strong>}
              </Button>
              <Button
                key={"Añadir Amigo"}
                onClick={añadirAmigo}
                sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em' }}
              >
                {<strong>Añadir Amigo</strong>}
              </Button>
              
          </Box>
          
          <Box sx={{ flexGrow: 0, marginRight: "2em" }}>
            
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Account Propietary" src="userImageDefault.png" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={settings[0]} onClick={miPerfil}>
                <Typography textAlign="center">{settings[0]}</Typography>
              </MenuItem>
              <MenuItem key={settings[1]} onClick={miCuenta}>
                <Typography textAlign="center">{settings[1]}</Typography>
              </MenuItem>
              <hr/>
              <MenuItem key={settings[2]} onClick={cerrarSesion}>
                <Typography textAlign="center">{settings[2]}</Typography>
              </MenuItem>
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopBar;