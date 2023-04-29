import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface ComboBoxProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<{}>, value: string | null) => void;
}

export default function ComboBoxCategoria(props: ComboBoxProps) {
  return (
    <Autocomplete
      disablePortal
      id={props.id}
      options={categories}
      className='m-2'
      sx={{ width: 'auto' }}
      value={props.value}
      onChange={(event, value) => props.onChange(event, value)}
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField {...params} label="Categoría" InputLabelProps={{ style: { color: 'black' } }} />
      )}
    />
  );
}


type TranslationDictionary = {
  [key: string]: string;
}

const translationsInter: TranslationDictionary = {
  'Bar': 'bar',
  'Restaurante': 'restaurant',
  'Tienda': 'shop',
  'Supermercado': 'supermarket',
  'Hotel': 'hotel',
  'Cine': 'cinema',
  'Institución académica': 'academicInstitution',
  'Institución pública': 'publicInstitution',
  'Club de deportes': 'sportsClub',
  'Museo': 'museum',
  'Parque': 'park',
  'Paisaje': 'landscape',
  'Monumento': 'monument',
  'Hospital': 'hospital',
  'Estación de policía': 'policeStation',
  'Centro de transporte': 'transportCenter',
  'Entretenimiento': 'entertainment',
  'Otro': 'other',
};

const translationsView: {[key: string]: string} = {
  'bar': 'Bar',
  'restaurant': 'Restaurante',
  'shop': 'Tienda',
  'supermarket': 'Supermercado',
  'hotel': 'Hotel',
  'cinema': 'Cine',
  'academicInstitution': 'Institución académica',
  'publicInstitution': 'Institución pública',
  'sportsClub': 'Club de deportes',
  'museum': 'Museo',
  'park': 'Parque',
  'landscape': 'Paisaje',
  'monument': 'Monumento',
  'hospital': 'Hospital',
  'policeStation': 'Estación de policía',
  'transportCenter': 'Centro de transporte',
  'entertainment': 'Entretenimiento',
  'other': 'Otro',
};

export function getInterCategory(category:string){
  return translationsInter[category];
}

export function getViewCategory(category:string){
  return translationsView[category];
}

const categories = [
  'Bar',
  'Restaurante',
  'Tienda',
  'Supermercado',
  'Hotel',
  'Cine',
  'Institución académica',
  'Institución pública',
  'Club de deportes',
  'Museo',
  'Parque',
  'Paisaje',
  'Monumento',
  'Hospital',
  'Estación de policía',
  'Centro de transporte',
  'Entretenimiento',
  'Otro',
];