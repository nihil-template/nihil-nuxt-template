# CLAUDE.md - 스키마

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 스키마 작업 시 제공되는 가이드라인입니다.

## 🚨 템플릿 프로젝트 주의사항

이 프로젝트는 **개발 템플릿**입니다. 스키마들은 예시용으로 제공되며, 실제 프로젝트에서는:
- 실제 비즈니스 요구사항에 맞게 스키마 수정 필요
- 불필요한 예시 스키마는 제거
- 프로젝트에 맞는 새로운 스키마 추가

## 스키마 작성 규칙

### 파일 구조 및 네이밍

- 도메인별로 스키마를 분리: `user.schema.ts`, `response.schema.ts`
- 스키마 파일명은 `*.schema.ts` 형식 준수
- 타입 정의는 스키마와 동일 파일에 함께 작성

### Zod 스키마 작성 패턴

#### 1. 한국어 에러 메시지 필수

```typescript
// ✅ 올바른 예시
z.string().min(2, '사용자명은 2자 이상이어야 합니다.')
z.email('올바른 이메일 형식을 입력해주세요.')

// ❌ 잘못된 예시
z.string().min(2)
z.email()
```

#### 2. Enum 스키마 정의

```typescript
// Drizzle enum을 Zod 스키마로 변환
export const userRoleSchema = z.enum(['USER', 'ADMIN'], '사용자 권한은 필수입니다.');
export const ynEnumSchema = z.enum(['Y', 'N'], '올바른 값을 입력해주세요.');
```

#### 3. 공통 스키마 재사용

```typescript
// 공통 스키마 정의
export const passwordSchema = z.string()
  .min(10, '비밀번호는 10자 이상이어야 합니다.')
  .max(30, '비밀번호는 30자 이하여야 합니다.')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    '비밀번호는 영문 대소문자, 숫자, 특수문자(@$!%*?&)를 각각 1개 이상 포함해야 합니다.');

// 재사용
export const signUpSchema = z.object({
  password: passwordSchema,
  passwordConfirm: passwordSchema,
});
```

#### 4. 기본 스키마에서 파생 스키마 생성

```typescript
// 기본 스키마
export const userInfoSchema = z.object({
  userNo: z.number().int().positive().optional(),
  emlAddr: z.email('올바른 이메일 형식을 입력해주세요.'),
  userNm: z.string().min(2).max(30),
  // ...
});

// 파생 스키마 - shape 속성 활용
export const createUserSchema = z.object({
  emlAddr: userInfoSchema.shape.emlAddr,
  userNm: userInfoSchema.shape.userNm,
  password: passwordSchema,
});

// 부분 업데이트 스키마
export const updateUserSchema = userInfoSchema.pick({
  userNm: true,
  proflImg: true,
  userBiogp: true,
}).partial();
```

#### 5. 복합 검증 규칙 (refine)

```typescript
export const changePasswordSchema = z.object({
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  error: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'], // 에러가 표시될 필드 지정
});
```

#### 6. 날짜/시간 검증

```typescript
// ISO 8601 형식 검증
lastLgnDt: z.string('올바른 날짜 형식이어야 합니다.')
  .pipe(z.iso.datetime('올바른 ISO 8601 날짜 형식이어야 합니다.'))
  .nullable()
  .optional()
```

#### 7. 조건부 검증

```typescript
export const searchUserSchema = z.object({
  strtRow: z.number().int().min(0).optional(),
  endRow: z.number().int().min(1).optional(),
  srchType: z.enum(['userNm', 'emlAddr']).optional(),
  srchKywd: z.string().max(100).optional(),
}).refine((data) => {
  // 페이지네이션 관련 유효성 검사
  if (data.strtRow !== undefined && data.endRow !== undefined) {
    return data.endRow > data.strtRow;
  }
  return true;
}, {
  error: '끝행은 시작행보다 커야 합니다.',
  path: ['endRow'],
});
```

### 타입 정의 규칙

#### 1. 스키마별 타입 추출

```typescript
// 스키마 정의 후 반드시 타입 추출
export type UserInfoType = z.infer<typeof userInfoSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
```

#### 2. 제네릭 스키마 타입

```typescript
// response.schema.ts 패턴
const responseSchema = <TData = any>(dataSchema: z.ZodType<TData> = z.any()) => (
  z.object({
    error: z.boolean(),
    code: z.string(),
    message: z.string(),
    data: dataSchema.nullable(),
  })
);

type ResponseType<TData = any> = z.infer<ReturnType<typeof responseSchema<TData>>>;
```

### 새 스키마 파일 생성 시 체크리스트

1. **파일명**: `domain.schema.ts` 형식
2. **Zod import**: `import { z } from 'zod';`
3. **한국어 에러 메시지**: 모든 검증 규칙에 한국어 메시지 포함
4. **공통 스키마 재사용**: 기존 공통 스키마 최대한 활용
5. **타입 추출**: 모든 스키마에 대응하는 타입 정의
6. **Export 구조**: 스키마와 타입을 명확히 분리하여 export

### 검증 규칙 가이드라인

- **문자열**: min/max 길이, 정규식 패턴
- **숫자**: int(), positive(), min/max 값
- **이메일**: `.email()` 메소드 사용
- **선택적 필드**: `.optional()` 또는 `.nullable()`
- **기본값**: `.default()` 사용
- **복합 검증**: `.refine()` 메소드 활용

### VeeValidate 연동 고려사항

- 스키마는 VeeValidate와 함께 사용됨 (`@vee-validate/zod`)
- 에러 메시지의 `path` 속성을 통해 특정 필드에 에러 표시
- 복합 검증 시 적절한 필드에 에러가 표시되도록 `path` 설정 필수

### 템플릿에서 실제 프로젝트로 전환 시

1. **예시 스키마 검토**: `user.schema.ts`, `response.schema.ts` 등이 실제 요구사항에 맞는지 확인
2. **불필요한 스키마 제거**: 사용하지 않는 예시 스키마는 삭제
3. **비즈니스 로직 반영**: 실제 프로젝트의 비즈니스 규칙에 맞게 검증 로직 수정
4. **API 응답 구조 매칭**: 백엔드 API 응답 구조에 맞게 스키마 조정