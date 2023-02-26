import Container from '@mui/material/Container';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import "./login.css";

function LogIn() {
  return (
    <div className='login-container'>
      <Row>
        <Form>
          <Form.Group controlId="formLogin" className="mb-3">
            <Form.Label className='select-text'>Selecciona un proveedor de identidad</Form.Label>
            <Form.Select defaultValue="Inrupt">
              <option>Inrupt</option>
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

export default LogIn;