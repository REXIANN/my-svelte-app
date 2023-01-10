import { writable } from 'svelte/store';

export type CountSlice = {
	name: string;
	age: number;
	count: number | null;
};

const defaultCount: CountSlice = {
	name: 'kim',
	age: 32,
	count: 0
};

export let count = writable<CountSlice>(defaultCount);
