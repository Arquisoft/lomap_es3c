import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { Box, Collapse } from '@mui/material';
import VirtualizedList from './MapsList';
import MapsList from './MapsList';
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
    if(props.selectedMap === null || props.selectedMap == undefined) {
      return (
        <div style={{ color: "#313131c7" }}>
          <h2 style={{borderBottom: "solid 3px black", fontSize: "2em", textAlign: "center"}} >Mapa</h2>
          <h3 style={{fontSize: "1.3em"}}>Sin mapa seleccionado</h3>
        </div>
      );
    } else {
      return (
        <div style={{ color: "#313131c7" }}>
          <h2 style={{borderBottom: "solid 3px black", fontSize: "2em", textAlign: "center"}} >Mapa</h2>
          <h3 style={{fontSize: "1.3em"}}>{mapUser} : {props.selectedMap}</h3>
        </div>        
      );
    }
  }


  return (
    <Paper sx={{ width: "100%", position: 'inherit', height: "100%", borderLeft: "solid black 0.25em" }}>
      
      <Box sx={{backgroundColor: 'rgba(25, 118, 210, 1)', display: { xs: 'none', md: 'flex' }, justifyContent: "center", borderBottom: "solid 3px black", padding: "1em" }}>
            {usuarioMapa()}
      </Box>

      <MenuList dense sx={{ backgroundColor: 'rgba(25, 118, 210, 1)', height: "100%" }}>
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