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
  await handleIncomingRedirect();
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

  const [markers, setMarkers] = useState<MarkerInfo[]>([]);

  const [selectedMap, setSelectedMap] = useState<string>();

  const [sites, setSites] = useState<string[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {session} = useSession();

  handleRedirectAfterIdentification();

  const [editable, setEditable] = useState<boolean>();
  
  return (
    <>
      <TopBar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}></TopBar>
      <Content>
        <IzqBox>
          <SRoutes>
            <Route path='/' element={<Map session={session} markers={markers} setMarkers={setMarkers} selectedMap={selectedMap}
             setSelectedMap={setSelectedMap} sites={sites} setSites={setSites} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} editable={editable} setEditable={setEditable} />}/>
          </SRoutes>
        </IzqBox>
        <DerBox sx={{display: "flex", justifyContent: "left"}}>
          <LateralMenu session={session} markers={markers} setMarkers={setMarkers} selectedMap={selectedMap} setSelectedMap={setSelectedMap} sites={sites} setSites={setSites} editable={editable} setEditable={setEditable}></LateralMenu>
        </DerBox>
      </Content>
    </>
  )
}
