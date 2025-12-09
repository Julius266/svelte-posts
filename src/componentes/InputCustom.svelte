<script>
    export let value = "";
    export let type = "text";
    export let name;
    export let icon;
    export let id="";
    export let label="";
    export let tipo = "normal";
</script>

<div class="input-field">
    {#if tipo == "normal"}
        <i class="material-icons prefix">{icon}</i>
        <input {type} {name} {id} required {value} on:input />
        <label for={id}>{label}</label>
    {:else if tipo == "editar"}
        <i class="material-icons prefix">{icon}</i>
        <input {type} {name} required {value} on:input />
    {/if}
</div>
