import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useSession } from '@inrupt/solid-ui-react';
import { MapInfo} from '../map/Map';
import { clickMapHelper, loadSitesHelper } from '../../helper/MapListHelper';

const height = window.innerHeight * 0.30;

export default function MapsList(mapLists:MapInfo) {

  const {session} = useSession();

  React.useEffect(() => {
    if (session.info.isLoggedIn) {
      loadSitesHelper(mapLists.session,mapLists.setSites);
    }else{
      mapLists.setSites([]); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [mapLists.sites]);

  const clickMap = async (map: string) => {
    clickMapHelper(map,mapLists.setEditable,session,mapLists.setMarkers,mapLists.setSelectedMap,mapLists.setMySelectedMap,mapLists.sites);
  };
  
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    const site = mapLists.sites[index];
    const isSelected = mapLists.mySelectedMap === index;
  
    return (
      <ListItem style={{ ...style, backgroundColor: isSelected ? "rgba(35, 128, 220, 0.9)" : "transparent" }} key={index} component="div" disablePadding>
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