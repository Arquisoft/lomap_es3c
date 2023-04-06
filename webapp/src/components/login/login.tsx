import Container from '@mui/material/Container';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import "./login.css";
import {
  login,
  handleIncomingRedirect,
  onSessionRestore,
  getDefaultSession,
  fetch
} from "@inrupt/solid-client-authn-browser";
import { redirect } from 'react-router-dom';

const handleLogin =async function(e: React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  //Obtenemos el valor del Identity provider
  let selectedElement = (document.getElementById("select-idp")) as HTMLSelectElement;
  let selectedIdp = selectedElement.options[selectedElement.selectedIndex].value; //Obtenemos el valor de la opcion seleccionada mediante el indice seleccionado
  await login({
    oidcIssuer: selectedIdp,
    redirectUrl: "http://localhost:3000/home"
  });
}

function logIn() {
  return (
    <div className='login-container'>
      <Row>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formLogin" className="mb-3">
            <Form.Label className='select-text'>Selecciona un proveedor de identidad</Form.Label>
            <Form.Select defaultValue="Inrupt" id='select-idp'>
              <option value="https://inrupt.net">Inrupt</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Button type="submit">Iniciar sesión</Button>
          </Form.Group>

        </Form>
      </Row>
    </div>
  );
}

export default logIn;