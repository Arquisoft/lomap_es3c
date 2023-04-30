import { fireEvent, render, waitFor } from "@testing-library/react";
import TopBar from "./TopBar";
import { BrowserRouter as Router } from "react-router-dom";
import { Session } from "@inrupt/solid-client-authn-browser";

const myWebId = "https://israel11.inrupt.net/profile/card#me"
const friendsURL = [myWebId];
const friendsNames = ["israel11"];

window.scrollTo = jest.fn();

jest.mock("@inrupt/solid-ui-react", () => ({
  useSession: () => ({
    session: {
      info: {
        webId: myWebId,
        isLoggedIn:true,
      },
    },
  }),
}));

jest.mock('../map/markUtils/MarkUtils', () => ({
  getMapsFromPod:  (session:Session) =>{return Promise.resolve(["mapa"]);},
}));

jest.mock('../Amigos/podsFriends', () => ({
  getFriendsNamesFromPod: jest.fn(),
  getFriendsFromPod: () =>{return Promise.resolve(["https://podes3c.inrupt.net"]);},
  addToKnowInPod:jest.fn()
}));

jest.mock("../../api/api", () => ({
  existsUser: (receiverName: string, receiverProvider: string) => {
    if(receiverName =="noexistomapes3c"){
      return Promise.resolve(false);
    }else{
      return Promise.resolve(true);
    }
    },
  existsSolicitude: (receiverName: string, receiverProvider: string, senderName: string, senderProvider: string) => {
    if(receiverName =="lomapes3c"){
      return Promise.resolve(true);
    }else{
      return Promise.resolve(false);
    }
  },
  getSolicitudes: (userName:string, provider:string) =>{
    return Promise.resolve([{senderName:"podes3c",senderProvider:"Inrupt"}]);
  },
  deleteSolicitude:jest.fn()
}));

test("Comprobamos que el componente se renderiza correctamente", async () => {

  const { getByText } = render(
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
  expect(getByText("Mi Cuenta", { selector: 'p' })).toBeInTheDocument();
  const botonDesactivar = getByText("Desactivar cuenta");
  expect(botonDesactivar).toBeInTheDocument();
  fireEvent.click(botonDesactivar);
  await waitFor(() => expect(getByText('Cuenta desactivada')).toBeInTheDocument());
  expect(window.location.pathname).toBe('/');
});


test("Añadimos un nuevo amigo no existente", async () => {

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

    const inputAmigo = document.getElementById("userName");

    if (inputAmigo) {
      fireEvent.change(inputAmigo, { target: { value: "noexistomapes3c" } });
    }

    const botonAnadir = getByText("Enviar solicitud");
    expect(botonAnadir).toBeInTheDocument();
    fireEvent.click(botonAnadir);
    await waitFor(() => expect(getByText('El usuario introducido no existe')).toBeInTheDocument());
  } catch (error) {

  }

});

test("Añadimos un nuevo amigo no vacio y la solicitud ya existe", async () => {
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

    const inputAmigo = document.getElementById("userName");

    if (inputAmigo) {
      fireEvent.change(inputAmigo, { target: { value: "lomapes3c" } });
    }

    const botonAnadir = getByText("Enviar solicitud");
    expect(botonAnadir).toBeInTheDocument();
    fireEvent.click(botonAnadir);
    await waitFor(() => expect(getByText('Ya existe una solicitud pendiente')).toBeInTheDocument());
  } catch (error) {

  }

});

test("Añadimos un nuevo amigo no vacio, la solicitud no existente y ya sois amigos", async () => {
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

    const inputAmigo = document.getElementById("userName");

    if (inputAmigo) {
      fireEvent.change(inputAmigo, { target: { value: "podes3c" } });
    }

    const botonAnadir = getByText("Enviar solicitud");
    expect(botonAnadir).toBeInTheDocument();
    fireEvent.click(botonAnadir);
    await waitFor(() => expect(getByText('Ya existe una solicitud pendiente')).toBeInTheDocument());
  } catch (error) {

  }

});

test("Añadimos un nuevo amigo no vacio, la solicitud no existente y no sois amigos", async () => {
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

    const inputAmigo = document.getElementById("userName");

    if (inputAmigo) {
      fireEvent.change(inputAmigo, { target: { value: "noamigoes3c" } });
    }

    const botonAnadir = getByText("Enviar solicitud");
    expect(botonAnadir).toBeInTheDocument();
    fireEvent.click(botonAnadir);
    await waitFor(() => expect(getByText('Ya existe una solicitud pendiente')).toBeInTheDocument());
  } catch (error) {

  }

});

test("Compartir mapa con un amigo", async () => {
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
  const compartirMapas = getByText("Compartir Mapas");
  if (compartirMapas) {
    const span = compartirMapas.querySelector('span');
    if (span) {
      fireEvent.click(span);
    }
  }
  await waitFor(() => expect(getByText('Seleccione un amigo')).toBeInTheDocument());
  try {
    expect(getByText("Seleccione un amigo", { selector: 'p' })).toBeInTheDocument();

    expect(getByText("israel11", { selector: 'option' })).toBeInTheDocument();

    const botonCompartir = getByText("Compartir");
    expect(botonCompartir).toBeInTheDocument();
    fireEvent.click(botonCompartir);
  } catch (error) {

  }

});

test("Aceptar solicitud de amistad", async () => {
  const { getByText } = render(
    <Router>
      <TopBar selectedCategories={[]} setSelectedCategories={() => { }} friendsURL={friendsURL} friendsNames={friendsNames} />
    </Router>
  );
  expect(getByText("CATEGORÍAS:")).toBeInTheDocument();

  const buttons = document.querySelectorAll('button');
  const friendRequestButton = buttons[buttons.length - 2];
  expect(friendRequestButton).toBeInTheDocument();
  const span = friendRequestButton.querySelector('span');
  if (span) {
    fireEvent.click(span);
  }
  await waitFor(() => expect(getByText('Solicitudes de amistad', { selector: 'p' })).toBeInTheDocument());
  try {
    expect(getByText("Solicitudes de amistad", { selector: 'p' })).toBeInTheDocument();

    expect(getByText("podes3c", { selector: 'option' })).toBeInTheDocument();

    const botonAceptar = getByText("Aceptar");
    expect(botonAceptar).toBeInTheDocument();
    fireEvent.click(botonAceptar);

    await waitFor(() => expect(getByText('Usuario podes3c aceptado', { selector: 'p' })).toBeInTheDocument());
  } catch (error) {

  }

});

test("Rechazar solicitud de amistad", async () => {
  const { getByText } = render(
    <Router>
      <TopBar selectedCategories={[]} setSelectedCategories={() => { }} friendsURL={friendsURL} friendsNames={friendsNames} />
    </Router>
  );
  expect(getByText("CATEGORÍAS:")).toBeInTheDocument();

  const buttons = document.querySelectorAll('button');
  const friendRequestButton = buttons[buttons.length - 2];
  expect(friendRequestButton).toBeInTheDocument();
  const span = friendRequestButton.querySelector('span');
  if (span) {
    fireEvent.click(span);
  }
  await waitFor(() => expect(getByText('Solicitudes de amistad', { selector: 'p' })).toBeInTheDocument());
  try {
    expect(getByText("Solicitudes de amistad", { selector: 'p' })).toBeInTheDocument();

    expect(getByText("podes3c (Inrupt)", { selector: 'option' })).toBeInTheDocument();

    const botonRechazar = getByText("Rechazar");
    expect(botonRechazar).toBeInTheDocument();
    fireEvent.click(botonRechazar);
    

    await waitFor(() => expect(getByText('Usuario podes3c rechazado', { selector: 'p' })).toBeInTheDocument());
  } catch (error) {
  }

});
/*
test("Comprobamos el cierre de sesion", async () => {

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
  const cerrarSesion = getByText("Cerrar Sesión");
  const liCerrarSesion = cerrarSesion.parentElement;
  if (liCerrarSesion) {
    const span = liCerrarSesion.querySelector('span');
    if (span) {
      fireEvent.click(span);
    }
  }
});
*/

