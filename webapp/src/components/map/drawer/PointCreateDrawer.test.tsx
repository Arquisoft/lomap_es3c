import { render } from "@testing-library/react";
import PlaceDrawer from "./PointCreateDrawer";

test("Comprobamos que el drawer se renderiza correctamente", async () => {

    const { getByText } = render(
        <PlaceDrawer
          opened={true}
          onSubmit={() => {}}
          toggleDrawer={() => {}}
        />
      );

    expect(getByText("Añade un lugar")).toBeInTheDocument();
    expect(getByText("Nombre", { selector: 'label' })).toBeInTheDocument();
    expect(getByText("Nombre", { selector: 'strong' })).toBeInTheDocument();
    expect(getByText("Categoria",{ selector: 'strong' })).toBeInTheDocument();
    expect(getByText("Descripción",{ selector: 'strong' })).toBeInTheDocument();
    expect(getByText("Subir imágenes",{ selector: 'strong' })).toBeInTheDocument();
    expect(getByText("Añadir lugar")).toBeInTheDocument();
});