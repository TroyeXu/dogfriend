<template>
  <q-page class="q-pa-md">
    <div class="caregiver-list">
      <CaregiverCard v-for="c in caregivers" :key="c.id" :caregiver="c" />
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('看護列表 - DogFriend', '瀏覽所有專業看護員，找到最合適的人選')
import { storeToRefs } from 'pinia'
import CaregiverCard from '../components/CaregiverCard.vue'
import { useCaregiverStore } from '../stores/caregivers'

const store = useCaregiverStore()
const { caregivers } = storeToRefs(store)
</script>

<style scoped>
.caregiver-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
