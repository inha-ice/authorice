<template>
  <main class="page-wrapper">
    <section class="page">
      <div class="container">
        <a class="float-text link" @click="$router.push('/me')">내 정보</a>
        <logo size="80px" />
        <h1 class="title">
          사용자 관리
        </h1>
        <table class="table">
          <thead>
            <tr class="table__row">
              <th class="table__head">
                학번
              </th>
              <th class="table__head">
                이름
              </th>
              <th class="table__head">
                권한
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id" class="table__row" @click="showDetail(index)">
              <td class="table__cell">
                {{ user.id }}
              </td>
              <td class="table__cell">
                {{ user.name }}
              </td>
              <td class="table__cell">
                {{ stringifyLevel(user.level) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="page page--popup">
      <div v-if="focusIndex >= 0" class="container">
        <h1 class="title">
          사용자 정보 수정
        </h1>
        <text-field
          v-model="users[focusIndex].id"
          label="학번"
          name="id"
          placeholder="학번을 입력해주세요"
          disabled
          required
        />
        <text-field v-model="users[focusIndex].name" label="이름" name="name" placeholder="이름을 입력해주세요" disabled />
        <text-field
          v-model="users[focusIndex].nameEnglish"
          label="이름(영문)"
          name="name-english"
          placeholder="이름을 입력해주세요"
          disabled
        />
        <text-field
          v-model="users[focusIndex].email"
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요"
          disabled
          type="email"
        />
        <text-field
          v-model="users[focusIndex].phone"
          label="전화번호"
          name="phone"
          placeholder="전화번호를 입력해주세요"
          disabled
          type="tel"
        />
        <outline-button @click="resetPassword(users[focusIndex])">
          비밀번호 초기화
        </outline-button>
      </div>
      <div v-else />
    </section>
  </main>
</template>

<script>
import Level from '@/constants/Level'
import Logo from '@/components/Logo'
import OutlineButton from '@/components/OutlineButton'
import TextField from '@/components/TextField'
import { getToken } from '@/utils/token'

export default {
  middleware: ['auth', 'manager'],
  components: {
    Logo,
    OutlineButton,
    TextField
  },
  async asyncData ({ $axios, redirect }) {
    $axios.setToken(getToken(), 'Bearer')
    try {
      const { users } = await $axios.$get('/users')
      return {
        users: users.map(user => ({
          id: String(user.id),
          name: user.name,
          nameEnglish: user.nameEnglish,
          level: user.level,
          email: user.email,
          phone: user.phone,
          picture: user.picture
        }))
      }
    } catch (e) {
      redirect('/me')
    }
  },
  data () {
    return {
      focusIndex: -1
    }
  },
  methods: {
    async resetPassword (user) {
      const { $axios } = this
      $axios.setToken(getToken(), 'Bearer')
      await $axios.$delete(`/users/${user.id}/password`)
      alert('비밀번호가 초기화되었습니다.')
    },
    showDetail (index) {
      this.focusIndex = index
    },
    stringifyLevel (level) {
      return (Object.entries(Level).find(([key, value]) => value === level) || ['null'])[0]
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 50vw);
  grid-auto-rows: min-content;
}

@media (max-width: 1024px) {
  .page-wrapper {
    grid-template-columns: repeat(2, 100vw);
  }
}

.page {
  min-height: 100vh;
}

.page--popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 50%;
  z-index: 10;
  background-color: #fff;
  transition: left 1s, right 1s;
}

@media (max-width: 1024px) {
  .page--popup {
    right: -50%;
    left: 100%;
  }
}

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

.table {
  width: 100%;
  border-collapse: collapse;
}

.table__row {
  text-align: center;
  background-color: #fff;
}

.table__row:hover {
  text-align: center;
  background-color: #fafcff;
}

.table__head {
  padding: 1rem;
  font-weight: bold;
  color: #181924;
}

.table__cell {
  padding: 1rem;
  font-weight: normal;
  color: #181924;
  border-top: 1px #eee solid;
}
</style>
