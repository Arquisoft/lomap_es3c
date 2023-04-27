import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Collapse } from '@mui/material';
import React, { useState } from 'react';
import SliderMapPlace from './SliderMapPlace';

export interface ReviewProps {
    reviews: any;
}

function ReviewVista(props:ReviewProps){

    if(props.reviews !== undefined){
        return (
            <div className='text-center'>
              {props.reviews.map((review: { id: React.Key | null | undefined; author: { identifier: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; reviewBody: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; reviewRating: { rating: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; datePublished: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                <div key={review.id}>
                  <h3>{review.author.identifier}</h3>
                  <p>{review.reviewBody}</p>
                  <p>Rating: {review.reviewRating.rating}</p>
                  <p>Published: {review.datePublished}</p>
                </div>
              ))}
            </div>);
    }
    return <></>;
    
}

export default ReviewVista;
