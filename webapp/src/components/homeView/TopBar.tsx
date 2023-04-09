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
import { logout } from "@inrupt/solid-client-authn-browser";
import { useNavigate } from 'react-router-dom';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useSession } from '@inrupt/solid-ui-react';
import createMapWindow from './CreateMap';
import { deleteSolicitude, existsSolicitude, existsUser, getSolicitudes, registerSolicitude } from '../../api/api';
import MapFilter, { MapFilterInfo } from '../map/filter/MapFilter';
import { addToKnowInPod, getFriendsFromPod } from '../Amigos/podsFriends';

const settings = ['Mi Perfil', 'Mi Cuenta', 'Cerrar Sesión'];

function TopBar(filterInfo: MapFilterInfo) {
  const { session } = useSession();

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

  const navigate = useNavigate();

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

  const cerrarSesion = async () => {
    //TODO funcionalidad relativa a la sesión del usuario
    handleCloseUserMenu();

    await logout();
    navigate(`/`);
    /* Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending Session Function',
    }) */
  };

  const nuevoMapa = () => {
    createMapWindow(session);
  };


  async function areFriends(userName: string): Promise<boolean> {
    const friends = await getFriendsFromPod(session);
    let isFriend = false;
    friends.forEach((friend) => {
      let f = friend.split("//")[1].split(".inrupt.net")[0];
      if (f == userName) {
        isFriend = true;
      }
    })
    return isFriend;
  }

  const nuevoAmigo = () => {
    Swal.fire({
      title: 'Introduzca el nombre del usuario',
      html: `
            <select id="provider" class="swal2-input">
              <option value="inrupt"> Inrupt </option >
              <option value="solidcommunity"> Solid Project </option >
              <option value="solidweb"> Solid Grassroots </option >
              <option value="datapod.igrant.io"> iGrant.io </option >
            </select>
            <input id="userName" class="swal2-input" placeholder="Nombre de usuario">
            `,
      showCancelButton: true,
      confirmButtonText: 'Enviar solicitud',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const receiverProvider = (Swal.getPopup()?.querySelector('#provider') as HTMLInputElement).value;
        const receiverName = (Swal.getPopup()?.querySelector('#userName') as HTMLInputElement).value;

        if (receiverName === "" || receiverProvider === "") {
          Swal.showValidationMessage(
            `ERROR: Usuario o proveedor vacío`
          )
        } else {
          existsUser(receiverName, receiverProvider).then((exists) => {
            if (exists) {
              const sender = session.info.webId;
              if (sender) {
                const senderName = sender.split('//')[1].split('.')[0];
                const senderProvider = sender.split('//')[1].split('.')[1];
                existsSolicitude(receiverName, receiverProvider, senderName, senderProvider).then(async (exists) => {
                  if (exists) {
                    Swal.fire({
                      icon: 'error',
                      text: "Ya existe una solicitud pendiente",
                      showConfirmButton: false,
                      timer: 2000
                    })
                  } else {
                    const isFriend = await areFriends(receiverName);
                    if (isFriend) {
                      Swal.fire({
                        icon: 'error',
                        text: "El usuario ya es tu amigo",
                        showConfirmButton: false,
                        timer: 2000
                      })
                    } else {
                      Swal.fire({
                        icon: 'success',
                        text: 'Solicitud enviada a ' + receiverName + " (" + receiverProvider + ")",
                        showConfirmButton: false,
                        timer: 2000
                      })

                      registerSolicitude(receiverName, receiverProvider, senderName, senderProvider);
                      addToKnowInPod(session, "https://" + receiverName + "." + receiverProvider + ".net/profile/card#me");
                    }
                  }
                });
              }
            } else {
              Swal.fire({
                icon: 'error',
                text: "El usuario introducido no existe",
                showConfirmButton: false,
                timer: 2000
              })
            }
          })
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  };

  const verSolicitudes = () => {
    if (session.info.isLoggedIn) {
      const userWebId = session.info.webId?.split('/profile')[0];
      const userName = userWebId?.split('//')[1].split('.')[0];
      const provider = userWebId?.split('//')[1].split('.')[1];

      if (userName != null && provider != null) {
        getSolicitudes(userName, provider).then((solicitudes) => {
          if (solicitudes.length == 0) {
            Swal.fire({
              icon: 'info',
              title: 'No tienes solicitudes de amistad',
              showConfirmButton: true,
              confirmButtonText: 'Aceptar'
            });
          } else {
            const options = solicitudes.map((s) => {
              return `<option value="${s.senderName + "-" + s.senderProvider}">${s.senderName + " (" + s.senderProvider + ")"}</option>`;
            });

            Swal.fire({
              title: 'Solicitudes de amistad',
              html: `
                  <select id="user" class="swal2-input">
                  ${options}
                  </select>
                  `,
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: 'Aceptar',
              denyButtonText: 'Rechazar',
            }).then((result) => {
              const user = (Swal.getPopup()?.querySelector('#user') as HTMLInputElement).value;

              if (result.isConfirmed) {
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario ' + user.split("-")[0] + ' aceptado',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  // TODO: MATERIALIZAR AMISTAD BIDIRECCIONALMENTE EN LOS PODS
                  //    Usuario 1 (el que recibe la solicitud): Nombre en la variable "userName" y proveedor en la variable "provider"
                  //    Usuario 2 (el que envía la solicitud): Nombre en user.split("-")[0] y proveedor en user.split("-")[1]

                  addToKnowInPod(session, "https://" + user.split("-")[0] + "." + user.split("-")[1] + ".net/profile/card#me");
                });
              } else if (result.isDenied) {
                Swal.fire({
                  icon: 'error',
                  title: 'Usuario ' + user.split("-")[0] + ' rechazado',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  deleteSolicitude(userName, provider, user.split("-")[0], user.split("-")[1]);
                });
              }
            })
          }

        })
      };
    }
  };

  return (
    <AppBar position="static" sx={{ borderBottom: "solid black 0.25em", width: "100%" }}>
      <Container sx={{ marginLeft: "1em", width: "100%", minWidth: "100%" }}>
        <Toolbar disableGutters sx={{ width: "100%" }}>
          <a href="/home">
            <ImageComponent src="/barLogo.png" alt="LoMap es3c" />
          </a>

          <MapFilter selectedCategories={filterInfo.selectedCategories} setSelectedCategories={filterInfo.setSelectedCategories}></MapFilter>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "right", marginRight: "5em" }}>

            <Button
              key={"Nuevo Mapa"}
              onClick={nuevoMapa}
              sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em', marginRight: "3em" }}
              focusRipple={false}
            >
              {<strong>Nuevo Mapa</strong>}
            </Button>
            <Button
              key={"Nuevo Amigo"}
              onClick={nuevoAmigo}
              sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em', marginRight: "3em" }}
              focusRipple={false}
            >
              {<strong>Nuevo Amigo</strong>}
            </Button>
            <Button
              key={"Solicitudes"}
              onClick={verSolicitudes}
              sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em' }}
              focusRipple={false}
            >
              <DraftsIcon fontSize="small" />
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
              <hr />
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

