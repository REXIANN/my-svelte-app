import { writable, readable } from 'svelte/store';

export type CountSlice = {
	count: number;
};

const defaultCount: CountSlice = {
	count: 0
};

export let count = writable<CountSlice>(defaultCount);

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});