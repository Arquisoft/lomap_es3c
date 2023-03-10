import { Box, styled } from '@mui/material'
import React from 'react'
import { ExtraInfo } from './ExtraInfo'
import { Forms } from './Forms'
import InitTopBar from './InitTopBar'

export const Index = () => {
  return (
    <Box>
      <InitTopBar></InitTopBar>
      <Forms></Forms>
      <ExtraInfo></ExtraInfo>
    </Box>
  )
}
