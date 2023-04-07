import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { styled } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from 'path';
//import { pruebaBBDD } from '../../api/api';

export default function FriendsList() {
  //const pruebaBBDD = () => {
    // BBDD Conf 3/6 - Invocación GUI
    //let data = "PRUEBA_BBDD";
    //pruebaBBDD(data).then(back => console.log(back.back));
  //}

  const loadFriends = () => {
    // TODO: CARGA DE AMIGOS DEL USUARIO REGISTRADO

    return ['Alex', 'Israel', 'Jorge', 'Enrique', 'Pedro', 'Elisa', 'María', 'Carla', 'El pequeño Timmy', 'Leo Messi', 'Diegogar', 'Thiago Messi'];
  }

  const loadMapsForFriend = (friend: string) => {
    // TODO: CARGA DE MAPAS DEL AMIGOS PULSADO

    return ['Mapa1', 'Mapa2', 'Mapa3'];
  }

  const height = window.innerHeight * 0.37;
  const friends =  loadFriends();

  const clickFriend = (friend: string) => {
    const maps = loadMapsForFriend(friend);

    const mapsObj: {[key: string]: string} = {};
    maps.forEach((m) => {
      mapsObj[m] = m;
    });

    Swal.fire({
      title: 'Mapas de ' + friend,
      input: 'select',
      inputOptions: {
        'Mapas': mapsObj
      },
      inputPlaceholder: 'Seleciona un mapa',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          console.log(value);
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
    const friend = friends[index];

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton onClick={() => clickFriend(friend)}>
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
        itemCount={friends.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}