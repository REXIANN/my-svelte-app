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

svelte 의 반응성(reactivity)은 앱에 있는 변수들이 항상 DOM 과 동기화 될 뿐만 아니라 각 변수들이 다른 변수들과도 동기화 되도록 합니다.
이는 반응형 선언(reactive declarations)을 통해 사용할 수 있으며 `$:` 사인을 이용합니다.

```
let count = 0;
let numbers = [1, 2, 3, 4, 5];

$: doubled = count * 2;
$: sum = numbers.reduce((acc, cur) => acc + cur, 0);

```

다소 이상하게 보일 수 있겠지만 이는 [label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label) 이라는 자바스크립트 문법이며, svelte 는 이 문법을 가져다가 "참조하는 값이 바뀔 때 마다 해당 변수는 다시 계산하라" 라고 의미를 확장하여 사용하는 것입니다.

반응형 선언에는 콘솔을 넣어서 해당 변수가 바뀔 때 마다 실행되게 할 수 있으며 코드 블럭, 심지어 if 문도 들어갈 수 있습니다.

```
$: console.log('this count is ', count);

$: {
  console.log('this count is ', count);
  alert("I SAID THE COUNT IS ", count);
}

$: if (count >= 10) {
  alert('count is too high');
  count = 9;
}

```

---

svelte 의 반응성은 할당에 의해 일어납니다. 배열이나 오브젝트를 변경하는 메서드를 사용하는 경우, 업데이트가 일어나지 않습니다.

```
	let numbers = [1, 2, 3, 4];

	function addNumber() {
		numbers.push(numbers.length + 1);
    // numbers = numbers;

		// numbers = [...numbers, numbers.length];
	}
```

---

html 은 조건문이나 루프와 같은 자체적인 로직을 가지지 않습니다.
svelte 문법이 여기서 도와줍니다.

`#`은 항상 블록 오프닝 태그를 의미합니다. `/` 은 항상 블록닫기 태그(block closing tag)를 의미합니다. `:` 는 블록연속 태그를 나타냅니다.

```
{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

반복문은 `each` 예약어로 실행됩니다. 두번째 인자로 인덱스를 가져올 수 있습니다.

```
<script>
	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
</script>

<ul>
	{#each cats as cat, index}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}" rel="noreferrer">
			{index}: {cat.name}
		</a></li>
	{/each}
</ul>

<ul>
  {#each cats as { name, id }, index}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={id}" rel="noreferrer">
			{index}: {name}
		</a></li>
	{/each}
</ul>
```

기본적으로 하나의 블록 안에 있는 값이 수정된다면, 블록의 끝에서부터 추가나 삭제가 일어납니다.
DOM 은 삭제명령이 일어나면 맨 밑에 있는 노드를 지우고, 다른 노드들의 값을 새로운 값으로 업데이트 하기 떄문입니다.

이 부분에서 기존의 데이터와의 정합성이 맞지 않을 수 있습니다.
이를 방지하기 위해서, 각각의 노드가 고유함을 알리기 위해 `each` 문 안에 key 를 넣어줄 수 있습니다.
svelte 는 내부적으로 Map 을 사용합니다. 따라서 모든 개체를 키로 사용할 수 있습니다. 따라서 문자열이나 숫자를 넣을 필요 없이 객체 자신을 집어넣어 키로 설정할 수도 있습니다.

그러나 일반적으로 문자열이나 숫자를 사용하는 것이 더 안전합니다. 예를 들어 API 서버에서 최신 데이터로 업데이트할 때 ID가 참조 동등성 없이 지속됨을 의미하기 때문입니다.

```
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}
```

---

대부분의 웹 어플리케이션은 비동기 데이터를 다루게 됩니다. svelte 는 `await` 키워드를 활용해 비동기작업의 결과물인 값을 쉽게 표현할 수 있습니다.

```
{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

// or
{#await promise then number}
	<p>the number is {number}</p>
{/await}
```

---

이벤트 핸들러를 사용하는 경우 다양한 modifier 를 사용할 수 있습니다.

```
<button on:click|preventDefault={handleClick}>
	Click me
</button>
```

사용할 수 있는 modifier 는 다음과 같습니다.

- `preventDefault`
- `stopPropagation`
- `passive`
- `nonpassive`
- `capture`
- `once`
- `self`
- `trusted`

또한 여러개를 같이 사용하는 것도 가능합니다.

```
<button on:click|preventDefault|once|passive={handleClick}>
	Click me
</button>
```
