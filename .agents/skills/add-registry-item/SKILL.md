---
name: add-registry-item
description: 이 레지스트리 프로젝트에 새로운 컴포넌트 또는 훅을 추가하는 절차를 안내합니다.
---

## 개요

이 스킬은 `@chaesunbak/registry` 프로젝트에 새 아이템(컴포넌트 또는 훅)을 추가할 때 따라야 할 단계별 절차입니다.
각 아이템은 반드시 세 곳에 모두 추가해야 합니다:

1. **소스코드** – `registry/default/` 하위에 실제 구현 파일
2. **레지스트리 선언** – `registry.json` 에 메타데이터 항목
3. **문서** – `content/` 하위에 MDX 문서 파일

추가로, 문서에서 사용하는 **예제 파일**도 `src/examples/` 에 작성해야 합니다.

---

## 디렉터리 구조

```
registry/
├── registry/
│   └── default/
│       ├── components/   ← 컴포넌트 소스
│       └── hooks/        ← 훅 소스
├── registry.json         ← 레지스트리 선언
├── content/
│   ├── components/       ← 컴포넌트 MDX 문서
│   └── hooks/            ← 훅 MDX 문서
└── src/
    └── examples/
        ├── components/   ← 컴포넌트 예제
        └── hooks/        ← 훅 예제
```

---

## 절차

### STEP 1 – 아이템 유형 결정

추가할 아이템이 **컴포넌트**인지 **훅**인지 결정합니다.

| 유형     | 파일 위치                                | `registry.json` type | content 폴더                    |
| -------- | ---------------------------------------- | -------------------- | ------------------------------- |
| 컴포넌트 | `registry/default/components/<name>.tsx` | `registry:component` | `content/components/<name>.mdx` |
| 훅       | `registry/default/hooks/<hookName>.ts`   | `registry:hook`      | `content/hooks/<name>.mdx`      |

> **네이밍 규칙**
>
> - 컴포넌트: `PascalCase.tsx` (예: `MyButton.tsx`)
> - 훅: `useXxx.ts` (예: `useMyHook.ts`)
> - `registry.json`의 `name` 키: `kebab-case` (예: `my-button`, `use-my-hook`)
> - MDX 파일명: `kebab-case.mdx` (예: `my-button.mdx`, `use-my-hook.mdx`)

---

### STEP 2 – 소스코드 작성

`registry/default/components/` 또는 `registry/default/hooks/` 에 구현 파일을 작성합니다.

실제 예시를 참고하세요:

- 컴포넌트: [responsive.tsx](registry/default/components/responsive.tsx)
- 훅: [usePreventLeave.ts](registry/default/hooks/usePreventLeave.ts)

> 훅 파일은 내부 import 경로에 `@/hooks/use-mobile` 등 프로젝트 alias를 사용해도 됩니다.

---

### STEP 3 – `registry.json` 에 항목 추가

`registry.json`의 `items` 배열에 새 객체를 추가합니다.

---

### STEP 4 – 예제 파일 작성

`src/examples/components/` 또는 `src/examples/hooks/` 에 MDX 문서에서 임포트할 예제 컴포넌트를 작성합니다.

실제 예시를 참고하세요:

- 컴포넌트: [responsive.tsx](src/examples/components/responsive.tsx)
- 훅: [use-dialog.tsx](src/examples/hooks/use-dialog.tsx)

> - 반드시 `"use client";` 디렉티브를 추가하세요.
> - import 경로: `@/registry/default/components/<name>` 또는 `@/registry/default/hooks/<hookName>` 형태를 사용합니다.
> - 내보내는 컴포넌트명은 `<PascalCaseName>Example` 규칙을 따릅니다.

---

### STEP 5 – MDX 문서 작성

`content/components/<name>.mdx` 또는 `content/hooks/<name>.mdx` 에 문서를 작성합니다.

실제 예시를 참고하세요:

- 컴포넌트: [responsive.mdx](content/components/responsive.mdx)
- 훅: [use-dialog.mdx](content/hooks/use-dialog.mdx)
