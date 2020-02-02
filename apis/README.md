# API

JWT는 `Set-Cookie: access_token=aaa.bbb.ccc` 또는 `Authorization: Bearer aaa.bbb.ccc` 헤더로 전송

## Summary

### Test

- [x] 핑퐁

### Auth

- [x] 로그인
- [x] 내 정보 조회
- [x] 내 정보 수정
- [x] 탈퇴
- [x] 내 로그 조회
- [x] 내 정보공개설정 조회
- [x] 내 정보공개설정 수정

### User

- [x] 가입
- [x] 모든 사용자 정보 조회
- [x] 사용자 정보 조회
- [x] 사용자 강퇴
- [x] 사용자 권한 수정
- [x] 사용자 로그 조회
- [x] 사용자 비밀번호 초기화
- [x] 사용자 정보공개설정 조회

## Test

### GET /ping

Output:

```js
{
  message: 'pong',
}
```

## Auth

### POST /auth

로그인

Input:

```js
{
  id: 00000000, // 숫자 8자리
  password: 'P@ssw0rd!',
}
```

Output:

```text
Set-Cookie: access_token=aaa.bbb.ccc; HttpOnly
```

```js
{
  message: 'success',
  token: 'aaa.bbb.ccc', // JWT
}
```

### GET /auth/me

(Auth Required) 내 정보 조회

Output:

```js
{
  message: 'success',
  user: {
    id: 00000000,
    name: '테스터', // nullable
    nameEnglish: 'tester', // nullable
    level: 1,
    email: 'tester@example.com', // nullable
    phone: '010-0000-0000', // nullable
    picture: 'https://raw.githubusercontent.com/inha-ice/assets/master/images/logo.png', // nullable
  },
}
```

### PATCH /auth/me

(Auth Required) 내 정보 수정

Input:

```js
{
  name: '테스터', // nullable
  nameEnglish: 'tester', // nullable
  email: 'tester@example.com', // nullable
  phone: '010-0000-0000', // nullable
  picture: 'https://raw.githubusercontent.com/inha-ice/assets/master/images/logo.png', // nullable
}
```

Output:

```js
{
  message: 'success',
}
```

### DELETE /auth/me

(Auth Required) 탈퇴

Output:

```js
{
  message: 'success',
}
```

### GET /auth/me/logs

(Auth Required) 내 로그 조회

Output:

```js
{
  message: 'success',
  logs: [
    {
      action: 'sign up',
      createdAt: '2020-01-01 00:00:00',
    },
    {
      action: 'login',
      createdAt: '2020-01-01 00:00:00',
    },
    {
      action: 'update me',
      createdAt: '2020-01-01 00:00:01',
    },
  ],
}
```

### GET /auth/me/privacy

(Auth Required) 내 정보공개설정 조회

Output:

```js
{
  message: 'success',
  privacy: {
    name: true,
    nameEnglish: true,
    level: true,
    email: false,
    phone: false,
    picture: true,
  },
}
```

### PATCH /auth/me/privacy

(Auth Required) 내 정보공개설정 수정

Input:

```js
{
  name: false,
  nameEnglish: false,
  level: false,
  email: true,
  phone: true,
  picture: false,
}
```

Output:

```js
{
  message: 'success',
}
```

## User

### POST /users

가입

Input:

```js
{
  id: 00000000, // 숫자 8자리
  name: '테스터',
  password: 'P@ssw0rd!',
}
```

Output: `POST /auth`와 동일

### GET /users

(Manager Auth Required) 모든 사용자 정보 조회

Output:

```js
{
  message: 'success',
  users: [
    {
      id: 00000000,
      name: '테스터', // nullable
      nameEnglish: 'tester', // nullable
      level: 1,
      email: 'tester@example.com', // nullable
      phone: '010-0000-0000', // nullable
      picture: 'https://raw.githubusercontent.com/inha-ice/assets/master/images/logo.png', // nullable
    },
  ],
}
```

### GET /users/:id

(Manager Auth Required) 사용자 정보 조회

Output:

```js
{
  message: 'success',
  user: {
    id: 00000000,
    name: '테스터', // nullable
    nameEnglish: 'tester', // nullable
    level: 1,
    email: 'tester@example.com', // nullable
    phone: '010-0000-0000', // nullable
    picture: 'https://raw.githubusercontent.com/inha-ice/assets/master/images/logo.png', // nullable
  },
}
```

### DELETE /users/:id

(Manager Auth Required) 사용자 강퇴

Output:

```js
{
  message: 'success',
}
```

### PUT /users/:id/level

(Manager Auth Required) 사용자 권한 수정

Input:

```js
{
  level: 'MEMBER',
}
```

Output:

```js
{
  message: 'success',
}
```

### GET /users/:id/logs

(Manager Auth Required) 사용자 로그 조회

Output:

```js
{
  message: 'success',
  logs: [
    {
      action: 'sign up',
      createdAt: '2020-01-01 00:00:00',
    },
    {
      action: 'login',
      createdAt: '2020-01-01 00:00:00',
    },
    {
      action: 'update me',
      createdAt: '2020-01-01 00:00:01',
    },
  ],
}
```

### DELETE /users/:id/password

(Manager Auth Required) 사용자 비밀번호 초기화

Output:

```js
{
  message: 'success',
}
```


### GET /users/:id/privacy

(Manager Auth Required) 사용자 정보공개설정 조회

Output:

```js
{
  message: 'success',
  privacy: {
    name: true,
    nameEnglish: true,
    level: true,
    email: false,
    phone: false,
    picture: true,
  },
}
```
