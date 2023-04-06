import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { MapMarkersState } from '../map/Map';
import { getMapsFromPod, getMarkersOfMapFromPod } from '../map/markUtils/MarkUtils';
import { useSession } from '@inrupt/solid-ui-react';
import { useEffect, useState } from 'react';

const height = window.innerHeight * 0.37;

export default function MapsList(props:MapMarkersState) {

  const [sites, setSites] = useState<string[]>([]);

  let session = useSession();

  useEffect(() => {
    // Función para cargar los mapas desde la promesa de getMapsFromPod
    const loadMaps = async () => {
      try {
        const maps = await getMapsFromPod(session); // Espera a que la promesa de getMapsFromPod se resuelva
        setSites(maps); // Actualiza el estado con los datos de los mapas
      } catch (error) {
        console.error('Error al cargar los mapas:', error);
      }
    };
      loadMaps();
  }, [session.session.info.isLoggedIn]);

  const clickMap = (map: string) => {
    let markers = getMarkersOfMapFromPod(session,map);
    props.setMarkers(markers);
    props.setSelectedMap(map);
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