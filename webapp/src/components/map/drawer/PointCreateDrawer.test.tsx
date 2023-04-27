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

    //Check that the shopping cart title is rendered
    expect(getByText("Añade un lugar")).toBeInTheDocument();
    //Check that the buttons continue shopping and checkout are rendered
    expect(getByText("Nombre")).toBeInTheDocument();
    expect(getByText("Categoria")).toBeInTheDocument();
    expect(getByText("Descripción")).toBeInTheDocument();
    expect(getByText("Subir")).toBeInTheDocument();

    //Check that the total price is rendered
    expect(getByText("AÑADIR LUGAR")).toBeInTheDocument();

    expect(window.location.pathname).toBe("/home");
});