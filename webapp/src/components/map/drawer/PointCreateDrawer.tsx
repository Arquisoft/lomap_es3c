import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MapPlaceForm from '../formPlace/MapPlaceForm';
import { useEffect } from 'react';
import { toggleDrawerHelper } from '../../../helper/PointViewDrawerHelper';

export interface DrawerInfo {
  opened : boolean;
  onSubmit:any;
  toggleDrawer:any;
}

export default function PlaceDrawer(props:DrawerInfo) {

  const [state, setState] = React.useState(props.opened);

  useEffect(() => {
    setState(props.opened);
  }, [props.opened]);


  //En funcion del booleano desplegamos u ocultamos el menu lateral
  const toggleDrawer = toggleDrawerHelper(setState,props.toggleDrawer);

  //Mostramos el formularo para añadir un punto
  const list = () => (
    <Box sx={{ 
            width: 350,
            backgroundColor: "rgba(25, 118, 210, 0.8)"
         }}
      role="presentation"
    >
      <MapPlaceForm action={props.onSubmit} isReadOnly={false}></MapPlaceForm>
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