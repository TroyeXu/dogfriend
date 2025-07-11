<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">搜尋看護員</div>
    <q-input v-model="query" label="輸入姓名或技能" outlined class="q-mb-md" />
    <div class="caregiver-list">
      <CaregiverCard
        v-for="c in filteredCaregivers"
        :key="c.id"
        :caregiver="c"
      />
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('搜尋服務 - DogFriend', '透過關鍵字快速搜尋照護資源')
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCaregiverStore } from '../stores/caregivers'
import CaregiverCard from '../components/CaregiverCard.vue'

const store = useCaregiverStore()
const { caregivers } = storeToRefs(store)
const query = ref('')

const filteredCaregivers = computed(() => {
  if (!query.value) return caregivers.value
  return caregivers.value.filter(
    (c) => c.name.includes(query.value) || c.skills.includes(query.value),
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
