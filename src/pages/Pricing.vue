<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div
        v-for="plan in plans"
        :key="plan.type"
        class="col-12 col-md-6 col-lg-4"
      >
        <q-card flat bordered class="info-card pricing-card">
          <q-card-section class="text-center">
            <div class="text-h6 q-mb-xs">{{ plan.type }}</div>
            <div class="text-h5 text-primary q-mb-sm">{{ plan.price }}</div>
            <div>{{ plan.desc }}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn color="primary" label="立即預約" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>

const plans = [
  { type: '按時付費', price: 'NT$300/時', desc: '彈性選擇看護時數' },
  { type: '包班制', price: 'NT$6000/天', desc: '全天候專業照護' },
  { type: '長期合約', price: '每月 NT$18,000 起', desc: '適合長期照護需求' }
]
</script>

