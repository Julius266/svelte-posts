<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import sesion from '../../sesion';
	import Menu from '../../componentes/Menu.svelte';

	onMount(() => {
		sesion.session();
		getUser();
	});
	//const token= localStorage.getItem('token')

	let usuario = '';
	function getUser() {
		const token = JSON.parse(localStorage.getItem('token'));
		axios.post('http://44.222.110.244/sveltephp/posts/user.php?token=' + token).then((res) => {
			usuario = res.data.user;
			localStorage.setItem('user', JSON.stringify(res.data.user));
			localStorage.setItem('foto', JSON.stringify(res.data.foto));
		});
	}

	//onMount(getUser);

	let posts = [];
	let promesa;

	onMount(() => {
		promesa = ajax();
	});

	async function ajax() {
		const res = await fetch('http://44.222.110.244/sveltephp/posts/posts.php');
		posts = await res.json();
		if (res.ok) {
			return posts;
		} else {
			throw new Error('No hay conexión con la API');
		}
	}
</script>

<Menu />

<div class="container">
	<h1>Bienvenido {usuario}</h1>

	{#await promesa}
		<p>Cargando...</p>
	{:then value}
		{#each posts as item}
			<div class="row">
				<div class="col s1">
					<img src={item.foto} alt="" width="50" height="50" />
				</div>
				<div class="col s11">
					<b>{item.usuario}</b>
					<h5>
						{item.titulo}
						{#if item.usuario == usuario}
							<a href="/Editar/{item.id}"><i class="material-icons">edit</i></a>
							<!--<a href="/Editar"><i class="material-icons">edit</i></a>-->
						{/if}
					</h5>
					<p>{item.post}</p>
					<hr />
				</div>
			</div>
		{:else}
			<h3>No hay datos en la base</h3>
		{/each}
	{:catch error}
		<p style="color:red">{error}</p>
	{/await}
</div>
