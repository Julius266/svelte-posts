<script>
    import axios from "axios";
    import { token } from "../store";
    import { goto } from '$app/navigation';

    function salir() {
        const tokenphp = JSON.parse(localStorage.getItem("token"));
        axios
            .post(
                "http://44.222.110.244/sveltephp/login/salir.php?token=" + tokenphp,
            )
            .then((res) => {
                if (res.data == "success") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user")
                    localStorage.removeItem("foto")
                    goto("/");
                }
            });
    }
</script>

<nav class="red">
    <div class="nav-wrapper">
        <a href="/" class="brand-logo">Crud Svelte - PHP</a>
        {#if $token === 1}
            <ul class="right hide-on-med-and-down">
                <li><a href="/Inicio" >Inicio</a></li>
                <li><a href="/Guardar" >Guardar</a></li>
                <li><a href="/" on:click={salir}>Salir</a></li>
                <!--<li><button on:click={salir} class="as-link">Salir</button></li>-->
            </ul>
        {/if}
    </div>
</nav>


