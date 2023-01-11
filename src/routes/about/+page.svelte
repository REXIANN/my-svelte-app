<script lang="ts">
	import Counter from '$components/about/Counter.svelte';
	import Parent from '$components/about/Parent.svelte';
	import Reactivity from '$components/about/Reactivity.svelte';
	import Assignment from '$components/about/Assignment.svelte';
	import Lifecycle from '$components/about/Lifecycle.svelte';

	let count = 0;
	const increase = () => {
		count++;
	};

	const decrease = () => {
		count -= 1;
	};
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<h2>Svlete 가 변수를 사용하는 방법</h2>
	<div>Svelte 가 변수를 사용하는 방법은 간단합니다.</div>
	<div>setCount 와 같은 세터 함수가 필요 없이 그냥 변수를 직접 변경할 수 있습니다.</div>
	<div><pre>() => count += 1</pre></div>
	<div>현재값: {count}</div>
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
	<Counter {increase} {count} {decrease} />
</div>
<hr />
<Parent />
<hr />
<Reactivity />
<hr />
<Assignment />
<hr />
<Lifecycle />

<style>
	hr {
		margin: 200px 0;
		width: 100%;
		border: 2px solid black;
	}

	h2 {
		font-size: 24px;
		font-weight: bold;
	}

	div {
		font-size: 18px;
		line-height: 2;
	}
</style>
