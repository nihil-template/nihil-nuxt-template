API 엔드포인트 정리

🔐 인증 관련 API (/auth)

- [x] 회원가입:  
       POST /auth/signup  
       요청 body: CreateUserDto  
       응답: ResponseDto<UserInfoDto>

- [x] 로그인:  
       POST /auth/signin  
       요청 body: SignInDto  
       응답: ResponseDto<UserInfoDto>

- [ ] 토큰 재발급:  
       POST /auth/refresh  
       요청 body: 없음  
       응답: ResponseDto<UserInfoDto>

- [x] 로그아웃:  
       POST /auth/signout  
       요청 body: 없음  
       응답: ResponseDto<null>

- [x] 세션 정보 조회:  
       GET /auth/session  
       요청 body: 없음  
       응답: ResponseDto<UserInfoDto>

- [x] 회원 탈퇴:  
       DELETE /auth/withdraw  
       요청 body: WithdrawDto  
       응답: ResponseDto<null>

- [x] 비밀번호 변경:  
       POST /auth/change-password  
       요청 body: ChangePasswordDto  
       응답: ResponseDto<UserInfoDto>

- [x] 비밀번호 찾기(이메일 발송):  
       POST /auth/forgot-password  
       요청 body: ForgotPasswordDto  
       응답: ResponseDto<null>

- [x] 비밀번호 재설정:  
       POST /auth/reset-password  
       요청 body: ResetPasswordDto  
       응답: ResponseDto<UserInfoDto>

---

👥 사용자 관리 API (/users)

- [x] 사용자 목록 조회:  
       GET /users  
       요청 body: 없음  
       응답: ResponseDto<ListDto<UserInfoDto>>

- [x] 사용자 단건 조회:  
       GET /users/:userNo  
       요청 body: 없음  
       응답: ResponseDto<UserInfoDto>

- [x] 이메일로 사용자 조회:  
       GET /users/email/:emlAddr  
       요청 body: 없음  
       응답: ResponseDto<UserInfoDto>

- [x] 프로필 수정:  
       PUT /users/profile  
       요청 body: UpdateUserDto  
       응답: ResponseDto<UserInfoDto>

---

👑 관리자 API (/admin)

- [ ] 관리자 회원가입:  
       POST /admin/signup  
       요청 body: CreateAdminDto  
       응답: ResponseDto<UserInfoDto>
