import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface ComboBoxProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<{}>, value: string | null) => void;
}

export default function ComboBoxCategoria(props:ComboBoxProps) {
  return (
    <Autocomplete
      disablePortal
      id={props.id}
      options={categories}
      className='m-2'
      sx={{ width: 'auto' }}
      value={props.value}
      onChange={(event, value) => props.onChange(event,value)}
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField {...params} label="Categoría" InputLabelProps={{ style: { color: 'black' } }} />
      )}
    />
  );
}

const categories = [
  'Tienda',
  'Bar',
  'Restaurante',
  'Paisaje',
  'Monumento'
];