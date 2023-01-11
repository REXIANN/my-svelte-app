import { elasticOut } from 'svelte/easing';

export default function spin() {
	return {
		duration: 8000,
		css: (t: number) => {
			// t -> 0 과 1 사이의 값. Opcaity
			const eased = elasticOut(t);

			return `
        transform: scale(${eased}) rotate(${eased * 1080})deg;
        color: hsl(
          ${~~(t * 360)},
          ${Math.min(100, 1000 - 1000 * t)}%,
          ${Math.min(50, 500 - 500 * t)}%
        );
      `;
		}
	};
}
