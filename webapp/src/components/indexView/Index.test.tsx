import { render } from "@testing-library/react";
import { Index } from "./Index";

test("Comprobamos que el componente se renderiza correctamente", async () => {

    render(
        <Index></Index>
    );
    expect(window.location.pathname).toBe('/');
});