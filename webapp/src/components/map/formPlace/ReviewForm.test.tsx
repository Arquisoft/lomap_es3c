import { fireEvent, render } from "@testing-library/react";
import ReviewForm from "./ReviewForm";
import { Session } from "@inrupt/solid-client-authn-browser/dist/Session";


test("Comprobamos que el componente se renderiza correctamente", async () => {

    let session = new Session();
    session.info.webId="https://israel11.inrupt.net";
    session.info.isLoggedIn=true;
    
    const { getByText } = render(
        <ReviewForm reviews={[{
            "@type": "Review",
            "author": {
              "@type": "Person",
              "identifier": "https://israel11.inrupt.net"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": 5
            },
            "datePublished": 1682868607069,
            "reviewBody": "Me gusta el sitio",
          }]} handleSubmit={()=>{}} session={session}></ReviewForm>
    );

    expect(getByText("Comentarios", { selector: 'strong' })).toBeInTheDocument();
    expect(getByText("Puntuación")).toBeInTheDocument();
    let button = getByText("Confirmar", { selector: 'button' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);    
});