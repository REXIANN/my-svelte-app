<script>
	import Parent from '$components/about/Parent.svelte';
	import Reactivity from '$components/about/Reactivity.svelte';
	import Assignment from '$components/about/Assignment.svelte';

	let count = 0;
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<div>Svlete 가 변수를 사용하는 방법</div>
	<div>{count}</div>
	<button
		on:click={() => {
			count += 1;
		}}>증가</button
	>
	<button
		on:click={() => {
			count -= 1;
		}}>감소</button
	>
</div>

<hr />

<Parent />

<hr />

<Reactivity />
<hr />
<Assignment />

<style>
	hr {
		margin: 200px 0;
		width: 100%;
		border: 2px solid black;
	}
</style>
