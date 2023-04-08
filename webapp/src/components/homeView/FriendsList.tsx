import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Swal from 'sweetalert2';
import { getFriendsFromPod, getFriendsMapsFromPod, getFriendsNamesFromPod } from '../Amigos/podsFriends';
import { useSession } from '@inrupt/solid-ui-react';
//import { pruebaBBDD } from '../../api/api';

export default function FriendsList() {
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
        const friends = await getFriendsFromPod(session);
        setFriendsList(friends);
        const friendsNames = await getFriendsNamesFromPod(friends);
        setFriendsNamesList(friendsNames);
      } else {
        setFriendsList([]);
        setFriendsNamesList([]);
      }
    };

    loadFriends();
  }, [session]);

  const loadMapsForFriend = (friend: string) => {
    getFriendsMapsFromPod(friend, session)

    return ['Mapa1', 'Mapa2', 'Mapa3'];
  }

  const height = window.innerHeight * 0.37;

  const clickFriend = (index: number) => {
    const maps = loadMapsForFriend(friendsList[index]);

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
            // TODO: SE MUESTRA EL MAPA SELECCIONADO

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