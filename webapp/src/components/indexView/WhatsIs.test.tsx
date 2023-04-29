import { render } from "@testing-library/react";
import { WhatIs } from "./WhatIs";

test("Comprobamos que el componente se renderiza correctamente", async () => {

    const { getByText } = render(
        <WhatIs/>
      );
    expect(getByText("¿Qué es LoMap?")).toBeInTheDocument();
    expect(getByText("es una aplicación de mapas personalizados.")).toBeInTheDocument();
    expect(getByText("De esta manera, tendrás tus rincones más especiales, a un simple click.")).toBeInTheDocument();
    expect(getByText("\"Donde fuiste tan feliz, siempre regresarás\"")).toBeInTheDocument();
});