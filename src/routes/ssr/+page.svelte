<script lang="ts">
	import type { Product } from './types';

	export let data: {
		products: Product[];
		total: number;
		skip?: number;
		limit?: 30;
	};
</script>

<h1>SSR works like this</h1>

{#each data.products as { id, title, description, price, images } (id)}
	<div>{title}</div>
	<div>{description}</div>
	<div>{price}</div>
	<img alt="product" src={images[0]} />
{/each}

<style>
	img {
		width: 200px;
		aspect-ratio: auto;
		margin-bottom: 30px;
	}
</style>
