# Virtual DOM is pure overhead
지난 몇 년간 자바스크립트 프레임워크를 사용해 본 적이 있다면 '가상 DOM은 빠르다' 는 말을 들어보았을 것입니다.
이 말은 '가상 DOM 은 실제 DOM 보다 빠르다' 는 뜻입니다.

그래서 사람들은 svelte 가 어떻게 가상 DOM을 사용하지 않고도 빠를 수 있는지 궁금해합니다.

## 가상 DOM 이란 무엇일까?
많은 프레임워크에서 `render` 메서드를 사용해서 앱을 만듭니다. 
```js
function HelloMessage(props) {
  return (
    <div className="greeting">
      <span>Hello, {props.name}</span>
    </div>
  )
}
```
JSX 없이도 만들 수 있긴 합니다.
```js
function HelloMessage(props) {
  return React.createElement(
    'div',
    { className: 'greeting' },
    'Hello, ',
    props.name,
  )
}
```

createElement 로 만든 객체는 페이지가 어떠헥 보여야하는지를 나타내는 객체입니다.
즉 만들어진 객체는 가상 DOM 입니다. 

이제 앱의 상태가 업데이트 될 때 마다(예: name 이 변경될 때 마다) 새로운 상태를 만듭니다.
프레임워크는 이제 새로 만들어진 객체와 이전에 만들어진 객체를 비교해 어떤 변경이 필요한지 파악하고(diffing) 
실제 DOM 에 업데이트 할 부분을 정한 뒤 실제 DOM 에 변경을 가합니다.

UI 업데이트는 브라우저 비용이 많이 드는 작업입니다.
가상 DOM 은 실제 DOM 을 배치 형식으로 업데이트 함으로써 UI 를 다시 그리는 비용을 줄이고 분명히 전반적인 성능을 향상시킵니다.

## 오버헤드는 어디서 발생하나요?
[diffing](https://www.geeksforgeeks.org/explain-dom-diffing/) 은 무료가 아닙니다.

새로운 가상 DOM 을 만들고 이전 스냅샷과 비교하지 않으면 실제 DOM 을 업데이트 할 수 없습니다. 

HelloMessage 컴포넌트에서 `name` 이 변경되었다고 가정해보겠습니다.
1. 두 스냅샷 모두 (return 에서 반환되는) 하나의 엘리먼트(div)를 가지고 있습니다. 따라서 기존의 DOM node 를 수정하지 않아도 됨을 알 수 있습니다.
2. 가지고 있는 모든 인자들을 enumerate 한 뒤 업데이트가 필요한 부분이 있는지 비교합니다. 이 경우 두 엘리먼트 모두 하나의 인자(className)을 가지고 있으며 값이 동일하므로 변경할 필요가 없습니다.
3. 다음으로 텍스트가 변경되었으므로 우리는 실제 DOM 에 있는 텍스트를 변경해야 함을 알 수 있습니다.

위에서 보듯이 우리는 세번째 단계만 비교할 가치가 있음을 알 수 있습니다. 따라서 1단계와 2단계를 건너뛰고 바로 3단계 변경으로 갈 수 있다면 더욱 효율적일 것입니다.

이 경우 스벨트가 생성하는 업데이트 코드는 대략 다음과 같습니다. 기존의 UI 프레임워크와 달리 svelte 는 런타임에 작업을 수행하기를 기다리지 않습니다.
대신 빌드 시 앱에서 변경될 수 있는 방법을 알고 있는 컴파일러 입니다!
```js
if (changed.name) {
  text.data = name
}
```

## 그래도 diffing 은 상당히 빠릅니다.
리액트를 포함한 가상 DOM 을 사용하는 프레임워크의 diffing 알고리즘은 굉장히 빠릅니다. 

더 큰 오버헤드는 구성 요소 자체에 있습니다. 

대부분은 이런 코드를 작성하지 않습니다. `value` 의 변경 여부에 관계없이 업데이트 할 때 마다 필요없는 계산을 다시 하기 때문입니다.
```js
function StrawManComponent(props) {
  const value = expensivelyCalculateValue(props.foo);
  
  return (
    <p>the value is {value}</p>
  )
}
```

하지만 대부분은 훨씬 더 부드러운 방법으로 불필요한 계산과 할당을 수행하는 코드를 작성하곤 합니다.
```js
function MoreRealisticComponent(props) {
    const [selected, setSelected] = useState(null);

    return (
        <div>
            <p>Selected {selected ? selected.name : 'nothing'}</p>
            <ul>
                {props.items.map(item =>
                    <li>
                        <button onClick={() => setSelected(item)}>
                            {item.name}
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}
```

여기서 우리는 `props.items` 의 변경 여부에 관계없이, 모든 상태 변경에 따라 `li` 의 배열을 새로 만듭니다.
그리고 `li` 엘리먼트는 자체적으로 인라인 이벤트 핸들러를 가지고 있습니다. 

매번 상태 업데이트마다 li 엘리먼트들을 새로 그리지만, 그럼에도 불구하고 새로 그리는 작업이 충분히 빠르다는 것은 사실입니다.
그렇기 때문에 대부분은 이 코드를 최적화하지 않으려고 할 것입니다.

하지만 더 빠른 방법이 있습니다. 바로 "그리지 않는 것" 입니다.

불필요한 작업을 기본 값으로 설정하는 것은 당신의 앱이 명확한 병목 현상이 없더라도 결국에는 "지푸라기 하나에 부러지는 낙타의 등" 이 될 수 있는 가능성을 만듭니다. 

svelte 는 그러한 상황에 처하지 않도록(불필요한 작업을 기본 값으로 가지지 않도록) 명시적으로 설계되었습니다.

## 그럼 대체 왜 가상 DOM 을 사용하죠?
가상 DOM 은 기능이 아니라는 점을 이해하는 것이 중요합니다. 가상 DOM은 목적을 위한 수단이며, 그 목적은 바로 "선언적이고 상태 중심의 UI 개발" 입니다.

가상 DOM은 충분히 좋은 성능을 보이며, 상태 전환에 대해 생각하지 않고 앱을 만들 수 있게 해주기 때문에 그 가치가 있습니다. 
즉 버그가 적은 코드와 지루한 작업을 대신 해주고, 개발자가 창의적인 작업에 더 많은 시간을 할애할 수 있도록 만들어줍니다.

하지만 가상 DOM 을 사용하지 않고도 유사한 프로그래밍 모델을 만들 수 있다는 것이 바로 svelte 가 주장하는 부분입니다.
