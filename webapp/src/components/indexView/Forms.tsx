import { Box, Avatar, Typography } from '@mui/material'
import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { AboutUs } from './AboutUs';
import { RegisterProvider } from './RegisterProvider'
import { WhatIs } from './WhatIs';

interface Props {
    index: number;
    setIndex: (index: number) => void;
}

export const Forms = ({ index, setIndex }: Props) => {

    const [carouselAutoplay, setCarouselAutoplay] = useState<number | null>(5000);
    
    const handleFocus = () => {
        setCarouselAutoplay(999999999);
    };

    const handleBlur = () => {
        setCarouselAutoplay(5000);
    };

    return (
        <Box sx={{ width: "100%", height: "80vh", backgroundColor: 'rgba(25, 118, 210, 0.5)', paddingTop: "6.6vh" }}>
            <Carousel variant='dark' activeIndex={index} onSelect={setIndex} interval={carouselAutoplay} >
                <Carousel.Item>
                    <RegisterProvider handleFocus={handleFocus} handleBlur={handleBlur} />
                </Carousel.Item>
                <Carousel.Item>
                    <WhatIs />
                </Carousel.Item>
                <Carousel.Item>
                    <AboutUs />
                </Carousel.Item>
            </Carousel>
        </Box>
    );
};