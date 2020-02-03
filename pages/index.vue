<template>
  <main class="page-wrapper">
    <section
      class="page-cover"
      :class="{ 'page-cover--init': pageCover === 'init', 'page-cover--left': pageCover === 'left', 'page-cover--right': pageCover === 'right' }"
    >
      <img class="banner" src="@/assets/banner.svg" alt="Banner">
    </section>
    <section class="page">
      <div class="container">
        <a class="float-text link" @click="goSignUp">통합인증 가입하기</a>
        <logo size="80px" />
        <h1 class="title">
          Login
        </h1>
        <text-field v-model="loginForm.id" label="학번" placeholder="학번을 입력해주세요" />
        <text-field
          v-model="loginForm.password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type="password"
        />
        <div class="row">
          <a class="link">비밀번호를 잊으셨나요?</a>
        </div>
        <outline-button @click="login">
          LOGIN
        </outline-button>
      </div>
    </section>
    <section class="page">
      <div class="container">
        <a class="float-text link" @click="goLogin">이미 계정이 있으신가요?</a>
        <logo size="80px" />
        <h1 class="title">
          Sign Up
        </h1>
        <text-field v-model="signUpForm.id" label="학번" placeholder="학번을 입력해주세요" />
        <text-field v-model="signUpForm.name" label="이름" placeholder="이름을 입력해주세요" />
        <text-field
          v-model="signUpForm.password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type="password"
        />
        <text-field
          v-model="signUpForm.passwordRepeat"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
          type="password"
        />
        <checkbox v-model="signUpForm.terms">
          <a class="link">이용약관</a> 동의(필수)
        </checkbox>
        <checkbox v-model="signUpForm.privacyPolicy">
          <a class="link">개인정보취급방침</a> 동의(필수)
        </checkbox>
        <outline-button @click="signUp">
          SIGN UP
        </outline-button>
      </div>
    </section>
  </main>
</template>

<script>
import Checkbox from '@/components/Checkbox.vue'
import Logo from '@/components/Logo.vue'
import OutlineButton from '@/components/OutlineButton.vue'
import TextField from '@/components/TextField.vue'

const { REDIRECT_URL } = process.env

const isUserId = text => /^\d{8}$/.test(text)
const isUserName = text => text.length <= 50
const isPassword = text => text.length >= 4

const popup = (message) => {
  console.log(message)
  alert(message)
}

const redirect = () => {
  const params = new URLSearchParams(window.location.search)
  const url = params.get('redirect_url') || REDIRECT_URL
  window.location.href = url
}

export default {
  components: {
    Checkbox,
    Logo,
    OutlineButton,
    TextField
  },
  data () {
    return {
      pageCover: 'init',
      loginForm: {
        id: '',
        password: ''
      },
      signUpForm: {
        id: '',
        name: '',
        password: '',
        passwordRepeat: '',
        terms: false,
        privacyPolicy: false
      }
    }
  },
  methods: {
    goLogin () {
      const pageWrapper = document.querySelector('.page-wrapper')
      pageWrapper.scrollLeft = 0
      this.pageCover = 'right'
    },
    goSignUp () {
      const pageWrapper = document.querySelector('.page-wrapper')
      pageWrapper.scrollLeft = 10000
      this.pageCover = 'left'
    },
    async login () {
      const { id, password } = this.loginForm
      if (id && isUserId(id) && password && isPassword(password)) {
        try {
          await this.$axios.$post('/auth', { id, password })
          popup('로그인 성공')
          redirect()
        } catch (e) {
          popup('로그인 실패: 올바르지 않은 아이디 또는 비밀번호')
        }
      } else {
        popup('로그인 실패: 아이디와 비밀번호를 입력해주세요')
      }
    },
    async signUp () {
      const {
        id,
        name,
        password,
        passwordRepeat,
        terms,
        privacyPolicy
      } = this.signUpForm
      if (terms && privacyPolicy) {
        if (
          id &&
          isUserId(id) &&
          name &&
          isUserName(name) &&
          password &&
          isPassword(password) &&
          password === passwordRepeat
        ) {
          try {
            await this.$axios.$post('/users', { id, name, password })
            popup('가입 성공')
            redirect()
          } catch (e) {
            popup('가입 실패')
          }
        } else {
          popup('가입 실패: 아이디, 이름, 비밀번호를 모두 입력해주세요')
        }
      } else {
        popup('가입 실패: 이용약관과 개인정보취급방침에 동의해주세요')
      }
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 50vw);
  grid-auto-rows: min-content;
  height: 100vh;
  overflow-x: hidden;
}

@media (max-width: 1024px) {
  .page-wrapper {
    grid-template-columns: repeat(2, 100vw);
  }
}

.page-cover {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #181924;
}

@media (max-width: 1024px) {
  .page-cover {
    display: none;
  }
}

.page-cover--init {
  right: 0;
  left: 50%;
}

.page-cover--left {
  animation: translate-left 1s ease forwards;
}

.page-cover--right {
  animation: translate-right 1s ease forwards;
}

.page {
  flex: 1;
  height: 100vh;
  background-color: #fff;
}

.container {
  max-width: 768px;
  padding: 0 4rem;
  margin: 4rem auto;
}

.banner {
  max-width: 512px;
}

.title {
  margin: 3rem 0 2rem;
  font-size: 2rem;
  font-weight: normal;
  color: #181924;
}

.row {
  margin: 0.25rem 0;
  color: #181924;
}

.link {
  font-size: 1rem;
  color: #434391;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.5s;
}

.link:hover {
  color: #4c4cfc;
}

.float-text {
  float: right;
}

@keyframes translate-left {
  0% {
    right: 0;
    left: 50%;
  }

  50% {
    right: 0;
    left: 0;
  }

  100% {
    right: 50%;
    left: 0;
  }
}

@keyframes translate-right {
  0% {
    right: 50%;
    left: 0;
  }

  50% {
    right: 0;
    left: 0;
  }

  100% {
    right: 0;
    left: 50%;
  }
}
</style>
