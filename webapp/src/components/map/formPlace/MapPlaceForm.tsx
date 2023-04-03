import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ComboBoxCategoria from './ComboBoxCategoria';
import SliderMapPlace from './SliderMapPlace';
import {MarkerInfo} from '../Map';

interface FormProps{
  action:any;
  isReadOnly:boolean;
}

function MapPlaceForm(props:FormProps): JSX.Element {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    // Aquí se debe crear el objeto a partir de los datos del formulario
    const form = document.getElementById('formMarker') as HTMLFormElement;
    const formData = new FormData(form);
    let marker: MarkerInfo = {
      name: formData.get('name') as string,
      categoria:event.currentTarget[1].nodeValue ==null?'a':event.currentTarget[1].nodeValue,
      comments:formData.get('comments') as string,
      score:2,
      coords:[0,0]
      // Aquí se deben agregar las propiedades del objeto nuevo
    };
    props.action(marker); // Añade el objeto a la lista
  }

  return (
    <>
      <h2 className='text-center mb-5'>Añade un lugar</h2>
      <form name="addPlace" id='formMarker' onSubmit={handleSubmit}>
        <div className='d-flex flex-column justify-content-center'>
          <label htmlFor='place-name' className='text-center'>Nombre</label>
          <TextField id="place-name" name='name' className='m-2' label="Nombre" variant="outlined" />
        </div>
        <div className='d-flex flex-column justify-content-center'>
          <label htmlFor='combobox-category' className='text-center'>Categoria</label>
          <ComboBoxCategoria id='combobox-category'></ComboBoxCategoria>
        </div>
        <div className='d-flex flex-column justify-content-center'>
          <label htmlFor='comments' className='text-center'>Comentarios</label>
          <TextField
            name='comments'
            id="comments"
            label="Comentarios"
            className='m-2'
            multiline
            maxRows={4}
          />
        </div>
        <div className='d-flex flex-column justify-content-center m-2'>
          <label htmlFor='score' className='text-center'>Puntuación</label>
          <SliderMapPlace id='score'></SliderMapPlace>
        </div>
        <div className='text-center'>
          <Button variant="contained" type="submit" sx={{ my: 2 }}>Añadir lugar</Button>
        </div>

      </form>
    </>
  );
}

export default MapPlaceForm;
