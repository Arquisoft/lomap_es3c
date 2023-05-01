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
        await renderAndCheck();
    });

});

async function renderAndCheck() {
    const { getByText } = render(
        <Router>
            <Home></Home>
        </Router>
    );

    return getByText
}