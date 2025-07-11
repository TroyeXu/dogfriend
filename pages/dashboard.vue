<template>
  <q-page class="q-pa-md">
    <div v-if="currentUser">
      <q-card flat bordered class="info-card q-mb-md">
        <q-card-section>
          <div class="text-h6">歡迎回來，{{ currentUser.name }}</div>
          <div class="text-subtitle2">{{ currentUser.email }}</div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="info-card q-mb-md">
        <q-card-section>
          <div class="text-h6">推薦看護員</div>
          <div v-if="recommended">
            {{ recommended.name }} - 評分：{{ recommended.rating }}
          </div>
          <div v-else>暫無推薦資料</div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="info-card">
        <q-card-section>
          <div class="text-h6">即將到來的排程</div>
          <q-list>
            <q-item v-for="(item, i) in schedule" :key="i" dense>
              <q-item-section>{{ item.date }}</q-item-section>
              <q-item-section>{{ item.time }}</q-item-section>
              <q-item-section>{{ item.caregiver }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div v-else class="flex flex-center">
      <q-card flat bordered class="info-card">
        <q-card-section>
          <div class="text-h6">尚未登入</div>
          <p>請先登入以查看儀表板內容。</p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('個人儀表板 - DogFriend', '快速查看推薦看護及即將到來的排程')
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useCaregiverStore } from '~/stores/caregivers'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)

const caregiverStore = useCaregiverStore()
const { caregivers } = storeToRefs(caregiverStore)

const recommended = computed(() => {
  return caregivers.value.slice().sort((a, b) => b.rating - a.rating)[0]
})

const schedule = ref([
  { date: '2024-06-20', time: '10:00', caregiver: '王小明' },
  { date: '2024-06-22', time: '14:00', caregiver: '李小美' },
])
</script>
