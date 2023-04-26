import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Swal from 'sweetalert2';
import { getFriendsFromPod, getFriendsMapsFromPod, getFriendsNamesFromPod, getMarkersOfFriendMapFromPod, grantReadAccessToFriend } from '../Amigos/podsFriends';
import { useSession } from '@inrupt/solid-ui-react';
import { getMarkersOfMapFromPod } from '../map/markUtils/MarkUtils';
import { MapInfo } from '../map/Map';
//import { pruebaBBDD } from '../../api/api';

export default function FriendsList(friendMap:MapInfo) {
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

        //const friends = await getFriendsFromPod(session);
        //setFriendsList(friends);
        //const friendsNames = await getFriendsNamesFromPod(friends);
        //setFriendsNamesList(friendsNames);

        //const friendsNames = friends.map(friend => friend.split("//")[1].split(".inrupt.net")[0]);
      } else {
        setFriendsList([]);
        setFriendsNamesList([]);
      }
    };

    loadFriends();
  }, [session]);

  const loadMapsForFriend = async (friend: string) => {
    var mapas = await getFriendsMapsFromPod(friend, session)

    if (mapas as unknown as Array<string>) {
      return mapas as unknown as Array<string>;
    }

    return [''];
  }

  const height = window.innerHeight * 0.37;

  const clickFriend = async (index: number) => {
    const maps = await loadMapsForFriend(friendsList[index]);

    const mapsObj: {[key: string]: string} = {};
    maps.forEach((m) => {
      mapsObj[m] = m;
    });

    Swal.fire({
      title: 'Mapas de ' + friendsNamesList[index],
      input: 'select',
      inputOptions: {
        'Mapas': mapsObj
      },
      inputPlaceholder: 'Selecciona un mapa',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === '') {
            resolve('Debes seleccionar un mapa')
          } else {
            friendMap.setEditable(false);
            getMarkersOfFriendMapFromPod(session, friendsList[index],value).then((markers) => {
              friendMap.setMarkers(markers);}).catch((error)=>{
                  console.error("Buena tarde")
              });            
            friendMap.setSelectedMap(value);

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