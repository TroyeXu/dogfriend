<template>
  <div class="page">
    <h2>用戶評價</h2>
    <q-list bordered class="rounded-borders">
      <q-item v-for="(r, i) in reviews" :key="i">
        <q-item-section>
          <q-item-label>{{ r.name }}</q-item-label>
          <q-item-label caption>{{ r.comment }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-rating v-model="r.rating" readonly :max="5" color="amber" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
const reviews = [
  { name: '陳先生', comment: '看護服務非常專業且貼心。', rating: 5 },
  { name: '林小姐', comment: '迅速找到合適的看護員，感謝！', rating: 4 }
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
