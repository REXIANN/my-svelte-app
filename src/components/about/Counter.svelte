<script lang="ts">
	export let count: number;
	export let increase: () => void;
	export let decrease: () => void;
</script>

<div class="header">
	와! 그럼 더 이상 handleChange 같은 거 필요 없이 부모 컴포넌트에서 변수를 내려주고 자식
	컴포넌트에서 값을 변경하면 되겠네!!!
</div>
<div>... 라고 생각하면 틀립니다.</div>

<div>여기는 자식 컴포넌트 입니다. {count}</div>

<div>
	<button
		on:click={() => {
			count += 1;
		}}
	>
		자식 컴포넌트가 받아온 카운트 증가시키기</button
	>
	<button
		on:click={() => {
			count -= 1;
		}}
	>
		자식 컴포넌트가 받아온 카운트 감소시키기</button
	>
</div>

<div>
	<button on:click={increase}> 부모컴포넌트로부터 받아온 함수로 카운트 증가시키기</button>
	<button on:click={decrease}> 부모컴포넌트로부터 받아온 함수로 카운트 감소시키기</button>
</div>

<style>
	.header {
		margin-top: 100px;
	}
</style>
