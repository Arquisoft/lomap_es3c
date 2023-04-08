import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ImageComponent from '../Image';
import Container from '@mui/material/Container';

interface Props {
  setIndex: (index: number) => void;
}

export default function InitTopBar({ setIndex }: Props) {

  const goIdentification = () => {
    setIndex(0);
  };
  
  const goInfoApp = () => {
    setIndex(1);
  };

  const goInfoUs = () => {
    setIndex(2);
  };
  
  return (
    <AppBar position="static" sx={{borderBottom: "solid black 0.25em", width: "100%"}}>
      <Container sx={{marginLeft: "1em", width: "100%", minWidth: "100%"}}>
        <Toolbar disableGutters sx={{width: "100%"}}>
          <a href="/">
            <ImageComponent src="/barLogo.png" alt="LoMap es3c" />
          </a>

          <a href="/home">
            home
          </a>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:"right", marginRight: "5em" }}>

            <Button 
              key={"IdentificationNav"}
              onClick={goIdentification}
              sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em', marginRight: "3em" }}
            >
              {<strong>Identifícate</strong>}
            </Button>

            <Button 
              key={"InfoApp"}
              onClick={goInfoApp}
              sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em', marginRight: "3em" }}
            >
              {<strong>¿Qué es?</strong>}
            </Button>

            <Button 
              key={"InfoUs"}
              onClick={goInfoUs}
              sx={{ my: 2, color: 'black', display: 'block', fontSize: '1.1em' }}
            >
              {<strong>Sobre nosotros</strong>}
            </Button>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}