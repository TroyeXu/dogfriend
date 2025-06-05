<template>
  <div class="page">
    <h2>照護資源與常見問題</h2>
    <h3 class="q-mt-md">文章</h3>
    <q-list bordered class="rounded-borders q-mb-lg">
      <q-item v-for="(a, i) in articles" :key="i">
        <q-item-section>{{ a }}</q-item-section>
      </q-item>
    </q-list>
    <h3>FAQ</h3>
    <q-list bordered class="rounded-borders">
      <q-expansion-item v-for="(q, i) in faqs" :key="i" :label="q.q">
        {{ q.a }}
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
const articles = [
  '如何選擇適合的看護員',
  '居家照護的注意事項'
]

const faqs = [
  { q: '如何預約看護？', a: '可透過搜尋後直接聯繫我們協助排程。' },
  { q: '是否提供試用？', a: '初次服務可享一次免費試用時段。' }
]
</script>

<style scoped>
.page {
  padding: 1rem;
}
.rounded-borders {
  border-radius: 8px;
}
</style>
