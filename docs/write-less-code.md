# Write less code
적은 코드를 작성하는 것은 중요합니다. 

프로젝트 개발 시간과 버그의 개수는 코드베이스의 크기에 따라 선형이 아니라 제곱으로 증가합니다(버그의 개수 ∝ 코드베이스크기^2).
하나의 코드 모듈이 너무 크다면(안에 작성된 코드가 길다면) 코드를 이해하는데 필요한 인지적 노력이 크게 증가합니다.
이는 특히 리팩토링과 주석이 추가되면서 더욱 방대한 양의 코드로 이어집니다.

## 가독성
가독성 역시 문제가 되는데, 10줄짜리 PR 은 100줄짜리 PR에 비해 더 간결하며 더 자세한 수준의 리뷰(들여다보기) 가 가능합니다.

svelte의 목표 중 하나는 코드의 양을 줄이는 것입니다.
더 적은 코드를 작성함으로써 가독성을 높이고 알아보기 쉬운 코드를 지향합니다.

```sveltehtml
<script>
    let a = 1;
    let b = 2;
</script>

<input type="number" bind:value={a}/>
<input type="number" bind:value={b}/>

<p>{a} + {b} = {a + b}</p>
```

위의 모듈을 리액트로 구현하면 다음과 같습니다.
```js
import React, { useState } from 'react';

export default () => {
    const [a, setA] = useState(1);
    const [b, setB] = useState(2);

    function handleChangeA(event) {
        setA(+event.target.value);
    }

    function handleChangeB(event) {
        setB(+event.target.value);
    }

    return (
        <div>
            <input type="number" value={a} onChange={handleChangeA}/>
            <input type="number" value={b} onChange={handleChangeB}/>

            <p>{a} + {b} = {a + b}</p>
        </div>
    );
};
```

## 최상위 요소
리액트나 뷰 의 경우 구성요소에는 최상위요소가 있어야 합니다. 

하지만 svelte 에서는 원화는 만큼의 최상의 요소를 가질 수 있습니다.

리액트의 경우 `Fragment`를 사용할 수 있지만 `<div>` 를 사용하는 것과 기본적인 아이디어는 동일하며 `Fragment`를 사용하더라도 추가적인 들여쓰기가 들어갑니다.

뷰의 경우 마크업은 `<template>` 요소로 반드시 래핑되어야 하며 svelte는 이것이 불필요 하다고 생각합니다.

## 바인딩
리액트에서는 입력 이벤트에 직접 응답을 해야 합니다.
```js
function handleChange(event) {
  setA(+event.target.value)
}
```

하지만 이것은 화면에서 추가적인 공간을 차지하는 비루한 표현이며, 버그를 위한 추가적인 장치가 될 수 있습니다.

개념적으로 입력된 값은 `a` 에 바인딩 되지만 그 관계가 명확하게 표현되지 않습니다. 
오히려 밀접하게 결합되어 있지만 물리적으로 분리된 두 개의 코드 덩어리가 존재할 뿐입니다. 

뿐만 아니라 문자열 값을 + 로 강제변환(캐스팅) 해야 한다는 점도 있습니다. 

## 상태
svelte 에서는 할당 연산자를 사용하여 로컬 구성 요소 상태를 업데이트 합니다.
```js
let count = 0;

function increment() {
  count +=  1
}
```

리액트에서는 hook 을 사용하는 반면에 말이죠
```js
const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
  // 또는 setCount(prev => prev + 1); 
}
```

리액트의 이런 방식은 동일한 개념을 표시하지만 60% 이상의 문자를 더 사용합니다. 

## 너무나 많은 상용구(boilerplate)
svelte 는 최소한의 노력으로 사용자 인터페이스를 구축하는데 좋습니다.

반응형 선언의 경우 본질적으로 리액트의 작업을 수행하는데 useMemo, useCallback, useEffect 등 각 상태 변경에서 인라인 함수 실행이나 배열을 생성하는 가비지 수집 오버헤드가 발생합니다.

svelte 는 컴파일러 이기 때문에 자바스크립트의 특성에 얽매이지 않습니다. 이는 프록시나 훅을 통하지 않고 자연스럽게 변수를 사용할 수 있게 함으로써 더 관용적인 코드를 생성합니다.
