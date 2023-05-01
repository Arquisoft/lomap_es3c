import { Session } from "@inrupt/solid-client-authn-browser";
import Swal from "sweetalert2";
import { getFriendsFromPod, getFriendsNamesFromPod } from "../solid/podsFriends";

export function showLoadingDialogHelper(session:Session,navigate:any,loadFriends:any){
    if (!session.info.isLoggedIn) {
        navigate('/');
        Swal.close();
        Swal.fire({
            title: '¡ALTO AHÍ!',
            icon: 'error',
            text: 'Intentar acceder ilícitamente a un sitio web está feo',
            timer: 5000,
            showConfirmButton: false
        });
    } else {
        loadFriends();
        Swal.fire({
            title: 'Cargando...',
            text: 'Espere un instante mientras preparamos todo',
            timer: 5000,
            timerProgressBar: true,
            allowOutsideClick: false,
            showConfirmButton: false
        });
    }
}

export async function loadFriendsHelper(session:Session,setFriendsURL:any,setFriendsNames:any) {
    const friendsURLResult = await getFriendsFromPod(session);
    setFriendsURL(friendsURLResult);
    const friendsNamesResult = await getFriendsNamesFromPod(friendsURLResult);
    setFriendsNames(friendsNamesResult);
  }