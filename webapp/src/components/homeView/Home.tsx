import '../../App.css';
import TopBar from './TopBar';
import LateralMenu from './LateralMenu';
import Map, { MarkerInfo } from '../map/Map';
import { Box, styled } from '@mui/material';
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSession } from '@inrupt/solid-ui-react';
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';

const IzqBox = styled(Box) ({
    width: "80%",
  })
  
  const DerBox = styled(Box) ({
    width: "20%",
    justifyContent:"right"
  })
  
  const SRoutes = styled(Routes) ({
      width: "100%"
  })
  
  const Content = styled(Box) ({
    display: "flex",
    flexDirection: "row"
  })

export const Home = () => {

  const [markers, setMarkers] = useState<MarkerInfo[]>([]);

  const [selectedMap, setSelectedMap] = useState<string>();

  return (
    <>
      <TopBar></TopBar>
      <Content>
        <IzqBox>
          <SRoutes>
            <Route path='/' element={<Map markers={markers} setMarkers={setMarkers} selectedMap={selectedMap} setSelectedMap={setSelectedMap}/>}/>
          </SRoutes>
        </IzqBox>
        <DerBox sx={{display: "flex", justifyContent: "left"}}>
          <LateralMenu markers={markers} setMarkers={setMarkers} selectedMap={selectedMap} setSelectedMap={setSelectedMap}></LateralMenu>
        </DerBox>
      </Content>
    </>
  )
}
