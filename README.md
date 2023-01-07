# create-svelte

@sveltejs/kit 이 1.0.0 버전이 나왔대서 시작해보는 Svelte 공부

## Creating a project
initial settings

✔ Which Svelte app template? › SvelteKit demo app
✔ Add type checking with TypeScript? › Yes, using TypeScript syntax
✔ Add ESLint for code linting? Yes
✔ Add Prettier for code formatting? Yes
✔ Add Playwright for browser testing? Yes
✔ Add Vitest for unit testing? Yes

⚠️ Required: {"node":"^16.14 || >=18"}


```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Svelte 란?



## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


`.svelte`
`.svelte`

## Props and cons

### Props
* [INFLEARN svelte 인강]
* IE 를 지원하지 않는다
* 컴파일되어 순수한 자바스크립트가 올라가므로 (가상DOM 을 사용하는 프레임워크보다) 빠르다.
* 가상돔을 사용하지 않으므로 진짜로 reactive 하다(Framework-less VanilljaJS)
* svelte 는 컴파일러 역할을 하므로 개발 의존성 모듈(devDependencies) 로만 설치해도 충분히 동작한다. 
* 반응성을 직접 명시하여 작업하므로 더욱 창의적인 작업이 가능하다.

### Cons
* 런타임에 실행되지 않으므로 cdn 형식으로 사용이 불가능하다
* svelekit 1.0.0 기준으로 node >=18 이 필요 하다 
