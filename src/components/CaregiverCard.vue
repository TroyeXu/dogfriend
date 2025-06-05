<template>
  <div class="caregiver-card" @click="goDetail">
    <h3>{{ caregiver.name }}</h3>
    <p>{{ caregiver.experience }}</p>
    <p>{{ caregiver.skills }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  caregiver: {
    type: Object,
    required: true
  }
})
const router = useRouter()
function goDetail() {
  router.push(`/caregivers/${props.caregiver.id}`)
}
</script>

<style scoped>
.caregiver-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  cursor: pointer;
}
</style>
