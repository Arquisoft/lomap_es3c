import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, Collapse } from '@mui/material';
import FriendsList from './FriendsList';
import {MapInfo } from '../map/Map';
import { useState } from 'react';
import MapListAux from './MapListAux';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export default function LateralMenu(props:MapInfo) {

  const [openMaps, setOpenMaps] = useState(false);

  const [openFriends, setOpenFriends] = useState(false);

  const [mapUser, setMapUser] = useState<String>("");

  const handleCollapseMaps = () => {
    setOpenMaps(!openMaps);
  }

  const handleCollapseFriends = () => {
    setOpenFriends(!openFriends);
  }

  function usuarioMapa() {
    if(props.selectedMap === null || props.selectedMap === undefined) {
      return (
        <div style={{ color: "black" }}>
          <p style={{ fontSize: "1.1em", marginBottom: "0em" }}><strong><i>Ningún mapa seleccionado</i></strong></p>
        </div>
      );
    } else {
      return (
        <div style={{ color: "black" }}>
          <p style={{ fontSize: "1.1em", marginBottom: "0em" }}><strong>Mapa: <i>{props.selectedMap}</i></strong></p>
        </div>    
      );
    }
  }


  return (
    <Paper sx={{ width: "100%", position: 'inherit', height: "100%", borderLeft: "solid black 0.25em" }}>
      
      <Box sx={{backgroundColor: 'rgba(25, 118, 210, 1)', display: { xs: 'none', md: 'flex' }, justifyContent: "center", borderBottom: "solid 3px black", padding: "1em" }}>
            {usuarioMapa()}
            <div>{mapUser}</div>
      </Box>

      <MenuList dense sx={{ backgroundColor: 'rgba(25, 118, 210, 1)', height: "90%" }}>
        <Box>
          <MenuItem onClick={handleCollapseMaps}>
            <ListItemText><strong>MIS MAPAS</strong></ListItemText>
            {openMaps ? <FaChevronDown /> : <FaChevronUp />}
          </MenuItem>
          <Divider sx={{ opacity: 1 }} />
          <Collapse in={openMaps} timeout="auto" unmountOnExit>
            <MapListAux open={openMaps} session={props.session} markers={props.markers} setMarkers={props.setMarkers} selectedMap={props.selectedMap} 
                        setSelectedMap={props.setSelectedMap} sites={props.sites} setSites={props.setSites} editable={props.editable} 
                        setEditable={props.setEditable} friendsURL={props.friendsURL} friendsNames={props.friendsNames} mySelectedMap={props.mySelectedMap} 
                        setMySelectedMap={props.setMySelectedMap} setMapUser={setMapUser} >
            </MapListAux>
          </Collapse>
        </Box>

        <Box sx={{ borderTop: "solid black 0.25em", paddingTop: "0.5em" }}>
          <MenuItem onClick={handleCollapseFriends}>
            <ListItemText><strong>MIS AMIGOS</strong></ListItemText>
            {openFriends ? <FaChevronDown /> : <FaChevronUp />}
          </MenuItem>
          <Divider sx={{ opacity: 1 }} />
          <Collapse in={openFriends} timeout="auto" unmountOnExit>
            <FriendsList session={props.session} markers={props.markers} setMarkers={props.setMarkers} selectedMap={props.selectedMap} 
                         setSelectedMap={props.setSelectedMap} sites={props.sites} setSites={props.setSites} editable={props.editable} 
                         setEditable={props.setEditable} friendsURL={props.friendsURL} friendsNames={props.friendsNames} 
                         mySelectedMap={props.mySelectedMap} setMySelectedMap={props.setMySelectedMap} setMapUser={setMapUser}  >
            </FriendsList>
          </Collapse>
        </Box>
      </MenuList>
    </Paper>
  );
}