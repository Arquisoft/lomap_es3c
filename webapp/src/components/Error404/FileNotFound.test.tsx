import { fireEvent, render } from "@testing-library/react";
import FileNotFound from "./FileNotFound";
import { BrowserRouter as Router } from "react-router-dom";

test("Comprobamos que el componente se renderiza correctamente", async () => {


    
    const { getByText } = render(
        <Router>
            <FileNotFound></FileNotFound>
        </Router>

    );

    expect(getByText("Error 404", { selector: 'h1' })).toBeInTheDocument();
    expect(getByText("Lo siento, la página que buscas no existe.", { selector: 'p' })).toBeInTheDocument();
    expect(getByText("Página principal", { selector: 'button' })).toBeInTheDocument();
    fireEvent.click(getByText('Página principal'));
    expect(window.location.pathname).toBe('/index');
});