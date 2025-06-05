<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">價格資訊</div>
        <q-table
          :rows="plans"
          :columns="columns"
          flat
          bordered
          class="q-mt-md"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const columns = [
  { name: 'type', label: '方案', field: 'type' },
  { name: 'price', label: '價格', field: 'price' },
  { name: 'desc', label: '內容', field: 'desc' }
]

const plans = [
  { type: '按時付費', price: 'NT$300/時', desc: '彈性選擇看護時數' },
  { type: '包班制', price: 'NT$6000/天', desc: '全天候專業照護' }
]
</script>

<style scoped>
.info-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
