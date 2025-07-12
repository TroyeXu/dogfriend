<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">聯繫我們</div>
      </q-card-section>
      <q-separator />
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon name="phone" color="primary" />
          </q-item-section>
          <q-item-section>電話：02-1234-5678</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="email" color="primary" />
          </q-item-section>
          <q-item-section>Email：service@example.com</q-item-section>
        </q-item>
      </q-list>
      <q-separator class="q-my-md" />
      <q-card-section>
        <q-form @submit.prevent="submit">
          <q-input v-model="name" label="姓名" outlined dense class="q-mb-sm" />
          <q-input
            v-model="email"
            type="email"
            label="Email"
            outlined
            dense
            class="q-mb-sm"
          />
          <q-input
            v-model="message"
            type="textarea"
            label="訊息"
            outlined
            class="q-mb-md"
          />
          <div class="text-right">
            <q-btn type="submit" color="primary" label="送出" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'
import { useRuntimeConfig, useRoute, useHead } from '#imports'
import { ref } from 'vue'

usePageSeo('聯繫我們 - DogFriend', '歡迎透過電話或 Email 與我們聯絡')

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: '聯繫我們 - DogFriend',
        url: baseUrl + route.fullPath,
        description: '歡迎透過電話或 Email 與我們聯絡',
      }),
    },
  ],
})

const name = ref('')
const email = ref('')
const message = ref('')
</script>
