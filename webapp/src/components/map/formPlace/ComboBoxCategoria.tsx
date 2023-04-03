import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface ComboBoxProps {
    id : string;
    defaultValue?: { label: string};
}

export default function ComboBoxCategoria(props:ComboBoxProps) {
  return (
    <Autocomplete
      disablePortal
      id={props.id}
      defaultValue = {props.defaultValue}
      options={categories}
      className='m-2'
      sx={{ width: 'auto' }}
      renderInput={(params) => <TextField {...params} label="Categoría" />}
    />
  );
}

const categories = [
  { label: 'Tienda'},
  { label: 'Bar'},
  { label: 'Restaurante'},
  { label: 'Paisaje'},
  { label: 'Monumento'},
];