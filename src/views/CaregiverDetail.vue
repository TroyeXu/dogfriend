<template>
  <div v-if="caregiver" class="caregiver-detail">
    <h2>{{ caregiver.name }}</h2>
    <p>經驗：{{ caregiver.experience }}</p>
    <p>技能：{{ caregiver.skills }}</p>
    <div>
      <h3>證照</h3>
      <ul>
        <li v-for="(l, i) in caregiver.licenses" :key="i">{{ l }}</li>
      </ul>
    </div>
    <p>評分：{{ caregiver.rating }}</p>
    <p>可用時間：{{ caregiver.available }}</p>
  </div>
  <div v-else>
    找不到看護員資訊
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCaregiverStore } from '../store/caregivers'

const route = useRoute()
const store = useCaregiverStore()
const caregiver = store.getById(route.params.id)
</script>

<style scoped>
.caregiver-detail {
  padding: 1rem;
}
</style>
