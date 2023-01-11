<script lang="ts">
	let target = 1;

	$: double = target * 2;
	$: square = target * target;
	$: pi = target * 3.14;

	$: console.log('변경!!'); // This doesn't work
	$: console.log('변경!!', target);

	$: if (target > 10) {
		alert('변수가 너무 크네요');
		target = 0;
	}
</script>

<div>이번에는 해당 변수를 증가시키거나 감소시키면서 반응형 값들을 알아보죠</div>
<div>원래 변수는 {target} 이겁니다.</div>

<div>
	<button on:click={() => (target += 1)}>🔼</button>
	<button on:click={() => (target -= 1)}>🔽</button>
</div>
<br />
<div>두배가 되는 double: {double}</div>
<div>제곱이 되는 square: {square}</div>
<div>지름을 구하는 PI 값: {pi}</div>
<br />
<div>반응형은 사실 변수로만 나타나지 않습니다.</div>
<div>콘솔창을 한번 열어볼까요?</div>

<style>
	div {
		font-size: 20px;
		line-height: 2;
	}
</style>
