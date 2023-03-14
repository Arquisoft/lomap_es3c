import { NativeSelect, Box, Button, InputLabel, FormControl } from '@mui/material'
import { useState } from 'react'
import { login } from "@inrupt/solid-client-authn-browser";


export const RegisterProvider = () => {

    const [provider, setProvider] = useState('');

    const register = async function () {
        await login({
            oidcIssuer: provider,
            redirectUrl: "http://localhost:3000/",//Url a la que nos llevara una vez logeado
            clientName: "LoMap_es3c"
        });
    }

    return (
        <Box sx={{
            marginLeft: "25%", marginRight: "25%", height: "67vh", backgroundColor: 'rgba(25, 118, 210, 1)', border: "solid black 0.2em",
            paddingTop: "3em", display: "flex", flexDirection: "column"
        }}>

            <Box sx={{ fontSize: "1.3em", color: "black" }}><strong> REGISTRO </strong></Box>

            <Box sx={{ height: "5vh" }}></Box>

            <FormControl required sx={{ marginLeft: "30%", marginRight: "30%", width: "40%" }}>
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
                    <option value="" disabled></option>
                    <option value={"https://inrupt.net"}>  Inrupt  </option >
                    <option value={"https://solidcommunity.net/"}>  Solid Project  </option >
                    <option value={"https://solidweb.org/"}>  Solid Grassroots  </option >
                    <option value={"https://datapod.igrant.io/"}>  iGrant.io  </option >
                </NativeSelect>
            </FormControl>

            <Box sx={{ height: "3vh" }}></Box>

            <Box>
                <Button variant="outlined" sx={{ color: "black", border: "solid black 0.1em" }} onClick={register}>
                    Registrar POD
                </Button>
            </Box>
        </Box>
    )
}