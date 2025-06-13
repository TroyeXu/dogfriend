<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">搜尋看護員</div>
    <q-input
      v-model="query"
      label="搜尋"
      placeholder="輸入姓名或技能"
      outlined
      class="q-mb-md"
      dense
      debounce="300"
      prepend-icon="search"
    />

    <div v-if="filteredCaregivers.length" class="caregiver-list">
      <CaregiverCard
        v-for="c in filteredCaregivers"
        :key="c.id"
        :caregiver="c"
      />
    </div>
    <q-banner v-else class="bg-grey-2 text-grey-8 q-pa-md">
      找不到符合條件的看護員
    </q-banner>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCaregiverStore } from '../store/caregivers'
import CaregiverCard from '../components/CaregiverCard.vue'

const store = useCaregiverStore()
const { caregivers } = storeToRefs(store)
const query = ref('')

const sortedCaregivers = computed(() =>
  [...caregivers.value].sort((a, b) => b.rating - a.rating)
)

const filteredCaregivers = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return sortedCaregivers.value
  return sortedCaregivers.value.filter(c =>
    c.name.toLowerCase().includes(q) || c.skills.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
.caregiver-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
