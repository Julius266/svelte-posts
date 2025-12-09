<script>
	import axios from 'axios';
	import sesion from '../../../sesion';
	import InputCustom from '../../../componentes/InputCustom.svelte';
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Menu from '../../../componentes/Menu.svelte';

	onMount(() => {
		sesion.session();
		getPost();
	});

	export let params = {};
	let id = params.id;
	let post = {};

	function getPost() {
		axios.get('https://anthropomorphically-innless-trent.ngrok-free.dev/sveltephp/posts/post.php?id=' + id).then((res) => {
			post = res.data;
		});
	}

	function editar() {
		const form = document.getElementById('formEditar');
		axios
			.post('https://anthropomorphically-innless-trent.ngrok-free.dev/sveltephp/posts/editarPost.php', new FormData(form))
			.then((res) => {
				if (res.data == 'success') {
					Swal.fire('Muy bien', 'Tu post fue editado', 'success');
					goto('/');
				} else {
					Swal.fire('Error', 'Tu post no fue editado', 'error');
					goto('/');
				}
			});
	}

	function eliminar() {
		Swal.fire({
			title: 'Estás seguro?',
			text: 'Esta acción no se puede dehacer',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, bórralo.'
		}).then((result) => {
			if (result.value) {
				axios.post('https://anthropomorphically-innless-trent.ngrok-free.dev/sveltephp/posts/eliminar.php?id=' + id).then((res) => {
					Swal.fire({
						title: 'Borrado!',
						text: 'Tu post ha sido borrado',
						icon: 'success'
					});
					goto('/');
				});
			}
		});
	}
</script>

<Menu />

<div class="container">
	<h1>Editar</h1>
	<form on:submit|preventDefault={editar} id="formEditar" autocomplete="off">
		<input type="hidden" name="id" bind:value={id} />

		<InputCustom tipo="editar" name="titulo" icon="title" value={post.titulo} />

		<InputCustom tipo="editar" name="post" icon="comment" value={post.post} />

		<button class="btn blue" type="submit">Editar post</button>
	</form>

	<hr />
	<button class="btn red" on:click={eliminar}>Eliminar Post</button>
</div>
