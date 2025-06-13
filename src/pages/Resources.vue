<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">照護資源與常見問題</div>
        <div class="q-mt-md text-subtitle2">文章</div>
        <q-list bordered class="rounded-borders q-mb-lg">
          <q-item v-for="(a, i) in articles" :key="i">
            <q-item-section>{{ a }}</q-item-section>
          </q-item>
        </q-list>
        <div class="text-subtitle2">FAQ</div>
        <q-list bordered class="rounded-borders">
          <q-expansion-item v-for="(q, i) in faqs" :key="i" :label="q.q">
            {{ q.a }}
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
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

