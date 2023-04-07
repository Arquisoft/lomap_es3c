import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { Box } from '@mui/material';
import VirtualizedList from './MapsList';
import MapsList from './MapsList';
import FriendsList from './FriendsList';
import { MapMarkersState } from '../map/Map';

export default function LateralMenu(props:MapMarkersState) {


  return (
    <Paper sx={{ width: "100%", position: 'inherit', height: "100%", borderLeft: "solid black 0.25em"}}>
      <MenuList dense sx={{ backgroundColor: 'rgba(25, 118, 210, 1)', height: "100%" }}>
        <Box>
          <MenuItem>
            <ListItemText><strong>MIS MAPAS</strong></ListItemText>
          </MenuItem>
          <Divider sx={{opacity: 1}}/>
          <MapsList session={props.session} markers={props.markers} setMarkers={props.setMarkers} selectedMap={props.selectedMap} setSelectedMap={props.setSelectedMap}></MapsList>
        </Box>

        <Box sx={{borderTop: "solid black 0.25em", paddingTop: "0.5em"}}>
          <MenuItem>
            <ListItemText><strong>MIS AMIGOS</strong></ListItemText>
          </MenuItem>
          <Divider sx={{opacity: 1}}/>
          <FriendsList></FriendsList>
        </Box>
      </MenuList>
    </Paper>
  );
}