<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">排程管理</div>
        <p>這裡可以管理服務時間表。</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('排程管理 - DogFriend', '查看並管理您的照護排程')
</script>
