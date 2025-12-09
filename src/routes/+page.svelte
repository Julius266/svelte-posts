<script>
	import Menu from '../componentes/Menu.svelte';
	import InputCustom from '../componentes/InputCustom.svelte';
	import axios from 'axios';
	import Swal from 'sweetalert2';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

/* 	const ls = localStorage.getItem('token');
	$: if (ls != null) {
		goto('/Inicio');
	} */

	onMount(() => {
		const ls = localStorage.getItem('token');
		if (ls != null) {
			goto('/Inicio');
		}
	});

	function login() {
		const form = document.getElementById('loginForm');
		axios.post('https://anthropomorphically-innless-trent.ngrok-free.dev/sveltephp/login/login.php', new FormData(form)).then((res) => {
			if (res.data.res === 'success') {
				localStorage.setItem('token', JSON.stringify(res.data.token));
				goto('/Inicio');
			} else {
				localStorage.removeItem('token');
				localStorage.clear();
				Swal.fire('Error', 'Acceso fallido', 'error');
			}
		});
	}
</script>

<Menu />

<div class="container">
	<h1>Login</h1>
	<form on:submit|preventDefault={login} id="loginForm" autocomplete="off">
		<InputCustom type="email" id="email" name="email" label="E-mail" icon="account_circle" />
		<InputCustom type="password" id="pass" name="pass" label="Password" icon="https" />

		<button type="submit" class="btn green">Entrar</button>
		<a href="/Registro" class="btn blue">Registro</a>
	</form>
</div>
