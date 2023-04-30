import { render, waitFor } from "@testing-library/react";
import { Home } from "./Home";
import { BrowserRouter as Router } from "react-router-dom";

const myWebId = "https://israel11.inrupt.net/profile/card#me"

jest.mock("@inrupt/solid-client-authn-browser", () => ({
    getDefaultSession: () => ({
        info: {
            webId: myWebId,
            isLoggedIn: true,
        },
    }),
    handleIncomingRedirect: jest.fn()
}));

describe('Home', () => {
    test("Comprobamos que el componente se renderiza correctamente", async () => {
        let getByText = await renderAndCheck();
    });

    /*
    test("Comprobamos que aparece el aviso al no estar logeado", async () => {
        let getByText = await renderAndCheck();

        await waitFor(() => expect(getByText("Intentar acceder ilícitamente a un sitio web está feo")).toBeInTheDocument());
    });
    */

});

async function renderAndCheck() {
    const { getByText } = render(
        <Router>
            <Home></Home>
        </Router>
    );

    return getByText
}