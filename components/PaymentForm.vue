<script setup>
import { ref } from 'vue'
import { usePaymentsStore } from '../stores/payments'

const date = ref('')
const amount = ref(0)
const method = ref('')
const status = ref('')
const store = usePaymentsStore()

function submit() {
  if (!date.value || !amount.value || !method.value || !status.value) return
  store.addPayment({
    id: Date.now(),
    date: date.value,
    amount: Number(amount.value),
    method: method.value,
    status: status.value
  })
  date.value = ''
  amount.value = 0
  method.value = ''
  status.value = ''
}
</script>

<template>
  <q-form @submit.prevent="submit" class="q-mt-md">
    <q-input v-model="date" label="日期" type="date" class="q-mb-sm" />
    <q-input
      v-model.number="amount"
      label="金額"
      type="number"
      class="q-mb-sm"
    />
    <q-input v-model="method" label="付款方式" class="q-mb-sm" />
    <q-input v-model="status" label="狀態" class="q-mb-sm" />
    <q-btn type="submit" color="primary" label="新增紀錄" class="full-width" />
  </q-form>
</template>
