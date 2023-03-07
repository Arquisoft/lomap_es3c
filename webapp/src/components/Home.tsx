import '../App.css';
import TopBar from './TopBar';
import LateralMenu from './LateralMenu';
import Map from './map/Map';
import { Box, styled } from '@mui/material';
import { Route, Routes } from "react-router-dom";

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
  return (
    <>
      <TopBar></TopBar>
      <Content>
        <IzqBox>
          <SRoutes>
            <Route path='/' element={<Map/>}/>
          </SRoutes>
        </IzqBox>
        <DerBox sx={{display: "flex", justifyContent: "left"}}>
          <LateralMenu></LateralMenu>
        </DerBox>
      </Content>
    </>
  )
}
