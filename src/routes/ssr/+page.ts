import type { PageLoadEvent } from './$types';

import type { Product } from './types';

export async function load({ fetch }: PageLoadEvent) {
	const response = await fetch('https://dummyjson.com/products/1');
	const result = await response.json();

	return result satisfies Product;
}
