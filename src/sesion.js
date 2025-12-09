import { token } from "./store";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";


const sesion = {
    session: function () {

        if (!browser) return;
        
        const ls = localStorage.getItem("token")

        if (ls != null) {
            token.set(1)
        } else {
            // eslint-disable-next-line svelte/no-navigation-without-resolve
            goto('/')
        }

    }
}

export default sesion