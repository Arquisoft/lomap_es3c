import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import Swal from 'sweetalert2';
import { getDefaultSession, handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";
import { RegisterProvider } from './RegisterProvider'
import { RegisterApp } from './RegisterApp'

interface Props {
    index: number;
    setIndex: (index: number) => void;
  }


export const Forms = ({ index, setIndex }: Props) => {
    //Carousel
    const [carouselAutoplay, setCarouselAutoplay] = useState<number | null>(5000);
    const handleFocus = () => { setCarouselAutoplay(null); }
    const handleBlur = () => { setCarouselAutoplay(5000); }

    //Funcion para obtener los datos de sesión tras registro
    handleRedirectAfterRegister();
    const [podReg, setPodReg] = useState(false);
    const [webId, setWebId] = useState('');

    //Form Login
    const [userLogin, setUserLogin] = useState('');
    const [passLogin, setPassLogin] = useState('');

    //Checks
    const isBlank = (text: string) => {
        return (text.length === 0);
    }

    //Login
    const handleLogin = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // TODO funcionalidad de login

        if (isBlank(userLogin) || isBlank(passLogin)) {
            Swal.fire({
                icon: 'error',
                title: 'Algún campo vacío',
                text: 'Revisa tus campos de nombre y contraseña',
            });
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Pending Login Function',
        })
    }
    //Manejar la sesion del proveedor
    async function handleRedirectAfterRegister() {
        await handleIncomingRedirect();
        const session = getDefaultSession();
        if (session.info.isLoggedIn) {
            if (session.info.webId === undefined) { session.info.webId = ""; }
            setIndex(1);
            const userWebId = session.info.webId?.replace('/profile/card#me', '');
            setPodReg(true);
            setWebId(userWebId);
            console.log(session.info.webId);
            Swal.fire({
                icon: 'success',
                title: 'Registro POD completado',
                text: 'Ahora registrese y nosotros gestionaremos su POD',
            })
            session.logout();
        }
    }

    return (
        <Box sx={{ width: "100%", height: "80vh", backgroundColor: 'rgba(25, 118, 210, 0.5)', paddingTop: "6.6vh" }}>
            <Carousel variant='dark' activeIndex={index} onSelect={setIndex} interval={carouselAutoplay} >
                <Carousel.Item>
                    <Form onSubmit={handleLogin} >
                        <Box sx={{
                            marginLeft: "25%", marginRight: "25%", height: "67vh", backgroundColor: 'rgba(25, 118, 210, 1)', border: "solid black 0.2em",
                            paddingTop: "3em", display: "flex", flexDirection: "column"
                        }}>

                            <Box sx={{ fontSize: "1.3em", color: "black" }}><strong> INICIAR SESIÓN </strong></Box>

                            <Box sx={{ height: "7vh" }}></Box>

                            <Box sx={{ marginLeft: "35%", marginRight: "35%", width: "30%" }}>
                                <TextField id="userLogin" label="Usuario" type="text" autoComplete="current-user" variant="filled" required
                                    InputLabelProps={{ style: { color: 'black' }, focused: true }} onFocus={handleFocus} onBlur={handleBlur} onChange={(event) => setUserLogin(event.target.value)} />
                            </Box>

                            <Box sx={{ height: "5vh" }}></Box>

                            <Box sx={{ marginLeft: "35%", marginRight: "35%", width: "30%" }}>
                                <TextField id="passLogin" label="Contraseña" type="password" autoComplete="current-password" variant="filled" required
                                    InputLabelProps={{ style: { color: 'black' }, focused: true }} onFocus={handleFocus} onBlur={handleBlur} onChange={(event) => setPassLogin(event.target.value)} />
                            </Box>

                            <Box sx={{ height: "10vh" }}></Box>

                            <Box>
                                <Button variant="outlined" sx={{ color: "black", border: "solid black 0.1em" }} type="submit">
                                    Entrar
                                </Button>
                            </Box>

                        </Box>
                    </Form>
                </Carousel.Item>

                <Carousel.Item>
                    {podReg ? <RegisterApp webId={webId} /> : <RegisterProvider />}
                </Carousel.Item>
            </Carousel>
        </Box>
    );
};