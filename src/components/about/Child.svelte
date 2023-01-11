<script context="module">
	export const childName = '자식에서 내보내는 데이터';
</script>

<div>
	<p>이 블럭은 자식 컴포넌트에서 생성되었습니다.</p>
	<span> 하지만 부모 컴포넌트의 스타일을 물려받지 않았죠. </span>
</div>

<style>
	div {
		border: 1px solid gray;
		padding: 10px;
	}
</style>
