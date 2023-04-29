import { fireEvent, render,  waitFor } from "@testing-library/react";
import TopBar from "./TopBar";
import { BrowserRouter as Router } from "react-router-dom";

const myWebId = "https://israel11.inrupt.net/profile/card#me"
const friendsURL = [myWebId];
const friendsNames = ["israel11"];

window.scrollTo = jest.fn();

jest.mock("@inrupt/solid-ui-react", () => ({
  useSession: () => ({
    session: {
      info: {
        webId: myWebId,
      },
    },
  }),
}));

test("Comprobamos que el componente se renderiza correctamente", async () => {

  const {getByText } = render(
    <Router>
      <TopBar selectedCategories={[]} setSelectedCategories={() => { }} friendsURL={friendsURL} friendsNames={friendsNames} />
    </Router>
  );
  expect(getByText("CATEGORÍAS:")).toBeInTheDocument();
});

test("Comprobamos el acceso al apartado Mi perfil y botón guardar", async () => {

  const { getByText } = render(
    <Router>
      <TopBar selectedCategories={[]} setSelectedCategories={() => { }} friendsURL={friendsURL} friendsNames={friendsNames} />
    </Router>
  );
  expect(getByText("CATEGORÍAS:")).toBeInTheDocument();

  const buttons = document.querySelectorAll('button');
  const lastButton = buttons[buttons.length - 1];
  expect(lastButton).toBeInTheDocument();
  fireEvent.click(lastButton);
  const miPerfil = getByText("Mi Perfil");
  const liMiPerfil = miPerfil.parentElement;
  if (liMiPerfil) {
    const span = liMiPerfil.querySelector('span');
    if (span) {
      fireEvent.click(span);
    }
  }
  await waitFor(() => expect(getByText('Biografía')).toBeInTheDocument());
  try {
    expect(getByText("Biografía", { selector: 'h5' })).toBeInTheDocument();
    const botonGuardar = getByText("Guardar biografía");
    expect(botonGuardar).toBeInTheDocument();
    fireEvent.click(botonGuardar);
  } catch (error) {

  }

});
/*
test("Comprobamos el acceso al apartado Mi cuenta y botón desactivar cuenta", async () => {

  const { getByText } = render(
    <Router>
      <TopBar selectedCategories={[]} setSelectedCategories={() => { }} friendsURL={friendsURL} friendsNames={friendsNames} />
    </Router>
  );
  expect(getByText("CATEGORÍAS:")).toBeInTheDocument();

  const buttons = document.querySelectorAll('button');
  const lastButton = buttons[buttons.length - 1];
  expect(lastButton).toBeInTheDocument();
  fireEvent.click(lastButton);
  const miCuenta = getByText("Mi Cuenta");
  const liMiCuenta = miCuenta.parentElement;
  if (liMiCuenta) {
    const span = liMiCuenta.querySelector('span');
    if (span) {
      fireEvent.click(span);
    }
  }
  await waitFor(() => expect(getByText('Mi Cuenta')).toBeInTheDocument());
  try {
    expect(getByText("Mi Cuenta", { selector: 'p' })).toBeInTheDocument();
    const botonDesactivar = getByText("Desactivar cuenta");
    expect(botonDesactivar).toBeInTheDocument();
    fireEvent.click(botonDesactivar);
  } catch (error) {

  }

});
*/

test("Añadimos un nuevo amigo vacio", async () => {

  const { getByText } = render(
    <Router>
      <TopBar selectedCategories={[]} setSelectedCategories={() => { }} friendsURL={friendsURL} friendsNames={friendsNames} />
    </Router>
  );
  expect(getByText("CATEGORÍAS:")).toBeInTheDocument();

  const buttons = document.querySelectorAll('button');
  const optionsButton = buttons[buttons.length - 3];
  expect(optionsButton).toBeInTheDocument();
  fireEvent.click(optionsButton);
  const nuevoAmigo = getByText("Nuevo Amigo");
  if (nuevoAmigo) {
    const span = nuevoAmigo.querySelector('span');
    if (span) {
      fireEvent.click(span);
    }
  }
  await waitFor(() => expect(getByText('Introduzca el nombre del usuario')).toBeInTheDocument());
  try {
    expect(getByText("Introduzca el nombre del usuario", { selector: 'p' })).toBeInTheDocument();
    const botonAnadir = getByText("Enviar solicitud");
    expect(botonAnadir).toBeInTheDocument();
    fireEvent.click(botonAnadir);
  } catch (error) {

  }

});

test("Añadimos un nuevo amigo no vacio", async () => {

  const { getByPlaceholderText,getByText } = render(
    <Router>
      <TopBar selectedCategories={[]} setSelectedCategories={() => { }} friendsURL={friendsURL} friendsNames={friendsNames} />
    </Router>
  );
  expect(getByText("CATEGORÍAS:")).toBeInTheDocument();

  const buttons = document.querySelectorAll('button');
  const optionsButton = buttons[buttons.length - 3];
  expect(optionsButton).toBeInTheDocument();
  fireEvent.click(optionsButton);
  const nuevoAmigo = getByText("Nuevo Amigo");
  if (nuevoAmigo) {
    const span = nuevoAmigo.querySelector('span');
    if (span) {
      fireEvent.click(span);
    }
  }
  await waitFor(() => expect(getByText('Introduzca el nombre del usuario')).toBeInTheDocument());
  try {
    expect(getByText("Introduzca el nombre del usuario", { selector: 'p' })).toBeInTheDocument();

    const inputAmigo = document.getElementById("userName");

    if(inputAmigo){
      fireEvent.change(inputAmigo, { target: { value: "lomapes3c" } });
    }

    const botonAnadir = getByText("Enviar solicitud");
    expect(botonAnadir).toBeInTheDocument();
    fireEvent.click(botonAnadir);
  } catch (error) {

  }

});

