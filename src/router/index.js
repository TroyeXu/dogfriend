import { createRouter, createWebHistory } from 'vue-router'
import Calculator from '../views/Calculator.vue'
import CaregiverList from '../views/CaregiverList.vue'
import CaregiverDetail from '../views/CaregiverDetail.vue'
import Services from '../views/Services.vue'
import Advantages from '../views/Advantages.vue'
import Pricing from '../views/Pricing.vue'
import Contact from '../views/Contact.vue'
import Guide from '../views/Guide.vue'
import Safety from '../views/Safety.vue'
import JoinCaregiver from '../views/JoinCaregiver.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Schedule from '../views/Schedule.vue'
import Payments from '../views/Payments.vue'
import Reviews from '../views/Reviews.vue'
import Match from '../views/Match.vue'
import Search from '../views/Search.vue'

const routes = [
  { path: '/', name: 'calculator', component: Calculator },
  { path: '/caregivers', name: 'caregivers', component: CaregiverList },
  { path: '/caregivers/:id', name: 'caregiver-detail', component: CaregiverDetail },
  { path: '/services', name: 'services', component: Services },
  { path: '/advantages', name: 'advantages', component: Advantages },
  { path: '/pricing', name: 'pricing', component: Pricing },
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/guide', name: 'guide', component: Guide },
  { path: '/safety', name: 'safety', component: Safety },
  { path: '/join', name: 'join-caregiver', component: JoinCaregiver },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/schedule', name: 'schedule', component: Schedule },
  { path: '/payments', name: 'payments', component: Payments },
  { path: '/reviews', name: 'reviews', component: Reviews },
  { path: '/match', name: 'match', component: Match },
  { path: '/search', name: 'search', component: Search }
]

const router = createRouter({
  history: createWebHistory('/dogfriend/'),  // 添加基礎路徑
  routes
})

export default router
