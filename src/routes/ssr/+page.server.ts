import type { PageServerLoad } from './$types';
import type { Product } from './types';

// server side props in Next.js
export const load = (async () => {
	const data = await getData();
	return data;
}) satisfies PageServerLoad;

async function getData() {
	const response = await fetch('https://dummyjson.com/products');
	return response.json();
}
