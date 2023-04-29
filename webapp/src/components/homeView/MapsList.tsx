import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { styled } from '@mui/material';
import Swal from 'sweetalert2';
import { useSession } from '@inrupt/solid-ui-react';
import { MapInfo} from '../map/Map';
import { useState } from 'react';
import { getMapsFromPod, getMarkersOfMapFromPod } from '../map/markUtils/MarkUtils';

const height = window.innerHeight * 0.37;

export default function MapsList(mapLists:MapInfo) {

  const {session} = useSession();

  React.useEffect(() => {
    const loadSites = async () => {
      // Simula una función asincrónica para cargar los sitios
      let maps = await getMapsFromPod(mapLists.session);
      let aux = maps.map(map=>{return decodeURIComponent(map)});
      mapLists.setSites(aux);
    }
    if (session.info.isLoggedIn) {
      loadSites();
    }else{
      mapLists.setSites([]); 
    }
}, [mapLists.sites]);

  const clickMap = async (map: string) => {
    mapLists.setEditable(true);
    let markers = await getMarkersOfMapFromPod(session,map);
    mapLists.setMarkers(markers);
    mapLists.setSelectedMap(map);
    mapLists.setMySelectedMap(mapLists.sites.indexOf(map));
  };
  
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    const site = mapLists.sites[index];
    const isSelected = mapLists.mySelectedMap === index;
  
    return (
      <ListItem style={{ ...style, backgroundColor: isSelected ? "#62b3ff" : "transparent" }} key={index} component="div" disablePadding>
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
          itemCount={mapLists.sites.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
    </Box>
  );
}