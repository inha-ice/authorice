import Level from '@/constants/Level'
import { getToken } from '@/utils/token'

export default async function ({ $axios, redirect }) {
  $axios.setToken(getToken(), 'Bearer')
  const { user } = await $axios.$get('/auth/me')
  if (!(user.level & (Level.ADMIN | Level.OWNER))) {
    alert('접근 권한이 없습니다.')
    redirect('/me')
  }
}
