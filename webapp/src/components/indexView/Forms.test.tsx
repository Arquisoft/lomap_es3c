import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Forms } from "./Forms";

test("Comprobamos que el componente se renderiza correctamente", async () => {

    render(
        <Forms index={0} setIndex={()=>{}}></Forms>

    );
});