<script>
	import { goto } from '$app/navigation';
	import InputCustom from '../../componentes/InputCustom.svelte';
	import File from '../../componentes/File.svelte';
	import Swal from 'sweetalert2';
	import axios from 'axios';
	import Menu from '../../componentes/Menu.svelte';

	let pass = '';
	let pass2 = '';
	let email = '';
	let show = false;
	let fotoInput = null;

	function registrarse() {
		if (pass == pass2) {
			// Validar que la foto esté seleccionada
			if (!fotoInput || !fotoInput.files || fotoInput.files.length === 0) {
				Swal.fire('Error', 'Debes seleccionar una foto (PNG o JPG)', 'error');
				return;
			}

			const foto = fotoInput.files[0];
			const extensionesValidas = ['image/png', 'image/jpeg'];
			
			if (!extensionesValidas.includes(foto.type)) {
				Swal.fire('Error', 'Solo se aceptan archivos PNG o JPG', 'error');
				return;
			}

			const form = document.getElementById('registroForm');
			axios
				.post('http://44.222.110.244/sveltephp/login/registro.php', new FormData(form))
				.then((res) => {
					console.log('Respuesta:', res);
					if (res.data == 'success') {
						Swal.fire('Correcto', 'Registrado como se debe', 'success');
						goto('/');
					} else {
						Swal.fire('Error', 'Falló el registro: ' + res.data, 'error');
					}
				})
				.catch((err) => {
					console.error('Error en registro:', err);
					Swal.fire('Error', 'Error en la conexión al servidor', 'error');
				});
		} else {
			Swal.fire('Error', 'Las claves no son iguales', 'error');
		}
	}

	function validarEmail(params) {
		if (email != '') {
			const datosEmail = new FormData();
			datosEmail.append('email', email);
			axios.post('http://44.222.110.244/sveltephp/login/validarEmail.php', datosEmail).then((res) => {
				console.log(res);
				if (res.data === 'success') {
					show = true;
				} else {
					show = false;
					Swal.fire('Error', 'El correo ya existe', 'error');
				}
			});
		}
	}
</script>

<Menu />

<div class="container">
	<h1>Registro</h1>
	<form
		on:submit|preventDefault={registrarse}
		id="registroForm"
		autocomplete="off"
		enctype="multipart/form-data"
	>
		<div class="input-field">
			<i class="material-icons prefix">email</i>
			<input
				type="email"
				name="email"
				id="email"
				required
				bind:value={email}
				on:blur={validarEmail}
			/>
			<label for="email">Email</label>
		</div>

		<InputCustom
			type="password"
			id="pass"
			name="pass"
			label="Password"
			icon="https"
			value={pass}
			on:input={(event) => (pass = event.target.value)}
		/>

		<InputCustom
			type="password"
			id="pass2"
			name="pass2"
			label="Verificación de Password"
			icon="https"
			value={pass2}
			on:input={(event) => (pass2 = event.target.value)}
		/>

		<InputCustom id="usuario" name="usuario" label="Nombre de usuario" icon="account_circle" />

		<File bind:fotoInput={fotoInput} />
		{#if show && fotoInput && fotoInput.files && fotoInput.files.length > 0}
			<button type="submit" class="btn green">Registrarse</button>
		{/if}
		<a href="/" class="btn blue">Login</a>
	</form>
</div>
