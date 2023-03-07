import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { styled } from '@mui/material';
import Swal from 'sweetalert2';

const height = window.innerHeight * 0.37;
const friends = ['Alex', 'Israel', 'Jorge', 'Enrique', 'Pedro', 'Elisa', 'María', 'Carla', 'El pequeño Timmy', 'Leo Messi', 'Diegogar', 'Thiago Messi'];

const clickFriend = (friend: string) => {
  //TODO funcionalidad relativa a amigos
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Pending Friend Function (' + friend + ')',
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

export default function FriendsList() {


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