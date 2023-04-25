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
import { Button, Fade } from '@mui/material';
import { Session, logout } from "@inrupt/solid-client-authn-browser";
import { useNavigate } from 'react-router-dom';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useSession } from '@inrupt/solid-ui-react';
import createMapWindow from './CreateMap';
import { deleteSolicitude, deleteUser, existsSolicitude, existsUser, getSolicitudes, registerSolicitude } from '../../api/api';
import MapFilter, { MapFilterInfo } from '../map/filter/MapFilter';
import { addToKnowInPod, getFriendsFromPod, getFriendsNamesFromPod, grantReadAccessToFriend } from '../Amigos/podsFriends';
import { getFile, overwriteFile } from '@inrupt/solid-client';

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
    handleCloseUserMenu();
    mostrarVentanaPerfil();
  };

  const mostrarVentanaPerfil = async () => {
    // Obtener el nombre del usuario desde la sesión
    const user = session.info.webId;
    let nombreUsuario = "";
    let biografiaUsuario;
    if (user) {
      nombreUsuario = user.split('//')[1].split('.')[0];
      biografiaUsuario = await getBioFromPod(session);
    }

    // Crear el contenido de la ventana modal
    const html = `
      <div>
        <label for="name">Nombre</label>
        <input id="name" class="swal2-input" value="${nombreUsuario}" style="width: 65%;" readonly>
        <br/>
        <h5>Biografía:</h5>
        <textarea id="biografia" rows="5" cols="40" style="resize: none; text-align: center;">${biografiaUsuario}</textarea>
      </div>
    `;

    // Mostrar la ventana
    Swal.fire({
      title: 'Mi perfil',
      html: html,
      showCancelButton: true,
      confirmButtonText: 'Guardar biografía',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const bio = (Swal.getPopup()?.querySelector('#biografia') as HTMLInputElement).value;
        addBioToPod(session, bio);
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  };

  async function addBioToPod(session: Session, bio: string): Promise<void> {
    // Obtener la URL del archivo de biografía en la carpeta pública
    const bioFileUrl = `${session.info.webId?.split('/profile')[0]}/public/bio.txt`;

    // Crear un objeto Blob a partir del contenido de la biografía
    const blob = new Blob([bio], { type: "text/plain" });

    // Sobrescribir el archivo de biografía en la carpeta pública con el nuevo contenido
    await overwriteFile(bioFileUrl, blob, { fetch: session.fetch });

    console.log(`La biografía ha sido actualizada en la URL: ${bioFileUrl}`);
  }

  async function getBioFromPod(session: Session): Promise<string> {
    // Obtener la URL del archivo de biografía en la carpeta pública
    const bioFileUrl = `${session.info.webId?.split('/profile')[0]}/public/bio.txt`;

    try {
      // Obtener el contenido del archivo de biografía utilizando la función getFile
      const file = await getFile(bioFileUrl, { fetch: session.fetch });
      const content = await file.text();
      console.log(`La biografía recuperada del POD es: ${content}`);
      return content;
    } catch (e) {
      console.log(`No se ha encontrado un archivo de biografía en la URL: ${bioFileUrl}`);
      return "Aún no se ha creado una biografía.";
    }
  }

  const miCuenta = async () => {
    //TODO funcionalidad relativa a la cuenta del usuario
    handleCloseUserMenu();
    
    const webId = session.info.webId;
    const arrayWebId = [webId];
    const name = await getFriendsNamesFromPod(arrayWebId);

    Swal.fire({
      title: 'Mi Cuenta',
      html: `
            <label for="name">Nombre</label>
            <input id="name" class="swal2-input" value="${name}" style="width: 65%;" readonly>
            <br/>
            <label for="webId">Web ID</label>
            <input id="webId" class="swal2-input" value="${webId}" style="width: 65%;" readonly>
            `,
      showCancelButton: true,
      confirmButtonText: 'Desactivar cuenta',
      cancelButtonText: 'Atrás',
      showLoaderOnConfirm: true,
      width: '60%',
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed && webId) {
        Swal.fire('Cuenta desactivada', 'Podrá reactivarla la próxima vez que inicie sesión', 'success').then(() => {
          logout().then(() => {
            navigate(`/`);
            deleteUser(webId.split("/profile/")[0])
          });
        })
      }
    })
  };

  const cerrarSesion = async () => {
    //TODO funcionalidad relativa a la sesión del usuario
    handleCloseUserMenu();

    await logout();
    navigate(`/`);
  };

  const nuevoMapa = () => {
    setAnchorEl(null); // cierra el mini-menú
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
    setAnchorEl(null); // cierra el mini-menú
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

  const compartirMapa = () => {
    setAnchorEl(null); // cierra el mini-menú
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClickOptions = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseOptions = () => {
      setAnchorEl(null);
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
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickOptions}
              sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em', marginRight: "3em" }}
            >
              <strong>Opciones</strong>
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseOptions}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={nuevoMapa}>Nuevo Mapa</MenuItem>
              <MenuItem onClick={nuevoAmigo}>Nuevo Amigo</MenuItem>
              <hr />
              <MenuItem onClick={compartirMapa}>Compartir Mapa</MenuItem>
            </Menu>

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

