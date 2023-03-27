import '../../App.css';
import TopBar from './TopBar';
import LateralMenu from './LateralMenu';
import Map from '../map/Map';
import { Box, styled } from '@mui/material';
import { Route, Routes } from "react-router-dom";
import { getDefaultSession, handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";

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
    //Realizar el POST
    await fetch("/mi-endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          provider: provider,
          userName: userName,
          webId: userWebId
      })
  });
  }
}

export const Home = () => {
  handleRedirectAfterIdentification();
  return (
    <>
      <TopBar></TopBar>
      <Content>
        <IzqBox>
          <SRoutes>
            <Route path='/' element={<Map />} />
          </SRoutes>
        </IzqBox>
        <DerBox sx={{ display: "flex", justifyContent: "left" }}>
          <LateralMenu></LateralMenu>
        </DerBox>
      </Content>
    </>
  )
}
