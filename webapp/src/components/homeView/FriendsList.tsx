import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Swal from 'sweetalert2';
import { getFriendsMapsFromPod, getMarkersOfFriendMapFromPod } from '../Amigos/podsFriends';
import { useSession } from '@inrupt/solid-ui-react';
import { Session } from '@inrupt/solid-client-authn-browser';
//import { pruebaBBDD } from '../../api/api';

export interface FriendMapInfo {
  children: [];
  session: Session;
  markers: any;
  setMarkers: any;
  selectedMap: any;
  setSelectedMap: any;
  sites: string[];
  setSites: any;
  selectedCategories?:string[];
  setSelectedCategories?:any;
  editable?: boolean;
  setEditable: any;
  friendsURL:string[];
  friendsNames:string[];
  mySelectedMap:number;
  setMySelectedMap:any;
  setMapUser:any;
}

export default function FriendsList(friendMap:FriendMapInfo) {
  //const pruebaBBDD = () => {
    // BBDD Conf 3/6 - Invocación GUI
    //let data = "PRUEBA_BBDD";
    //pruebaBBDD(data).then(back => console.log(back.back));
  //}

  const {session} = useSession();
  
  const [friendsList, setFriendsList] = React.useState<string[]>([]);
  const [friendsNamesList, setFriendsNamesList] = React.useState<string[]>([]);

  React.useEffect(() => {
    const loadFriends = async () => {
      if (session.info.isLoggedIn) {
        setFriendsList(friendMap.friendsURL)
        setFriendsNamesList(friendMap.friendsNames);
      } else {
        setFriendsList([]);
        setFriendsNamesList([]);
      }
    };

    loadFriends();
  }, [session, friendMap.friendsNames, friendMap.friendsURL]);

  const loadMapsForFriend = async (friend: string) => {
    Swal.fire({
      title: 'Cargando mapas...',
      showConfirmButton: false,
      allowOutsideClick: false
    });

    var mapas = await getFriendsMapsFromPod(friend, session)

    if (mapas as unknown as Array<string>) {
      return mapas as unknown as Array<string>;
    }

    return [''];
  }

  const height = window.innerHeight * 0.30;

  const clickFriend = async (index: number) => {
    const maps = await loadMapsForFriend(friendsList[index]);

    const mapsObj: {[key: string]: string} = {};
    maps.forEach((m) => {
      mapsObj[m] = m;
    });

    Swal.fire({
      title: '<p style="color:black; margin-bottom:0em;">Mapas de ' + friendsNamesList[index] + "</p>",
      input: 'select',
      inputOptions: {
        'Mapas': mapsObj
      },
      inputPlaceholder: 'Selecciona un mapa',
      showCancelButton: true,
      cancelButtonColor: 'rgba(255, 50, 50, 0.9)',
      cancelButtonText: 'Atrás',
      confirmButtonColor: 'rgba(25, 118, 210, 1)',
      confirmButtonText: 'Visualizar',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === '') {
            resolve('Debes seleccionar un mapa')
          } else {
            friendMap.setEditable(false);
            getMarkersOfFriendMapFromPod(session, friendsList[index],value).then((markers) => {
              friendMap.setMarkers(markers);}).catch((error)=>{
              });            
            friendMap.setSelectedMap(value);
            friendMap.setMySelectedMap(-1); 
            friendMap.setMapUser(friendsNamesList[index]);
            Swal.close();
          }
        })
      }
    })
  };

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    const friend = friendsNamesList[index];

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton onClick={() => clickFriend(index)}>
          <ListItemText primary={friend} />
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
        itemCount={friendsNamesList.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}