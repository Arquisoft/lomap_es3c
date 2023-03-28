import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MapPlaceForm from '../formPlace/MapPlaceForm';

export interface DrawerInfo {
  opened : boolean;
  onSubmit:any;
}

export default function PlaceDrawer(props:DrawerInfo) {

  const [state, setState] = React.useState(props.opened);

  //En funcion del booleano desplegamos u ocultamos el menu lateral
  const toggleDrawer =
    ( open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };

  //Mostramos el formularo para añadir un punto
  const list = () => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
    >
      <MapPlaceForm action={props.onSubmit}></MapPlaceForm>
    </Box>
  );

  //Devolvemos el menú con el formulario
  return (
    <div>
        <React.Fragment key={'left'}>
          <Drawer
            anchor={'left'}
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}