import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';

export default function LateralMenu() {


  return (
    <Paper sx={{ width: 320, position: 'fixed', right: 0 }}>
      <MenuList dense sx={{ backgroundColor: 'rgba(25, 118, 210, 0.35)' }}>
        <MenuItem>
          <ListItemText><strong>MIS MAPAS</strong></ListItemText>
          <a href="home"><img src="cruz.png"/></a>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText inset>Lisboa, Verano 2015</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>Ruta por Oviedo</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>Viaje a Extremadura</ListItemText>
        </MenuItem>
        <Divider sx={{ borderBottomWidth: 5 }} />
        <MenuItem>
          <ListItemText><strong>AMIGOS</strong></ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>Israel</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>Alex</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>Jorge</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>Enrique</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}