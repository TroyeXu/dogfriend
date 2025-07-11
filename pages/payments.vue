<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">支付紀錄</div>
        <p>在此查看支付狀態與歷史。</p>

        <q-list bordered class="rounded-borders q-mt-md" v-if="payments.length">
          <q-item v-for="p in payments" :key="p.id">
            <q-item-section>{{ p.date }}</q-item-section>
            <q-item-section>{{ p.amount }}</q-item-section>
            <q-item-section>{{ p.method }}</q-item-section>
            <q-item-section>{{ p.status }}</q-item-section>
          </q-item>
        </q-list>
        <div v-else class="q-mt-md">尚無支付紀錄</div>

        <q-separator spaced />
        <PaymentForm />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import PaymentForm from '../components/PaymentForm.vue'
import { usePaymentsStore } from '../stores/payments'

const store = usePaymentsStore()
const { payments } = storeToRefs(store)
</script>

