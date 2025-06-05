<template>
  <div class="page">
    <h2>看護媒合推薦</h2>
    <p v-if="recommended">根據評分推薦：{{ recommended.name }} ({{ recommended.rating }})</p>
    <p v-else>暫無推薦資料</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCaregiverStore } from '../store/caregivers'

const store = useCaregiverStore()
const { caregivers } = storeToRefs(store)

const recommended = computed(() => {
  return caregivers.value.slice().sort((a, b) => b.rating - a.rating)[0]
})
</script>

<style scoped>
.page {
  padding: 1rem;
}
</style>
