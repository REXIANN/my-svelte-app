<script lang="ts">
	import type { Product } from './types';

	export let data: Product;

	$: description = data.description;
</script>

<h1>SSR works like this</h1>

<div>
	{data.id}
</div>

<div>
	{description}
</div>
