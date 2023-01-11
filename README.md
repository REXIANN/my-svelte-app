# create-svelte

@sveltejs/kit 이 1.0.0 버전이 나왔대서 시작해보는 Svelte 공부

## Creating a project

initial settings

```shell
✔ Which Svelte app template? › SvelteKit demo app
✔ Add type checking with TypeScript? › Yes, using TypeScript syntax
✔ Add ESLint for code linting? Yes
✔ Add Prettier for code formatting? Yes
✔ Add Playwright for browser testing? Yes
✔ Add Vitest for unit testing? Yes
```

주의사항: Node 16.14 또는 18 이상의 버전이 필요합니다(17 버전은 지원하지 않습니다)!

> ⚠️ Required: {"node":"^16.14 || >=18"}

```bash
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Svelte 란?

Svelte 는 리치 해리스(Rich Harris)가 2016년에 만든 오픈 소스 프론트엔드 웹 프레임워크 입니다.

기존의 React 나 Vue.js 등의 널리 알려진 웹 프레임워크와 달리 가상 DOM 을 사용하지 않으며, 빌드 단계에서 구성요소를 컴파일 하는 방식을 사용합니다.
따라서 Svelte 공식 홈페이지 에서는 Svelte 를 "컴파일러" 라고 표현하고 있습니다.

사용자가 웹 페이지를 요청했을 때 사용자에게 보내지는 것은 Svelte 코드를 컴파일한 VanillaJS 뿐입니다. 이는 브라우저에서 따로 가상 DOM 을 실행하는 코드가 없어 번들 사이즈를 줄이고, 브라우저는 JS엔진으로 받은 자바스크립트 파일을 읽기만 하면 되므로 보다 빠른 TTV(Time To View) 를 가집니다. Svelte 의 성능이 VanillaJS 와 거의 차이가 나지 않는 이유이기도 합니다.

## Sveltekit

원래는 Sapper 로 소개되고 있었으며 2022년 12월 15일 1.0.0 버전이 공개되었습니다(23년 1월 10일 현재는 1.0.1 도 나와있습니다).

Sveltekit 은 기존의 SPA 방식을 비롯하여 SSR, Svelte Component 등의 다양한 기능을 지원하고 있습니다(아직 개발 진행중이거나, 부족한 기능이 많은 것은 사실입니다). Sveltekit 은 code splitting, chunk 등의 기능을 SSR 과 버무려서 사용함으로써 초기 로딩에 모든 소스를 다운받는 문제를 해결하였습니다.

번들링으로는 Vite를 사용하고 있는데, 아직은 개선할 점이 많다고 합니다.

테스트 도구로는 playwright 를 지원하며 Sveltekit에 기본적으로 탑재되어 있습니다.

현재 svelte 를 사용하는 웹사이트나 프로그램은 다음과 같습니다.

- 뉴욕 타임스: 제작자가 해당 업체 소속 당시 일부 기사 페이지에서 사용.
- 스포티파이: 랜딩 페이지에서 사용.
- Brave: 검색 기능에 사용.
- Google Arts&Culture: Cultural Crosswords에 사용.
- IBM: IBM 카본 컴포넌트 프로젝트에 사용. 출처
- IKEA: IKEA 웹 사이트에 사용. 출처
- 리그 오브 레전드: 클라이언트 웹 컴포넌트에 사용. 출처
- 어베스트: 홈페이지에 사용.
- 1Password: 홈페이지에 사용.
- 라쿠텐: 홈페이지에 사용.
- Alaska Airline: 홈페이지에 사용.

### 왜 빠르지? 가상 DOM 의 동작원리와 Svelte 의 또 다른 생각

## Props and cons

### Props

- IE 를 지원하지 않는다
- 컴파일되어 순수한 자바스크립트가 올라가므로 (가상DOM 을 사용하는 프레임워크보다) 빠르다.
- 가상돔을 사용하지 않으므로 진짜로 reactive 하다(Framework-less VanilljaJS)
- svelte 는 컴파일러 역할을 하므로 개발 의존성 모듈(devDependencies) 로만 설치해도 충분히 동작한다.
- 반응성을 직접 명시하여 작업하므로 더욱 창의적인 작업이 가능하다.

### Cons

- 런타임에 실행되지 않으므로 cdn 형식으로 사용이 불가능하다
- svelekit 1.0.0 기준으로 node >=18 이 필요 하다

## DOCS

- [Svelte Tutorial](./docs/officialDocs/svelte-tutorial.md)
- [Official Docs - write less code!](./docs/officialDocs/write-less-code.md)
- [Official Docs - virtual dom is pure overhead](./docs/officialDocs/virtual-dom-is-pure-overhead.md)
- [Official Docs - Rethinking reactivity](./docs/officialDocs/rethinking-reactivity.md)
