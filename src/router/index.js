import { createRouter, createWebHistory } from 'vue-router'
import Calculator from '../views/Calculator.vue'
import CaregiverList from '../views/CaregiverList.vue'
import CaregiverDetail from '../views/CaregiverDetail.vue'

const routes = [
  { path: '/', name: 'calculator', component: Calculator },
  { path: '/caregivers', name: 'caregivers', component: CaregiverList },
  { path: '/caregivers/:id', name: 'caregiver-detail', component: CaregiverDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
