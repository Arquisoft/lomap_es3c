import React from 'react';

export interface ReviewProps {
    reviews: any;
}

function ReviewVista(props:ReviewProps){

  let reviewKey =1;

    if(props.reviews !== undefined){
        return (
            <div className='text-center' style={{borderTop: "black 0.1em solid", backgroundColor: "white"}}>
              {props.reviews.map((review: { id: React.Key | null | undefined; author: { identifier: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; reviewBody: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; reviewRating: { ratingValue: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; datePublished: number; }) => (
                <div key={reviewKey++} className='mb-3'>
                  <div>
                    <br/>
                    <h4>{review.author.identifier}</h4>
                    <p>Date: {new Date(review.datePublished).toLocaleString()} - Rating:  {review.reviewRating.ratingValue}</p>
                    <p>{review.reviewBody}</p>
                  </div>
                </div>
              ))}
            </div>);
    }
    return <></>;
    
}

export default ReviewVista;
