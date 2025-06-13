<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">支付紀錄</div>
        <q-table
          :rows="payments"
          :columns="columns"
          row-key="id"
          flat
          bordered
          class="q-mt-md"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePaymentsStore } from '../store/payments'

const store = usePaymentsStore()
const { payments } = storeToRefs(store)

const columns = [
  { name: 'date', label: '日期', field: 'date' },
  { name: 'amount', label: '金額', field: 'amount', align: 'right' },
  { name: 'method', label: '方式', field: 'method' },
  { name: 'status', label: '狀態', field: 'status' }
]
</script>

