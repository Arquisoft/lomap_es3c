import '../../App.css';
import TopBar from './TopBar';
import LateralMenu from './LateralMenu';
import Map, { MarkerInfo } from '../map/Map';
import { Box, styled } from '@mui/material';
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSession } from '@inrupt/solid-ui-react';
import { getDefaultSession, handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";
import { checkRegister, registerUser } from '../../api/api';
import Swal from 'sweetalert2';
import { getFriendsFromPod, getFriendsNamesFromPod } from '../Amigos/podsFriends';
import { useNavigate } from 'react-router-dom';

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

const readCookie = (name: string) => {
  try {
    let cookies = document.cookie.split('; ');
    let selectedCookie = cookies.find(cookie => cookie.startsWith(name + '='));
    let valueCookie = selectedCookie?.split('=')[1];
    return valueCookie;
  } catch (e: any) {
    return "";
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

  useEffect(() => {
    showLoadingDialog();
  }, []);

  const showLoadingDialog = async () => {
    setTimeout(() => {
      if(!session.info.isLoggedIn) {
        navigate('/');
        Swal.close();
      } else {
        loadFriends();
        Swal.fire({
          title: 'Cargando...',
          text: 'Espere un instante mientras preparamos todo',
          timer: 5000,
          timerProgressBar: true,
          allowOutsideClick: false,
          showConfirmButton: false
        });
      }
    }, 1000);
  }

  const loadFriends = async () => {
    const friendsURLResult = await getFriendsFromPod(session);
    setFriendsURL(friendsURLResult);
    const friendsNamesResult = await getFriendsNamesFromPod(friendsURLResult);
    setFriendsNames(friendsNamesResult);
  }
  
  return (
    <>
      <TopBar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} friendsURL={friendsURL} friendsNames={friendsNames}></TopBar>
      <Content>
        <IzqBox>
          <SRoutes>
            <Route path='/' element={<Map session={session} markers={markers} setMarkers={setMarkers} selectedMap={selectedMap}
             setSelectedMap={setSelectedMap} sites={sites} setSites={setSites} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} editable={editable} setEditable={setEditable} friendsURL={friendsURL} friendsNames={friendsNames} />}/>
          </SRoutes>
        </IzqBox>
        <DerBox sx={{display: "flex", justifyContent: "left"}}>
          <LateralMenu session={session} markers={markers} setMarkers={setMarkers} selectedMap={selectedMap} setSelectedMap={setSelectedMap} sites={sites} setSites={setSites} editable={editable} setEditable={setEditable} friendsURL={friendsURL} friendsNames={friendsNames}></LateralMenu>
        </DerBox>
      </Content>
    </>
  )
}
