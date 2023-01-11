<script lang="ts">
	import rexian from '$lib/images/memoji.png';

	import { fly, fade, slide } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	let visible1: boolean = false;
	let visible2: boolean = false;
	let visible3: boolean = false;

	const options = { duration: 2000, easing: backInOut, times: 2 };

	function spin(node, options) {
		const { times } = options;
		return {
			...options,
			css(t: number) {
				const degrees = 360 * times;
				return `transform: scale(${t}) rotate(${t * degrees}deg);`;
			}
		};
	}

	// CSS 애니메이션은 메인 스레드에서 분리되어 실행되므로 더욱 효과적!
</script>

<div class="header">
	Svelte 는 다양한 CSS 애니메이션 라이브러리를 가지고 있습니다.
	<br />
	번들 사이즈를 줄이기 위해 보통 이런 부가적인 기능들은 탑재되지 않습니다. 대부분 별도의 라이브러리를
	사용하죠
	<br />
	하지만 Svelte 는 컴파일 시 실행되지 않는 css 들은 모두 빼버리기 때문에 번들사이즈에 걱정할 필요가 없습니다.
	<br />
	그리고 CSS 애니메이션은 메인스레드가 아닌 다른 스레드가 생성되어 실행되기 때문에
	<u>어플리케이션의 실행 속도에 영향을 주지 않습니다</u>.
</div>

<h2>여기 귀여운 이모지가 있습니다...</h2>

<label>
	<input type="checkbox" bind:checked={visible1} />
	이모지 보기
</label>

<div class="img-container">
	{#if visible1}
		<img
			id="visible-1"
			width="300"
			height="300"
			src={rexian}
			alt="rexian's face"
			transition:fly={{ y: 350 }}
		/>
	{/if}
</div>

<h2>
	CSS 함수를 직접 작성할 수도 있습니다. JS 파일은 CSS 애니메이션으로 컴파일 되어서 저장됩니다.
	<br />
	사용하지 않는다면? 마찬가지로 컴파일 시에 사라지죠
</h2>

<label>
	<input type="checkbox" bind:checked={visible2} />
	이모지 보기
</label>

<div class="img-container">
	{#if visible2}
		<img width="300" height="300" src={rexian} alt="rexian's face" transition:spin={options} />
	{/if}
</div>

<h2>뾰로롱</h2>

<label>
	<input type="checkbox" bind:checked={visible3} />
	이모지 보기
</label>

<div class="img-container">
	{#if visible3}
		<img
			width="300"
			height="300"
			src={rexian}
			alt="rexian's face"
			in:slide={{ duration: 3000 }}
			out:fade
		/>
	{/if}
</div>

<style>
	.this-is-not-used {
		font-size: 111px;
		font-weight: 800;
		display: grid;
		grid-template-columns: minmax(1fr, 100%);
	}

	h2 {
		font-size: 20px;
		font-weight: bold;
		text-align: center;
	}

	.header {
		margin: 50px 0;
		font-size: 18px;
		font-weight: bold;
		line-height: 1.8;
	}

	.img-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 500px;
	}

	#visible-1 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
