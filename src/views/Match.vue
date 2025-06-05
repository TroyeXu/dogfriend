<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">看護媒合推薦</div>
        <p v-if="recommended">
          根據評分推薦：{{ recommended.name }} ({{ recommended.rating }})
        </p>
        <p v-else>暫無推薦資料</p>
      </q-card-section>
    </q-card>
  </q-page>
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
.info-card {
  max-width: 500px;
  width: 100%;
}
</style>
