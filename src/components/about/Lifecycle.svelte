<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';

	interface Drink {
		strDrink: String;
		strDrinkThumb: string;
	}

	onMount(async () => {
		console.log('ON MOUNT');
	});

	afterUpdate(() => {
		console.log('AFTER UPDATED');
	});

	async function getDrinks(): Promise<{ drinks: Drink[] }> {
		return fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon').then(
			(response) => {
				const result = response.json();
				return result;
			}
		);
	}

	let testPromise = getDrinks();
</script>

<h2>
	svelte 에서 비동기를 처리하는 방법은 여러가지가 있습니다만, html 안에서도 svelte 문법을 사용해서
	처리가 가능합니다.
</h2>

{#await testPromise}
	<div>Loading alcohols...</div>
{:then alcohols}
	<div>alcohols</div>
	{#each alcohols.drinks as alcohol (alcohol)}
		<span>{alcohol.strDrink}</span>
	{/each}
{:catch error}
	<div>Error occured: {error}</div>
{/await}

<style>
	h2 {
		font-size: 20px;
		font-weight: bold;
	}
</style>
