<template>
  <main>
    <section class="container">
      <a class="float-text link" @click="logout">로그아웃</a>
      <logo size="80px" />
      <h1 class="title">
        안녕하세요, {{ profile.name }}님
        <span class="badge">관리자</span>
      </h1>
      <text-field v-model="profile.id" label="학번" placeholder="학번을 입력해주세요" required />
      <text-field v-model="profile.name" label="이름" placeholder="이름을 입력해주세요" required />
      <text-field v-model="profile.nameEnglish" label="이름(영문)" placeholder="이름을 입력해주세요" />
      <text-field v-model="profile.email" label="이메일" placeholder="이메일을 입력해주세요" type="email" />
      <text-field v-model="profile.phone" label="전화번호" placeholder="전화번호를 입력해주세요" type="tel" />
      <outline-button @click="saveProfile">
        저장
      </outline-button>
    </section>
    <section class="container">
      <h1 class="title">
        비밀번호 변경
      </h1>
      <text-field
        v-model="profile.passwordOld"
        label="이전 비밀번호"
        placeholder="사용하던 비밀번호를 입력해주세요"
        type="password"
        required
      />
      <text-field
        v-model="profile.passwordNew"
        label="새로운 비밀번호"
        placeholder="사용할 비밀번호를 입력해주세요"
        type="password"
        required
      />
      <text-field
        v-model="profile.passwordNewRepeat"
        label="새로운 비밀번호 확인"
        placeholder="사용할 비밀번호를 다시 입력해주세요"
        type="password"
        required
      />
      <outline-button @click="changePassword">
        변경
      </outline-button>
    </section>
    <section class="container">
      <h1 class="title">
        개인정보보호설정
      </h1>
      <checkbox v-model="privacy.name" required>
        이름 공개
      </checkbox>
      <checkbox v-model="privacy.nameEnglish" required>
        이름(영문) 공개
      </checkbox>
      <checkbox v-model="privacy.level" required>
        권한 공개
      </checkbox>
      <checkbox v-model="privacy.email" required>
        이메일 공개
      </checkbox>
      <checkbox v-model="privacy.phone" required>
        전화번호 공개
      </checkbox>
      <br>
      <outline-button @click="savePrivacy">
        저장
      </outline-button>
    </section>
  </main>
</template>

<script>
import Checkbox from '@/components/Checkbox.vue'
import Logo from '@/components/Logo.vue'
import OutlineButton from '@/components/OutlineButton.vue'
import TextField from '@/components/TextField.vue'

const isUserId = text => /^\d{8}$/.test(text)
const isUserName = text => text.length <= 50
const isUserPassword = text => text.length >= 4

export default {
  components: {
    Checkbox,
    Logo,
    OutlineButton,
    TextField
  },
  async asyncData ({ $axios, redirect }) {
    const token = window.localStorage.getItem('access_token')
    $axios.setToken(token, 'Bearer')
    const { user } = await $axios.$get('/auth/me')
    const { privacy } = await $axios.$get('/auth/me/privacy')
    return {
      profile: {
        id: String(user.id),
        name: user.name,
        nameEnglish: user.nameEnglish,
        email: user.email,
        phone: user.phone,
        picture: user.picture,
        passwordOld: '',
        passwordNew: '',
        passwordNewRepeat: ''
      },
      privacy: {
        name: privacy.name,
        nameEnglish: privacy.nameEnglish,
        level: privacy.level,
        email: privacy.email,
        phone: privacy.phone,
        picture: privacy.picture
      }
    }
  },
  methods: {
    changePassword () {},
    logout () {},
    saveProfile () {},
    savePrivacy () {}
  }
}
</script>

<style scoped>
.container {
  max-width: 1024px;
  padding: 0 4rem;
  margin: 4rem auto;
}

.title {
  margin: 3rem 0 2rem;
  font-size: 2rem;
  font-weight: normal;
  color: #181924;
}

.badge {
  padding: 0 0.5rem;
  font-size: 1rem;
  color: #fff;
  vertical-align: middle;
  background-color: #4c4cfc;
  border-radius: 0.25rem;
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
</style>
