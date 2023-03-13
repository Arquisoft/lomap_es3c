import { NativeSelect, Box, Button, TextField, InputLabel, FormControl } from '@mui/material'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import Swal from 'sweetalert2';
import { getDefaultSession, handleIncomingRedirect, login } from "@inrupt/solid-client-authn-browser";

export const Forms = () => {
    //Funcion para obtener los datos de sesión tras registro
    handleRedirectAfterRegister();
    //Form Login
    const [userLogin, setUserLogin] = useState('');
    const [passLogin, setPassLogin] = useState('');
    //Form Register
    const [userRegister, setUserRegister] = useState('');
    const [passRegister, setPassRegister] = useState('');
    const [provider, setProvider] = useState('');
    //Checks
    const isBlank = (text: string) => {
        return (text.length === 0);
    }
    //Carousel
    const [carouselAutoplay, setCarouselAutoplay] = useState(5000);
    const handleFocus = () => { setCarouselAutoplay(999999999); }
    const handleBlur = () => { setCarouselAutoplay(5000); }

    const handleLogin = () => {
        // TODO funcionalidad de login
        console.log(userLogin);
        console.log(passLogin);

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



    const register = async function (e: React.FormEvent<HTMLFormElement>) {
        // TODO funcionalidad de register
        e.preventDefault();

        if (isBlank(userRegister) || isBlank(passRegister)) {
            Swal.fire({
                icon: 'error',
                title: 'Algún campo vacío',
                text: 'Revisa tus campos de nombre y contraseña',
            });
        }
        await login({
            oidcIssuer: provider,
            redirectUrl: window.location.href, //Url a la que nos llevara una vez logeado
            clientName: "LoMap_es3c"
        })

    }

    async function handleRedirectAfterRegister() {
        await handleIncomingRedirect();
        const session = getDefaultSession();
        if (session.info.isLoggedIn) {
            console.log(session.info.webId);
            session.logout();
        }
    }

    return (
        <Box sx={{ width: "100%", height: "80vh", backgroundColor: 'rgba(25, 118, 210, 0.5)', paddingTop: "6.6vh" }}>
            <Carousel variant='dark' interval={carouselAutoplay}>
                <Carousel.Item>
                    <Form>
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
                                <Button variant="outlined" sx={{ color: "black", border: "solid black 0.1em" }} onClick={handleLogin}>
                                    Entrar
                                </Button>
                            </Box>

                        </Box>
                    </Form>
                </Carousel.Item>

                <Carousel.Item>
                    <Form onSubmit={register}>
                        <Box sx={{
                            marginLeft: "25%", marginRight: "25%", height: "67vh", backgroundColor: 'rgba(25, 118, 210, 1)', border: "solid black 0.2em",
                            paddingTop: "3em", display: "flex", flexDirection: "column"
                        }}>

                            <Box sx={{ fontSize: "1.3em", color: "black" }}><strong> REGISTRO </strong></Box>

                            <Box sx={{ height: "5vh" }}></Box>

                            <Box sx={{ marginLeft: "35%", marginRight: "35%", width: "30%" }}>
                                <TextField id="userRegister" label="Usuario" type="text" autoComplete="current-user" variant="filled" required
                                    InputLabelProps={{ style: { color: 'black' }, focused: true }} onFocus={handleFocus} onBlur={handleBlur} onChange={(event) => setUserRegister(event.target.value)} />
                            </Box>

                            <Box sx={{ height: "3vh" }}></Box>

                            <Box sx={{ marginLeft: "35%", marginRight: "35%", width: "30%" }}>
                                <TextField id="passRegister" label="Contraseña" type="password" autoComplete="current-password" variant="filled" required
                                    InputLabelProps={{ style: { color: 'black' }, focused: true }} onFocus={handleFocus} onBlur={handleBlur} onChange={(event) => setPassRegister(event.target.value)} />
                            </Box>

                            <Box sx={{ height: "3vh" }}></Box>

                            <FormControl required sx={{ marginLeft: "20%", marginRight: "20%", width: "60%" }}>
                                <InputLabel variant="standard" htmlFor="select-native">
                                    Proveedor de identidad
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={""}
                                    required
                                    inputProps={{
                                        name: 'provider',
                                        id: 'select-native',
                                    }}
                                    onChange={(event) => setProvider(event.target.value)}
                                >   
                                    <option value="" disabled selected>   </option>
                                    <option value={"https://inrupt.net"}>  Inrupt  </option >
                                    <option value={"https://solidcommunity.net/"}>  Solid Project  </option >
                                    <option value={"https://solidweb.org/"}>  Solid Grassroots  </option >
                                    <option value={"https://datapod.igrant.io/"}>  iGrant.io  </option >
                                </NativeSelect>
                            </FormControl>

                            <Box sx={{ height: "5vh" }}></Box>

                            <Box>
                                <Button variant="outlined" sx={{ color: "black", border: "solid black 0.1em" }} type="submit">
                                    Registrarme
                                </Button>
                            </Box>
                        </Box>
                    </Form>
                </Carousel.Item>
            </Carousel>
        </Box>
    )
}
