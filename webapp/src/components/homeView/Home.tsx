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

  useEffect(() => {
    showLoadingDialogHelper(session,navigate,loadFriends);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFriends = async () => {
    await loadFriendsHelper(session,setFriendsURL,setFriendsNames);
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