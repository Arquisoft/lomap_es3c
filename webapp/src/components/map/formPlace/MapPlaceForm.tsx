import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ComboBoxCategoria from './ComboBoxCategoria';
import SliderMapPlace from './SliderMapPlace';
import { MarkerInfo } from '../Map';
import { DrawerInfo } from '../drawer/PointCreateDrawer';
import { Box } from '@mui/material';
import Swal from 'sweetalert2';

interface FormProps {
  action: any;
  isReadOnly: boolean;
}

function MapPlaceForm(props: FormProps): JSX.Element {

  const [selectedCategory, setSelectedCategory] = useState<string>('Tienda');
  const [selectedScore, setSelectedScore] = useState<number>(5);
  const [filesArray, setFilesArray] = useState<File[]>([]);

  const handleAutocompleteChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedCategory(value || ""); // Si el valor es null, establece una cadena vacía
  };

  const handleSliderChange = (e: Event, value: number) => {
    setSelectedScore(value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = () => {
    // Obtener la lista de archivos seleccionados
    const fileList = inputRef.current?.files;
    
    // Convertir la lista de archivos en un arreglo de tipo File[]
    setFilesArray(Array.from(fileList as FileList) as File[]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    // Aquí se debe crear el objeto a partir de los datos del formulario
    const form = document.getElementById('formMarker') as HTMLFormElement;
    const formData = new FormData(form);
    let marker: MarkerInfo = {
      name: formData.get('name') as string,
      categoria: selectedCategory,
      comments: formData.get('comments') as string,
      score: selectedScore,
      images:filesArray,
      coords: [0, 0]
      // Aquí se deben agregar las propiedades del objeto nuevo
    };
    props.action(marker); // Añade el objeto a la lista

    Swal.fire({
      icon: 'success',
      title: 'Marcador añadido correctamente',
      showConfirmButton: false,
      timer: 2000
    })
  }

  return (
    <Box sx={{ backgroundColor: "rgba(25, 118, 210, 0.8)", paddingRight: "1em" }}>
      <Box sx={{ height: "1em" }} />
      <h2 className='text-center mb-5'><i>Añade un lugar</i></h2>
      <form name="addPlace" id='formMarker' onSubmit={handleSubmit}>
        <div className='d-flex flex-column justify-content-center'>
          <label htmlFor='place-name' className='text-center'><strong>Nombre</strong></label>
          <TextField
            InputLabelProps={{ style: { color: 'black' }, focused: true }} id="place-name" name='name' className='m-2' label="Nombre" variant="outlined" />
        </div>
        <Box sx={{ height: "1em" }} />
        <div className='d-flex flex-column justify-content-center'>
          <label htmlFor='combobox-category' className='text-center'><strong>Categoria</strong></label>
          <ComboBoxCategoria
            id="combobox-category"
            value={selectedCategory}
            onChange={handleAutocompleteChange}
          />
        </div>
        <Box sx={{ height: "1em" }} />
        <div className='d-flex flex-column justify-content-center'>
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
        <Box sx={{ height: "1em" }} />
        <div className='d-flex flex-column justify-content-center'>
          <label htmlFor='comments' className='text-center'><strong>Comentarios</strong></label>
          <TextField
            name='comments'
            id="comments"
            label="Comentarios"
            className='m-2'
            multiline
            maxRows={4}
            InputLabelProps={{ style: { color: 'black' }, focused: true }}
          />
        </div>
        <Box sx={{ height: "1em" }} />
        <div className='d-flex flex-column justify-content-center m-2'>
          <label htmlFor='score' className='text-center'><strong>Puntuación</strong></label>
          <SliderMapPlace id='score' onChange={handleSliderChange}></SliderMapPlace>
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
