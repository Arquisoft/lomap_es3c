import React from 'react'
import { NavFragment } from '../Fragments/NavFragment'
import Carousel from 'react-bootstrap/Carousel';

export const OldIndex = () => {
  return (
    <div>
      <NavFragment />
      <Carousel variant='dark'>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-75 mx-auto"
            src="https://dinahosting.com/blog/cont/uploads/2021/01/login.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-75 mx-auto"
            src="https://st2.depositphotos.com/3591429/10464/i/950/depositphotos_104648666-stock-photo-group-of-people-brainstorming-on.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
