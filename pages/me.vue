<template>
  <main>
    <section class="container">
      <div class="float-text">
        <a v-if="isManager" class="float-item link" @click="$router.push('/users')">사용자 관리</a>
        <a class="float-item link" @click="logout">로그아웃</a>
      </div>
      <logo size="80px" />
      <h1 class="title">
        안녕하세요, {{ profile.name }}님
      </h1>
      <text-field
        v-model="profile.id"
        label="학번"
        name="id"
        placeholder="학번을 입력해주세요"
        disabled
        required
      />
      <text-field v-model="profile.name" label="이름" name="name" placeholder="이름을 입력해주세요" />
      <text-field
        v-model="profile.nameEnglish"
        label="이름(영문)"
        name="name-english"
        placeholder="이름을 입력해주세요"
      />
      <text-field
        v-model="profile.email"
        label="이메일"
        name="email"
        placeholder="이메일을 입력해주세요"
        type="email"
      />
      <text-field
        v-model="profile.phone"
        label="전화번호"
        name="phone"
        placeholder="전화번호를 입력해주세요"
        type="tel"
      />
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
        name="password"
        placeholder="사용하던 비밀번호를 입력해주세요"
        type="password"
        required
      />
      <text-field
        v-model="profile.passwordNew"
        label="새로운 비밀번호"
        name="password-new"
        placeholder="사용할 비밀번호를 입력해주세요"
        type="password"
        required
      />
      <text-field
        v-model="profile.passwordNewRepeat"
        label="새로운 비밀번호 확인"
        name="password-new-repeat"
        placeholder="사용할 비밀번호를 다시 입력해주세요"
        type="password"
        required
      />
      <outline-button @click="changePassword">
        변경
      </outline-button>
    </section>
    <!-- <section class="container">
      <h1 class="title">개인정보보호설정</h1>
      <checkbox v-model="privacy.name" required>이름 공개</checkbox>
      <checkbox v-model="privacy.nameEnglish" required>이름(영문) 공개</checkbox>
      <checkbox v-model="privacy.level" required>권한 공개</checkbox>
      <checkbox v-model="privacy.email" required>이메일 공개</checkbox>
      <checkbox v-model="privacy.phone" required>전화번호 공개</checkbox>
      <br />
      <outline-button @click="savePrivacy">저장</outline-button>
    </section>-->
  </main>
</template>

<script>
import Level from '@/constants/Level'
// import Checkbox from '@/components/Checkbox'
import Logo from '@/components/Logo'
import OutlineButton from '@/components/OutlineButton'
import TextField from '@/components/TextField'
import { getToken, removeToken } from '@/utils/token'
import {
  isEmail,
  isPhoneNumber,
  isUserName,
  isUserPassword
} from '@/utils/validator'

export default {
  middleware: 'auth',
  components: {
    // Checkbox,
    Logo,
    OutlineButton,
    TextField
  },
  async asyncData ({ $axios, redirect }) {
    $axios.setToken(getToken(), 'Bearer')
    try {
      const { user } = await $axios.$get('/auth/me')
      // const { privacy } = await $axios.$get("/auth/me/privacy");
      return {
        profile: {
          id: String(user.id),
          name: user.name,
          nameEnglish: user.nameEnglish,
          level: user.level,
          email: user.email,
          phone: user.phone,
          picture: user.picture,
          passwordOld: '',
          passwordNew: '',
          passwordNewRepeat: ''
        },
        profileReadOnly: {
          id: String(user.id),
          name: user.name,
          nameEnglish: user.nameEnglish,
          level: user.level,
          email: user.email,
          phone: user.phone,
          picture: user.picture
        }
        // privacy: {
        //   name: privacy.name,
        //   nameEnglish: privacy.nameEnglish,
        //   level: privacy.level,
        //   email: privacy.email,
        //   phone: privacy.phone,
        //   picture: privacy.picture
        // },
        // privacyReadOnly: {
        //   name: privacy.name,
        //   nameEnglish: privacy.nameEnglish,
        //   level: privacy.level,
        //   email: privacy.email,
        //   phone: privacy.phone,
        //   picture: privacy.picture
        // }
      }
    } catch (e) {
      removeToken()
      redirect('/')
    }
  },
  computed: {
    isManager () {
      const { profile } = this
      return profile.level & (Level.ADMIN | Level.OWNER)
    }
  },
  methods: {
    async changePassword () {
      const { $axios, profile } = this
      if (
        profile.passwordOld &&
        isUserPassword(profile.passwordOld) &&
        profile.passwordNew &&
        isUserPassword(profile.passwordNew) &&
        profile.passwordNew === profile.passwordNewRepeat
      ) {
        $axios.setToken(getToken(), 'Bearer')
        await $axios.$patch('/auth/me', { password: profile.passwordNew })
        alert('비밀번호가 변경되었습니다.')
      } else {
        alert('비밀번호가 잘못되었습니다. 다시 확인해주세요.')
      }
    },
    logout () {
      const { $router } = this
      removeToken()
      $router.push('/')
    },
    async saveProfile () {
      const { $axios, profile, profileReadOnly } = this
      const updatedData = {}
      if (profile.name !== profileReadOnly.name) {
        if (profile.name === '') {
          updatedData.name = null
        } else if (isUserName(profile.name)) {
          updatedData.name = profile.name
        } else {
          alert('이름이 올바르지 않습니다')
        }
      }
      if (profile.nameEnglish !== profileReadOnly.nameEnglish) {
        if (profile.nameEnglish === '') {
          updatedData.nameEnglish = null
        } else if (isUserName(profile.nameEnglish)) {
          updatedData.nameEnglish = profile.nameEnglish
        } else {
          alert('이름이 올바르지 않습니다')
        }
      }
      if (profile.email !== profileReadOnly.email) {
        if (profile.email === '') {
          updatedData.email = null
        } else if (isEmail(profile.email)) {
          updatedData.email = profile.email
        } else {
          alert('올바르지 않은 이메일입니다.')
        }
      }
      if (profile.phone !== profileReadOnly.phone) {
        if (profile.phone === '') {
          updatedData.phone = null
        } else if (isPhoneNumber(profile.phone)) {
          updatedData.phone = profile.phone
        } else {
          alert('올바르지 않은 전화번호입니다.')
        }
      }
      // todo: picture
      if (Object.keys(updatedData).length >= 1) {
        $axios.setToken(getToken(), 'Bearer')
        await $axios.$patch('/auth/me', updatedData)
        Object.assign(profileReadOnly, updatedData)
        alert('저장했습니다.')
      } else {
        alert('수정할 정보를 입력해주세요.')
      }
    }
    // async savePrivacy() {}
  }
}
</script>

<style scoped>
.container {
  max-width: 768px;
  padding: 0 4rem;
  margin: 4rem auto;
}

.title {
  margin: 3rem 0 2rem;
  font-size: 2rem;
  font-weight: normal;
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

.float-item {
  margin: 0 0.5rem;
}
</style>
