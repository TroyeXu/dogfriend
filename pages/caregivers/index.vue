<template>
  <q-page class="q-pa-md">
    <div class="caregiver-list">
      <CaregiverCard v-for="c in caregivers" :key="c.id" :caregiver="c" />
    </div>
  </q-page>
</template>

<script setup>
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
