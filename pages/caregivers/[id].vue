<template>
  <q-page class="q-pa-md flex flex-center">
    <div v-if="caregiver" class="detail-wrapper">
      <q-card flat bordered class="info-card">
        <q-card-section>
          <div class="text-h6">{{ caregiver.name }}</div>
          <p>經驗：{{ caregiver.experience }}</p>
          <p>技能：{{ caregiver.skills }}</p>
          <div class="q-mt-sm">
            <div class="text-subtitle2 q-mb-xs">證照</div>
            <q-list dense>
              <q-item v-for="(l, i) in caregiver.licenses" :key="i">
                <q-item-section>{{ l }}</q-item-section>
              </q-item>
            </q-list>
          </div>
          <p class="q-mt-sm">評分：{{ caregiver.rating }}</p>
          <p>可用時間：{{ caregiver.available }}</p>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>找不到看護員資訊</div>
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCaregiverStore } from '../stores/caregivers'

const route = useRoute()
const store = useCaregiverStore()
const caregiver = store.getById(route.params.id)
</script>

