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

export default function LateralMenu(props:MapInfo) {

  const [openMaps, setOpenMaps] = useState(false);

  const [openFriends, setOpenFriends] = useState(false);

  const handleCollapseMaps = () => {
    setOpenMaps(!openMaps);
  }

  const handleCollapseFriends = () => {
    setOpenFriends(!openFriends);
  }

  return (
    <Paper sx={{ width: "100%", position: 'inherit', height: "100%", borderLeft: "solid black 0.25em" }}>
      <MenuList dense sx={{ backgroundColor: 'rgba(25, 118, 210, 1)', height: "100%" }}>
        <Box>
          <MenuItem onClick={handleCollapseMaps}>
            <ListItemText><strong>MIS MAPAS</strong></ListItemText>
          </MenuItem>
          <Divider sx={{ opacity: 1 }} />
          <Collapse in={openMaps} timeout="auto" unmountOnExit>
            <MapListAux open={openMaps} session={props.session} markers={props.markers} setMarkers={props.setMarkers} selectedMap={props.selectedMap} setSelectedMap={props.setSelectedMap} sites={props.sites} setSites={props.setSites}></MapListAux>
          </Collapse>
        </Box>

        <Box sx={{ borderTop: "solid black 0.25em", paddingTop: "0.5em" }}>
          <MenuItem onClick={handleCollapseFriends}>
            <ListItemText><strong>MIS AMIGOS</strong></ListItemText>
          </MenuItem>
          <Divider sx={{ opacity: 1 }} />
          <Collapse in={openFriends} timeout="auto" unmountOnExit>
            <FriendsList></FriendsList>
          </Collapse>
        </Box>
      </MenuList>
    </Paper>
  );
}