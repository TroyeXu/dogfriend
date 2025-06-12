<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">安全措施</div>
        <q-list bordered class="rounded-borders q-mt-md">
          <q-item v-for="(s, i) in safeties" :key="i">
            <q-item-section avatar>
              <q-icon name="check_circle" color="primary" />
            </q-item-section>
            <q-item-section>{{ s }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const safeties = [
  '完整背景調查',
  '定期教育訓練',
  '24小時客服支援'
]
</script>

