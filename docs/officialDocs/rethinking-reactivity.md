# Svelte 3: Rethinking reactivity

## Svelte 는 무엇인가?
svelte 는 리액트와 뷰 와 같은 컴포넌트 기반 프레임워크이지만 중요한 차이점이 있습니다.

전통적인 프레임워크를 사용하면 선언적 상태 기반 코드를 작성할 수 있지만 페널티가 있습니다.
브라우저는 가상 DOM diffing 과 같은 구조를 사용하여 선언적 구조를 DOM 작업으로 변화하기 위한 추가적인 작업을 해야만 합니다.

반면 svelte 는 빌드 시 실행되어 작성한 코드가 DOM을 직접 업데이트 할 수 있는 매우 효율적인 명령형 코드로 바꿔줍니다.

결과적으로 탁월한 성능을 가진 프로그램이 되는 것입니다.

이전 버전의 svelte 에서는 상태가 변경되었음을 컴퓨터에게 알리기 위해 `this.set` 메서드를 호출했습니다.
```js
const { count } = this.get();
this.set({
  count: count + 1
})
```
호출된 메서드는 해당되는 컴포넌트가 반응하게 만들었습니다. 이는 리액트의 훅 사용법과 거의 동일합니다.

몇가지 기술적 차이점이 있지만(리액트는 이 방법을 사용함에도 reactive 하지 않습니다) 개념적으로는 동일했습니다.

훅의 출현으로 선언형 프레임워크에서 상태를 처리하는 방식은 완전히 바뀌었습니다. 

하지만 svelte 팀은 이 방향이 그들이 가고자 하는 방향이 아니라는 결론을 빠르게 내렸습니다. 
훅은 충분히 매력적이지만(흥미로운 속성을 가지고 있지만) 부자연스러운 코드가 여전히 포함되어 있으며, 가비지 콜렉터가 불필요한 작업을 수행하게 만듭니다.

그래서 svelte 팀은 어떤 종류의 API 가 효과가 있을지 고민했습니다. 그리고 최고의 API는 API가 전혀 없다는 것을 꺠달았습니다.
그냥 언어만을 사용하는 것입니다. 

일부 `count` 값과 이에 의존하는 모든 항목을 업데이트하는 작업은 다음과 같이 간단해야 합니다.
```js
count += 1;
```

svelte 는 컴파일러 이므로 뒤편에서(behind the scenes) 할당 작업을 계측하고 관련된 작업을 수행해 줄 수 있습니다.
```js
count += 1; $$invalidate('count', count);
```
 중요한 것은 프록시나 접근자를 사용함으로 인해 생기는 복잡성이나 오버헤드 없이 이 모든 작업을 수행할 수 있다는 것입니다.