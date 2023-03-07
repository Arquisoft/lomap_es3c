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
import ImageComponent from './Image';
import Swal from 'sweetalert2';
import Alert from '@mui/material/Alert';

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
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending Profile Function',
    })
  };

  const miCuenta = () => {
    //TODO funcionalidad relativa a la cuenta del usuario
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending Account Function',
    })
  };

  const cerrarSesion = () => {
    //TODO funcionalidad relativa a la sesión del usuario
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending Session Function',
    })
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ImageComponent src="/barLogo.png" alt="Mi imagen" />
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            > </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Account Propietary" src="/static/images/avatar/2.jpg" />
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