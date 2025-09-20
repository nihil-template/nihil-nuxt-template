# CLAUDE.md - Assets 폴더 가이드라인

## 🚨 CRITICAL: TailwindCSS 커스텀 설정 주의사항

이 프로젝트는 **TailwindCSS의 기본 설정을 대폭 커스터마이즈**하여 사용합니다.
공식 TailwindCSS 클래스를 사용하기 전 반드시 아래 내용을 확인하세요.

### ❌ 사용 불가능한 공식 TailwindCSS 클래스들

#### 1. Text Size 클래스 - 완전 초기화됨

```css
--text-*: initial; /* 모든 text 크기 관련 클래스 초기화 */
```

**사용 불가능한 공식 클래스들:**

- `text-base` ❌ (공식: 1rem)
- `text-xl` ❌ (공식: 1.25rem)
- `text-2xl` ❌ (공식: 1.5rem)
- `text-3xl` ❌ (공식: 1.875rem)
- `text-4xl` ❌ (공식: 2.25rem)
- `text-5xl` ❌ (공식: 3rem)
- `text-6xl` ❌ (공식: 3.75rem)
- `text-7xl` ❌ (공식: 4.5rem)
- `text-8xl` ❌ (공식: 6rem)
- `text-9xl` ❌ (공식: 8rem)

**커스텀 재정의된 클래스들 (값이 다름):**

- `text-xs`: 0.8rem (공식: 0.75rem)
- `text-sm`: 1rem (공식: 0.875rem)
- `text-lg`: 1.4rem (공식: 1.125rem)

**추가 커스텀 클래스들:**

- `text-md`: 1.2rem (공식에 없음)
- `text-h1`: 2.4rem
- `text-h2`: 2.2rem
- `text-h3`: 2rem
- `text-h4`: 1.8rem
- `text-h5`: 1.6rem
- `text-h6`: 1.4rem

#### 2. Border Radius 클래스 - 커스텀 시스템으로 교체됨

```css
--radius-*: initial; /* 기본값 초기화 후 커스텀 값으로 재정의 */
```

**공식 `rounded-*` 대신 사용해야 하는 클래스들:**

- `rounded-none` → `radius-0` 사용
- `rounded-sm` → `radius-1` (0.25rem) 사용
- `rounded` → `radius-2` (0.5rem) 사용
- `rounded-md` → `radius-3` (0.75rem) 사용
- `rounded-lg` → `radius-4` (1rem) 사용
- `rounded-xl` → `radius-5` (1.25rem) 사용
- `rounded-2xl` → `radius-6` (1.5rem) 사용
- `rounded-3xl` → `radius-8` (2rem) 사용

**사용 가능한 커스텀 radius 클래스들:**
`radius-0`, `radius-px`, `radius-1` ~ `radius-120`

### ✅ 정상 작동하는 공식 클래스들

#### 1. Layout & Display

- `flex`, `grid`, `block`, `inline-block` 등 모든 display 클래스들
- `justify-*`, `items-*`, `content-*` 등 정렬 클래스들
- `grid-cols-*`, `col-span-*` 등 grid 클래스들

#### 2. Spacing

- `p-*`, `m-*`, `gap-*` 등 (커스텀 `--spacing: 0.25rem` 기반)

#### 3. Colors

- 모든 `bg-*`, `text-*`, `border-*` 색상 클래스들 (oklch 값으로 재정의)

#### 4. Sizing

- `w-*`, `h-*`, `size-*` 등 모든 크기 클래스들

#### 5. Position & Z-index

- `absolute`, `relative`, `fixed`, `z-*` 등

#### 6. Animations

- 기본 `animate-*` 클래스들 (spin, ping, pulse, bounce)
- 추가 커스텀: `animate-spin-2`, `animate-spin-3`

### 📁 커스텀 설정 파일 위치

- **메인 설정**: `app/assets/styles/tailwind.css`
- **색상 설정**: `app/assets/styles/colors.css`
- **Radius 설정**: `app/assets/styles/size/radius.css`
- **뷰포트 단위**: `app/assets/styles/size/dvh.css`, `app/assets/styles/size/dvw.css`
- **커스텀 변형**: `app/assets/styles/variant/child.css`

### 🔍 클래스 사용 전 확인사항

1. 새로운 TailwindCSS 클래스 사용 전 위 설정 파일들을 반드시 확인
2. 공식 문서의 클래스와 실제 값이 다를 수 있음
3. 임의값 문법 `[value]` 사용 가능하지만 일관성을 위해 커스텀 시스템 우선 사용
4. 의심스러운 경우 브라우저 개발자 도구로 실제 적용된 CSS 값 확인

---

**최종 업데이트**: 2025-09-20
