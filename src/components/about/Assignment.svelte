<script lang="ts">
	let numbers = [1, 2, 3, 4];

	function addNumber1() {
		numbers.push(numbers.length + 1);
	}

	function addNumber2() {
		numbers = [...numbers, numbers.length + 1];
	}
</script>

<div>Svelte 변수의 변경은 할당에 의해 일어납니다. 이 배열([1, 2, 3,4]) 을 한번 보죠</div>

<br />
<div>
	{JSON.stringify(numbers)}
</div>
<br />

<div>다음 함수는 실행이 되어도 변수가 업데이트 되지 않습니다.</div>
<button on:click={addNumber1}>증가!!!</button>
<pre>
  function addNumber1() &#123; <br />
  &nbsp;&nbsp;numbers.push(numbers.length + 1)
  <br />&#125;
</pre>
<br />
<div>
	svelte 에서 변수의 변경을 감지하는 것은 할당 연산자 <code>=</code> 입니다. 따라서
	<code>numbers</code> 를 업데이트 하고 싶다면 다음과 같이 써야 해요.
</div>
<button on:click={addNumber2}>증가!!!</button>
<pre>
  function addNumber1() &#123; <br />
  &nbsp;&nbsp;numbers.push(numbers.length + 1);
  &nbsp;&nbsp;numbers = numbers;

  &nbsp;&nbsp;// 또는
  &nbsp;&nbsp;numbers = [...numbers, numbers.length + 1]
  <br />&#125;
</pre>

<style>
	button {
		width: 200px;
		padding: 5px;
	}
</style>
