import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface Identity {
    id : string;
}

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 10,
    label: '10',
  },
];

export default function SliderMapPlace(props:Identity) {
  return (
    <Box className='m-2' sx={{ width: 'auto' }}>
      <Slider
        sx={{
          '& .MuiSlider-track': {
            color: 'black',
          },
          '& .MuiSlider-rail': {
            color: 'black',
          },
          '& .MuiSlider-thumb': {
            color: 'black',
          },
        }}
        aria-label="Custom marks"
        defaultValue={5}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        max={10}
        id={props.id}
      />
    </Box>
  );
}