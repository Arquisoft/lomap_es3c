import { fireEvent, render } from "@testing-library/react";
import PointViewDrawer from "./PointViewDrawer";
import { MarkerInfo } from "../Map";
import { Session } from "@inrupt/solid-client-authn-browser";

const marker: MarkerInfo = {
  authorWebId: "https://israel11.inrupt.net",
  name: "Punto de prueba",
  description: "Descripcion",
  categoria: "shop",
  images: ["https://res.cloudinary.com/demo/image/upload/v1682613175/docs_uploading_example/descarga_2_uj6thp.png"],
  review: [{
    "@type": "Review",
    "author": {
      "@type": "Person",
      "identifier": "https://israel11.inrupt.net"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": 5
    },
    "datePublished": Date.now(),
    "reviewBody": "Me gusta el sitio",
  }],
  coords: [2, 3]
}

/*
test("Comprobamos que el drawer se renderiza correctamente", async () => {

  let opened=true;

  const { getByText } = render(
    <PointViewDrawer session={{} as Session} opened={opened} toggleDrawer={() =>{}} marker={marker} map={"Mapa de prueba"}></PointViewDrawer>
  );

  expect(getByText("Nombre: Punto de prueba", { selector: 'h2' })).toBeInTheDocument();
  expect(getByText("Categoria: Tienda", { selector: 'h3' })).toBeInTheDocument();
  expect(getByText("Coordenadas", { selector: 'h3' })).toBeInTheDocument();
  expect(getByText("Latitud: 2", { selector: 'li' })).toBeInTheDocument();
  expect(getByText("Longitud: 3", { selector: 'li' })).toBeInTheDocument();
  expect(getByText("https://israel11.inrupt.net", { selector: 'h4' })).toBeInTheDocument();
  expect(getByText("Rating: 5", { selector: 'p' })).toBeInTheDocument();
  expect(getByText("Me gusta el sitio", { selector: 'p' })).toBeInTheDocument();
  expect(getByText("Añadir Valoración")).toBeInTheDocument();
});
*/