# Svelte Official Tutorial
[Svelte Tutorial](https://svelte.dev/tutorial/basics) 에서 공부한 내용입니다.

`.svelte` 파일은 HTML, CSS, JS을 캡슐화하는, 자체적으로 재사용 가능한 코드 블럭이 된다.

---

svelte 에서는 문자열 안에 변수를 넣기 위해 템플릿 리터럴(`\``)을 사용할 필요가 없다.
```
<script>
let name = 'kim'
</script>

<img src="src.png" alt="{kim}'s picture" />
```

---

`.svelte` 파일 안에 `style` 태그를 넣으면 자동으로 해당 파일을 스코프로 가진다.
따라서 하나의 svelte 컴포넌트 안에 있는 스타일은 다른 파일의 스타일링에 영향을 주지 않는다.

---


하나의 svelte 파일에서 다른 svelte 파일을 임포트 할 수 있다.
```
<script>
	import Nested from './Nested.svelte'
</script>

<Nested />
```
다른 svelte 파일을 임포트 하더라도 해당 컴포넌트에 선언된 style 태그가 다른 컴포넌트에는 영향을 끼치지 않는다.
그게 설령 span, div 등 클래스이름 기반이 아닌 태그 기반 스타일링이라고 해도 말이다.

그리고 컴포넌트로 사용되는 svlete 파일의 첫 글자는 대문자이여야만 한다. 이것은 기본 html 태그와 스벨트 컴포넌트가 헷갈리게 하지 않게 하기 위해 채택된 컨벤션이다.

---

`.svelte` 의 구현부 안에서 변수를 사용하려면 `{}`을 쓰면 된다. 만약 HTML 렌더링을 위해 escape 가 필요하다면, `{@html ...}` 형태로 사용할 수 있다.

주의할 점은 svelte 는 DOM 에 삽입되기 전에 `{@html ...}` 내부의 표현식을 삭제하지 않는다.
다시 말해 사용자가 신뢰할 수 없는 소스에서 가져온 HTML 을 수동으로 escape 할 경우 XSS 공격에 노출될 수 있다는 것이다.

---
