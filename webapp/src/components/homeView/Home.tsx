import '../../App.css';
import TopBar from './TopBar';
import LateralMenu from './LateralMenu';
import  { MarkerInfo } from '../map/Map';
import { Box, styled } from '@mui/material';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSession } from '@inrupt/solid-ui-react';
import { getDefaultSession, handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";
import { checkRegister, registerUser } from '../../api/api';
import Swal from 'sweetalert2';
import { getFriendsFromPod, getFriendsNamesFromPod } from '../../solid/podsFriends';
import MapView from '../map/Map';
import { loadFriendsHelper, showLoadingDialogHelper } from '../../helper/HomeHelper';

const IzqBox = styled(Box)({
  width: "80%",
})

const DerBox = styled(Box)({
  width: "20%",
  justifyContent: "right"
})

const SRoutes = styled(Routes)({
  width: "100%"
})

const Content = styled(Box)({
  display: "flex",
  flexDirection: "row"
})

//Manejar la sesion del proveedor
async function handleRedirectAfterIdentification() {
  await handleIncomingRedirect({restorePreviousSession: true});
  const session = getDefaultSession();
  if (session.info.isLoggedIn) {
    const userWebId = session.info.webId?.split('/profile')[0];
    const userName = userWebId?.split('//')[1].split('.')[0];
    const provider = userWebId?.split('//')[1].split('.')[1];

    if (userName && userWebId && provider) {
      checkRegister(userName, userWebId, provider).then((register) => {
        if(!register)
          registerUser(userName, userWebId, provider);
      })
    }
  }
}

export const Home = () => {

  const navigate = useNavigate();

  const {session} = useSession();

  handleRedirectAfterIdentification();

  const [markers, setMarkers] = useState<MarkerInfo[]>([]);

  const [selectedMap, setSelectedMap] = useState<string>();

  const [sites, setSites] = useState<string[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [editable, setEditable] = useState<boolean>(true);

  const [friendsURL, setFriendsURL] = useState<string[]>([]);
  const [friendsNames, setFriendsNames] = useState<string[]>([]);
  
  const [mySelectedMap, setMySelectedMap] = useState(-1);

  //const showLoadingDialog = async () => {
  //  setTimeout(() => showLoadingDialogHelper(session,navigate,loadFriends), 3500);
  //}

  const showLoadingDialog = async () => {
    let loadingTimer: NodeJS.Timeout;
    let sessionTimer: NodeJS.Timeout;
  
    Swal.fire({
      title: 'Cargando...',
      text: 'Espere un instante mientras preparamos todo',
      timer: 12000,
      allowOutsideClick: false,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        // Comprobar cada segundo si el objeto session tiene valor
        sessionTimer = setInterval(() => {
          if (session.info.isLoggedIn) {
            // Si el objeto session tiene valor, detener los temporizadores
            clearInterval(loadingTimer);
            clearInterval(sessionTimer);

            loadFriends().then(() => {
              setTimeout(() => {
                // Mostrar el diálogo de carga completa y ejecutar la función loadFriends
                Swal.close()
                Swal.fire({
                  title: '¡Listo!',
                  text: 'Todo está preparado',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false,
                  allowOutsideClick: false
                });
              }, 1000)
            });
          }
        }, 1000);
      },
      willClose: () => {
        // Si el diálogo se cierra, detener los temporizadores
        clearInterval(loadingTimer);
        clearInterval(sessionTimer);

        if(!session.info.isLoggedIn) {
          navigate('/');
          Swal.fire({
            title: 'Ha ocurrido un error',
            icon: 'error',
            text: 'No se ha podido realizar la autenticación correctamente',
            timer: 3000,
            showConfirmButton: false
          })
        }
      }
    });
  };

  useEffect(() => {
    showLoadingDialog();
  }, []);

  const loadFriends = async () => {
    loadFriendsHelper(session,setFriendsURL,setFriendsNames);
  }
  
  return (
    <>
      <TopBar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} friendsURL={friendsURL} friendsNames={friendsNames} ></TopBar>
      <Content>
        <IzqBox>
          <SRoutes>
            <Route path='/' element={<MapView session={session} markers={markers} setMarkers={setMarkers} selectedMap={selectedMap}
             setSelectedMap={setSelectedMap} sites={sites} setSites={setSites} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} editable={editable} setEditable={setEditable} friendsURL={friendsURL} friendsNames={friendsNames} mySelectedMap={mySelectedMap} setMySelectedMap={setMySelectedMap} />}/>
          </SRoutes>
        </IzqBox>
        <DerBox sx={{display: "flex", justifyContent: "left"}}>
          <LateralMenu session={session} markers={markers} setMarkers={setMarkers} selectedMap={selectedMap} setSelectedMap={setSelectedMap} sites={sites} setSites={setSites} editable={editable} setEditable={setEditable} friendsURL={friendsURL} friendsNames={friendsNames} mySelectedMap={mySelectedMap} setMySelectedMap={setMySelectedMap} ></LateralMenu>
        </DerBox>
      </Content>
    </>
  )
}