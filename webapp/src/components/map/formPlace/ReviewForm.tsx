import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Collapse } from '@mui/material';
import React, { useState } from 'react';
import SliderMapPlace from './SliderMapPlace';
import { Session } from '@inrupt/solid-client-authn-browser';

export interface ReviewFormProps {
  session:Session,
  reviews: any;
  handleSubmit:any;
}

function ReviewForm(props: ReviewFormProps) {

  const [isOpen, setIsOpen] = useState(false); // State to control the collapse

  const [selectedScore, setSelectedScore] = useState<number>(5);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSliderChange = (e: Event, value: number) => {
    setSelectedScore(value);
  };

  const handleSubmit =(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    // Aquí se debe crear el objeto a partir de los datos del formulario
    const form = document.getElementById('formReview') as HTMLFormElement;
    const formData = new FormData(form);
    let review = {
      "@type": "Review",
          "author": {
            "@type": "Person",
            "identifier": (props.session.info.webId?.split('/profile')[0] || '')
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": selectedScore
          },
          "datePublished": Date.now(),
          "reviewBody": formData.get('comments') as string,
    };
    props.handleSubmit(review);
  }

  return (<div className='text-center' style={{backgroundColor: "white"}}>
    <Button variant="contained" onClick={handleToggle} sx={{
      my: 2,
      backgroundColor: "black",
      '&:hover': {
        bgcolor: 'black',
        color: 'white',
      }
    }}>Añadir Valoración</Button>
    <Collapse in={isOpen}>
      <div>
      <form name="addReview" id='formReview' onSubmit={handleSubmit}>
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
        <Box sx={{ height: "1em" }} />
        <div className='text-center'>
          <Button variant="contained" type="submit" sx={{
            my: 2,
            backgroundColor: "black",
            '&:hover': {
              bgcolor: 'black',
              color: 'white',
            }
          }}>Confirmar</Button>
        </div>
        </form>
      </div>
    </Collapse>
  </div>);
}

export default ReviewForm;
