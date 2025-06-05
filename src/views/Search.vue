<template>
  <div class="page">
    <h2>搜尋看護員</h2>
    <q-input v-model="query" label="輸入姓名或技能" outlined class="q-mb-md" />
    <div class="caregiver-list">
      <CaregiverCard
        v-for="c in filteredCaregivers"
        :key="c.id"
        :caregiver="c"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCaregiverStore } from '../store/caregivers'
import CaregiverCard from '../components/CaregiverCard.vue'

const store = useCaregiverStore()
const { caregivers } = storeToRefs(store)
const query = ref('')

const filteredCaregivers = computed(() => {
  if (!query.value) return caregivers.value
  return caregivers.value.filter(c =>
    c.name.includes(query.value) || c.skills.includes(query.value)
  )
})
</script>

<style scoped>
.page {
  padding: 1rem;
}
.caregiver-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
