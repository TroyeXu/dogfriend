<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card" style="min-width: 300px">
      <q-card-section>
        <div class="text-h6 q-mb-md">登入</div>
        <LoginForm @success="onSuccess" />
        <div class="q-mt-md text-caption">
          還沒有帳號？
          <router-link to="/register">立即註冊</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('登入 - DogFriend', '登入帳戶管理您的服務與排程')
import LoginForm from '../components/LoginForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function onSuccess() {
  router.push('/dashboard')
}
</script>
