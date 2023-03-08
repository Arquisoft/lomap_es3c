import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';
import ComboBoxCategoria from './ComboBoxCategoria';
import SliderMapPlace from './SliderMapPlace';



function MapPlaceForm(): JSX.Element {

  return (
    <>
      <h2 className='text-center mb-5'>Añade un lugar</h2>
      <form name="addPlace">
        <div className='d-flex flex-column justify-content-center'>
          <label htmlFor='place-name' className='text-center'>Nombre</label>
          <TextField id="place-name" className='m-2' label="Nombre" variant="outlined" />
        </div>
        <div className='d-flex flex-column justify-content-center'>
          <label htmlFor='combobox-category' className='text-center'>Categoria</label>
          <ComboBoxCategoria id='combobox-category'></ComboBoxCategoria>
        </div>
        <div className='d-flex flex-column justify-content-center'>
          <label htmlFor='comments' className='text-center'>Comentarios</label>
          <TextField
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
