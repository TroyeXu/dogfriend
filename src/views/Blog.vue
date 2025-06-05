<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">知識分享與常見問題</div>
    <q-card flat bordered v-for="(post, i) in posts" :key="i" class="q-mb-sm">
      <q-card-section>
        <div class="text-subtitle1">{{ post.title }}</div>
        <div class="text-caption text-grey">{{ post.date }}</div>
        <p class="q-mt-sm">{{ post.excerpt }}</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const posts = [
  { title: '如何選擇看護', date: '2024/05/10', excerpt: '教你從需求到媒合的注意事項' },
  { title: '照護常見QA', date: '2024/05/05', excerpt: '彙整雇主最關心的問題' }
]
</script>

<style scoped>
</style>
