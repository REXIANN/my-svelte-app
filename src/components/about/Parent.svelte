<script>
	import Child from './Child.svelte';
</script>

<div>
	<p>이 블럭은 부모 컴포넌트에서 생성되었습니다.</p>
	<span> 부모컴포넌트의 색깔은 이렇게 지정되어 있죠. </span>
	<pre>
    p &#123; color: red &#125;; span &#123; color: orange &#125;;
  </pre>
</div>

<Child />

<style>
	div {
		border: 1px solid gray;
		padding: 10px;
	}
	p {
		color: red;
	}

	span {
		color: orange;
	}
</style>
