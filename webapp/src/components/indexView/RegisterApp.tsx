import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
type WebIdProps = {
    webId: string; // Aquí se especifica que webId es de tipo string
}
export const RegisterApp = ({ webId }: WebIdProps) => {
    //Carousel
    const [carouselAutoplay, setCarouselAutoplay] = useState(5000);
    const handleFocus = () => { setCarouselAutoplay(999999999); }
    const handleBlur = () => { setCarouselAutoplay(5000); }

    const [userRegister, setUserRegister] = useState('');
    const [passRegister, setPassRegister] = useState('');
    const [passConfRegister, setPassConfRegister] = useState('');

    //Checks
    const isBlank = (text: string) => {
        return (text.length === 0);
    }

    const register = function (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isBlank(userRegister) || isBlank(passRegister) || isBlank(passConfRegister)) {
            Swal.fire({
                icon: 'error',
                title: 'Algún campo vacío',
                text: 'Revisa tus campos de nombre y contraseña',
            });
        }
        else if (passRegister != passConfRegister) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseñas no coinciden',
                text: 'Revisa tus contraseñas',
            });
        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'Usuario registrado correctamente',
                text: 'Inicie sesión con sus credenciales para continuar',
            }).then(() => {
                window.location.reload();
            });
        }
    }

    return (
        <Form onSubmit={register} action="/registro">
            <Box sx={{
                marginLeft: "25%", marginRight: "25%", height: "67vh", backgroundColor: 'rgba(25, 118, 210, 1)', border: "solid black 0.2em",
                paddingTop: "3em", display: "flex", flexDirection: "column"
            }}>

                <Box sx={{ fontSize: "1.3em", color: "black" }}><strong> REGISTRO </strong></Box>

                <Box sx={{ height: "3vh" }}></Box>

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

                <Box sx={{ marginLeft: "30%", marginRight: "30%", width: "40%" }}>
                    <TextField id="passConfRegister" label="Confirmación contraseña" type="password" autoComplete="current-password" variant="filled" required
                        InputLabelProps={{ style: { color: 'black' }, focused: true }} onFocus={handleFocus} onBlur={handleBlur} onChange={(event) => setPassConfRegister(event.target.value)} />
                </Box>

                <Box sx={{ height: "3vh" }}></Box>

                <input type="hidden" name="webId" defaultValue={webId} />

                <Box>
                    <Button variant="outlined" sx={{ color: "black", border: "solid black 0.1em" }} type="submit">
                        Registrarme
                    </Button>
                </Box>
            </Box>
        </Form>
    )
}