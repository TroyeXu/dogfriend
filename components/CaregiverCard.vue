<template>
  <div class="caregiver-card" @click="goDetail">
    <h3>{{ caregiver.name }}</h3>
    <p>{{ caregiver.experience }}</p>
    <p>{{ caregiver.skills }}</p>
    <q-rating v-model="rating" readonly :max="5" color="amber" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const props = defineProps({
  caregiver: {
    type: Object,
    required: true
  }
})
const router = useRouter()
const rating = ref(props.caregiver.rating)
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
