<script>
	export let fotoInput = null;
</script>

<div class="file-field input-field">
	<div class="btn">
		<span>Foto</span>
		<input type="file" name="foto" bind:this={fotoInput} required />
	</div>
	<div class="file-path-wrapper">
		<input class="file-path validate" type="text" />
	</div>
</div>