<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">看護媒合推薦</div>
    <div v-if="recommended.length" class="caregiver-list">
      <CaregiverCard
        v-for="c in recommended"
        :key="c.id"
        :caregiver="c"
      />
    </div>
    <div v-else>暫無推薦資料</div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCaregiverStore } from '../store/caregivers'
import CaregiverCard from '../components/CaregiverCard.vue'

const store = useCaregiverStore()
const { caregivers } = storeToRefs(store)

const recommended = computed(() => {
  return caregivers.value
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
})
</script>

<style scoped>
.caregiver-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>

