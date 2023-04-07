import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { styled } from '@mui/material';
import Swal from 'sweetalert2';

export default function MapsList() {

  const loadMaps = () => {
    // CARGA DE MAPAS DEL USUARIO REGISTRADO

    return ['Portugal, 2016', 'Ruta por San Vicente', 'Navidad Gijón', 'Almería', 'Viaje a Canarias', 'La Palma', 'La Palma II', '<3', 'Tetuán', 'Aubameyang'];
  }
  
  const height = window.innerHeight * 0.37;
  const maps = loadMaps();
  
  const clickMap = (map: string) => {
    // CARGA DEL MAPA AL PULSAR SOBRE ÉL
    
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pending Map Function (' + map + ')',
    })
  };

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    const map = maps[index];
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton onClick={() => clickMap(map)}>
          <ListItemText primary={map} />
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
          itemCount={maps.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
    </Box>
  );
}