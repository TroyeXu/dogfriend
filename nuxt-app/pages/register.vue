<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card" style="min-width:300px;max-width:400px;">
      <q-card-section>
        <div class="text-h6 q-mb-sm">註冊</div>
        <RegisterForm @success="onSuccess" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import RegisterForm from '../components/RegisterForm.vue'

const router = useRouter()
function onSuccess() {
  router.push('/dashboard')
}
</script>

