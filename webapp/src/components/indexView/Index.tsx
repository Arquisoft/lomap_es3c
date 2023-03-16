import { Box } from '@mui/material'
import { ExtraInfo } from './ExtraInfo'
import { Forms } from './Forms'
import InitTopBar from './InitTopBar'
import { useState } from 'react'

export const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Box>
      <InitTopBar setIndex={setActiveIndex}></InitTopBar>
      <Forms index={activeIndex} setIndex={setActiveIndex}></Forms>
      <ExtraInfo></ExtraInfo>
    </Box>
  )
}
