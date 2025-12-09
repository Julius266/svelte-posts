<script>
	import axios from 'axios';
	import sesion from '../../sesion';
	import InputCustom from '../../componentes/InputCustom.svelte';
	import Swal from 'sweetalert2';
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import Menu from '../../componentes/Menu.svelte';

	let user = '';
	let foto = '';

	onMount(() => {
		sesion.session();
		user = JSON.parse(localStorage.getItem('user'));
		foto = JSON.parse(localStorage.getItem('foto'));
	});

	function guardar() {
		const form = document.getElementById('formGuardar');
		axios.post('https://anthropomorphically-innless-trent.ngrok-free.dev/sveltephp/posts/altaPost.php', new FormData(form)).then((res) => {
			if (res.data == 'success') {
				Swal.fire('Muy bien', 'Tu post fue guardado', 'success');
				goto('/');
			} else {
				Swal.fire('Error', 'Tu post no fue guardado', 'error');
				goto('/');
			}
		});
	}
</script>

<Menu />

<div class="container">
	<h1>Guardar</h1>
	<form on:submit|preventDefault={guardar} id="formGuardar" autocomplete="off">
		<input type="hidden" name="usuario" bind:value={user} />
		<input type="hidden" name="foto" bind:value={foto} />

		<InputCustom id="titulo" name="titulo" label="Título del post" icon="title" />

		<InputCustom id="post" name="post" label="Escribe el post" icon="comment" />

		<button class="btn blue" type="submit">Guardar post</button>
	</form>
</div>
