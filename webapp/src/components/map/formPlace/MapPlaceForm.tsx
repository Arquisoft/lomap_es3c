import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ComboBoxCategoria from './ComboBoxCategoria';
import { Box } from '@mui/material';
import { handleFileInputChangeHelper, handleSubmitHelper } from '../../../helper/MapPlaceFormHelper';

interface FormProps {
  action: any;
  isReadOnly: boolean;
}

function MapPlaceForm(props: FormProps): JSX.Element {

  const [selectedCategory, setSelectedCategory] = useState<string>('Tienda');
  const [filesArray, setFilesArray] = useState<File[]>([]);

  const handleAutocompleteChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedCategory(value || ""); // Si el valor es null, establece una cadena vacía
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = () => {
    handleFileInputChangeHelper(inputRef,setFilesArray);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmitHelper(event,selectedCategory,filesArray,props.action);
  }

  return (
    <Box sx={{ backgroundColor: "rgba(25, 118, 210, 0.8)", paddingRight: "1em" }}>
      <Box sx={{ height: "1em" }} />
      <h2 className='text-center mb-5'><i>Añade un lugar</i></h2>
      <form name="addPlace" id='formMarker' onSubmit={handleSubmit}>
        <div className='d-flex flex-column justify-content-center' style={{ marginLeft: "0.5em" }}>
          <label htmlFor='place-name' className='text-center'><strong>Nombre</strong></label>
          <TextField
            InputLabelProps={{ style: { color: 'black' }, focused: true }} id="place-name" name='name' className='m-2' label="Nombre" variant="outlined" />
        </div>
        <Box sx={{ height: "1em" }} />
        <div className='d-flex flex-column justify-content-center' style={{ marginLeft: "0.5em" }}>
          <label htmlFor='combobox-category' className='text-center'><strong>Categoria</strong></label>
          <ComboBoxCategoria
            id="combobox-category"
            value={selectedCategory}
            onChange={handleAutocompleteChange}
          />
        </div>
        <Box sx={{ height: "1em" }} />
        <div className='d-flex flex-column justify-content-center' style={{ marginLeft: "0.5em" }}>
                <label htmlFor='description' className='text-center'><strong>Descripción</strong></label>
                <TextField
                  name='description'
                  id="description"
                  label="Descripción"
                  className='m-2'
                  multiline
                  rows={4}
                  InputLabelProps={{ style: { color: 'black' }, focused: true }}
                />
              </div>
        <Box sx={{ height: "1em" }} />
        <div className='d-flex flex-column justify-content-center' style={{ alignItems: "center" }}>
          <label htmlFor='image-button' className='text-center'><strong>Subir imágenes</strong></label>
          <input
            id='image-button'
            name='images'
            type="file"
            required
            multiple
            accept="image/*"
            ref={inputRef}
            onChange={handleFileInputChange}
          />
        </div>
        <Box sx={{ height: "3em" }} />
        <div className='text-center'>
          <Button variant="contained" type="submit" sx={{
            my: 2,
            backgroundColor: "black",
            '&:hover': {
              bgcolor: 'black',
              color: 'white',
            }
          }}>Añadir lugar</Button>
        </div>
        <Box sx={{ height: "3.4em" }} />
      </form>
    </Box>
  );
}

export default MapPlaceForm;
