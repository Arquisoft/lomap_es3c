import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { styled } from '@mui/material';
import Swal from 'sweetalert2';
import { useSession } from '@inrupt/solid-ui-react';
import { MapMarkersState } from '../map/Map';
import { useState } from 'react';
import { getMapsFromPod } from '../map/markUtils/MarkUtils';

const height = window.innerHeight * 0.37;
const sites = ['Portugal, 2016', 'Ruta por San Vicente', 'Navidad Gijón', 'Almería', 'Viaje a Canarias', 'La Palma', 'La Palma II', '<3', 'Tetuán', 'Aubameyang'];

export default function MapsList(props:MapMarkersState) {

  const [sites, setSites] = useState<string[]>([]);

  const {session} = useSession();

  React.useEffect(() => {
    const loadSites = async () => {
      // Simula una función asincrónica para cargar los sitios
      let maps = await getMapsFromPod(props.session);
      setSites(maps);
    }
    if (session.info.isLoggedIn) {
      loadSites();
    }else{
      setSites([]); 
    }
}, []);

  const clickMap = (map: string) => {
    alert(session.info.isLoggedIn)
    //TODO funcionalidad relativa a mapas
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending Map Function (' + map + ')',
    })
  };
  

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    const site = sites[index];
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton onClick={() => clickMap(site)}>
          <ListItemText primary={site} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box
      sx={{ width: '100%', bgcolor: 'rgba(25, 118, 210, 1)' }}
    >
        <FixedSizeList
          height={height}
          width={1000} //360
          itemSize={46}
          itemCount={sites.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
    </Box>
  );
}