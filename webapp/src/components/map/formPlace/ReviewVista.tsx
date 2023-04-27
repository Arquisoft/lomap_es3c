import React from 'react';

export interface ReviewProps {
    reviews: any;
}

function ReviewVista(props:ReviewProps){

    if(props.reviews !== undefined){
        return (
            <div className='text-center'>
              {props.reviews.map((review: { id: React.Key | null | undefined; author: { identifier: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; reviewBody: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; reviewRating: { ratingValue: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; datePublished: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                <div key={review.id} className='mb-3'>
                  <div>
                  <h4>{review.author.identifier}</h4>
                  <p>Published: {review.datePublished}</p>
                  <p>Rating: {review.reviewRating.ratingValue}</p>
                  <p>{review.reviewBody}</p>
                  </div>
                </div>
              ))}
            </div>);
    }
    return <></>;
    
}

export default ReviewVista;
