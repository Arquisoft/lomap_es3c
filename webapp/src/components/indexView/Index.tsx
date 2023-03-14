import { Box } from '@mui/material'
import { ExtraInfo } from './ExtraInfo'
import { Forms } from './Forms'
import InitTopBar from './InitTopBar'

export const Index = () => {
  const x = true;
  return (
    <Box>
      <InitTopBar></InitTopBar>
      <Forms></Forms>
      <ExtraInfo></ExtraInfo>
    </Box>
  )
}
