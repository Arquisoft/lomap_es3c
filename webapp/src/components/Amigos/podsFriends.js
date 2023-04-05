import { useSession } from "@inrupt/solid-ui-react";

export const useFriendsList = () => {
  const { session } = useSession();
  console.log(session);
  if (session) {
    console.log("hola2")
    if (session.info.isLoggedIn) {
      console.log(session.info.webId);

      //const resourceUrl = new URL("card#me/friends.ttl", session.info.webId).href;
      //console.log(resourceUrl);
      
      
    }
  } else {
    console.log("error")
  }
  return ["amigos"];
};
