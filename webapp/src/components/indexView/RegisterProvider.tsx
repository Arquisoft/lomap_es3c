import { NativeSelect, Box, Button,  FormControl, Typography } from '@mui/material'
import { useState } from 'react'
import { login } from "@inrupt/solid-client-authn-browser";


export const RegisterProvider = () => {

    const [provider, setProvider] = useState('');

    const identification = async function () {
        await login({
            oidcIssuer: provider,
            redirectUrl: "http://localhost:3000/home",//Url a la que nos llevara una vez logeado
            clientName: "LoMap_es3c"
        });
    }

    return (
        <Box sx={{
            marginLeft: "25%", marginRight: "25%", height: "67vh", backgroundColor: 'rgba(25, 118, 210, 1)', border: "solid black 0.2em",
            paddingTop: "3em", display: "flex", flexDirection: "column"
        }}>

            <Typography variant="h4" sx={{ mb: 2, color: "white", fontWeight: "bold", textShadow: "2px 2px black" }}>IDENTIFÍCATE</Typography>

            <Box sx={{ height: "5vh" }}></Box>

            <FormControl required sx={{ marginLeft: "35%", marginRight: "35%", width: "30%" }}>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>Proveedor de identidad:</Typography>
                <NativeSelect
                    defaultValue={""}
                    required
                    inputProps={{
                        name: 'provider',
                        id: 'select-native',
                    }}
                    onChange={(event) => setProvider(event.target.value)}
                >
                    <option value="" disabled></option>
                    <option value={"https://inrupt.net"}>  Inrupt  </option >
                    <option value={"https://solidcommunity.net/"}>  Solid Project  </option >
                    <option value={"https://solidweb.org/"}>  Solid Grassroots  </option >
                    <option value={"https://datapod.igrant.io/"}>  iGrant.io  </option >
                </NativeSelect>
            </FormControl>

            <Box sx={{ height: "3vh" }}></Box>

            <Box>
                <Button variant="outlined" sx={{ color: "black", border: "solid black 0.1em" }} onClick={identification}>
                    Acceder
                </Button>
            </Box>
        </Box>
    )
}