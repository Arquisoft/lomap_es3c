import { Session } from "@inrupt/solid-client-authn-browser";
import Swal from "sweetalert2";
import { getFriendsFromPod, getFriendsNamesFromPod } from "../solid/podsFriends";

export function showLoadingDialogHelper(session:Session,navigate:any,loadFriends:any){
    console.log("session");
    console.log(session);
    let loadingTimer: NodeJS.Timeout;
    let sessionTimer: NodeJS.Timeout;
  
    Swal.fire({
      title: 'Cargando...',
      text: 'Espere un instante mientras preparamos todo',
      timer: 12000,
      allowOutsideClick: false,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        // Comprobar cada segundo si el objeto session tiene valor
        sessionTimer = setInterval(() => {
          console.log(session);
          console.log(session.info.isLoggedIn);
          if (session.info.isLoggedIn) {
            console.log("Entro en logged in");
            // Si el objeto session tiene valor, detener los temporizadores
            clearInterval(loadingTimer);
            clearInterval(sessionTimer);

            loadFriends().then(() => {
              console.log("Entro en load friends");
              setTimeout(() => {
                // Mostrar el diálogo de carga completa y ejecutar la función loadFriends
                Swal.close()
                Swal.fire({
                  title: '¡Listo!',
                  text: 'Todo está preparado',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false,
                  allowOutsideClick: false
                });
              }, 1000)
            });
          }
        }, 1000);
      },
      willClose: () => {
        // Si el diálogo se cierra, detener los temporizadores
        clearInterval(loadingTimer);
        clearInterval(sessionTimer);

        if(!session.info.isLoggedIn) {
          navigate('/');
          Swal.fire({
            title: 'Ha ocurrido un error',
            icon: 'error',
            text: 'No se ha podido realizar la autenticación correctamente',
            timer: 3000,
            showConfirmButton: false
          })
        }
      }
    });
}

export async function loadFriendsHelper(session:Session,setFriendsURL:any,setFriendsNames:any) {
    const friendsURLResult = await getFriendsFromPod(session);
    setFriendsURL(friendsURLResult);
    const friendsNamesResult = await getFriendsNamesFromPod(friendsURLResult);
    setFriendsNames(friendsNamesResult);
  }