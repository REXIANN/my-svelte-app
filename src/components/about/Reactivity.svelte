<script lang="ts">
	let target = 1;

	$: double = target * 2;
	$: square = target * target;

	$: console.log('변경!!'); // put target

	$: if (target > 5) {
		alert('변수가 너무 크네요');
		target = 0;
	}
</script>

<div>원래 변수는 {target} 이겁니다.</div>

<div>해당 변수를 증가시키거나 감소시키면서 반응형 값들을 알아보죠</div>
<div>
	<button on:click={() => (target += 1)}>🔼</button>
	<button on:click={() => (target -= 1)}>🔽</button>
</div>
<br />
<div>두배가 되는 double: {double}</div>
<div>제곱이 되는 double: {square}</div>
<br />
<div>반응형은 사실 변수로만 나타나지 않습니다.</div>
