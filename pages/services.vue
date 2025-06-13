<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">服務介紹</div>
      </q-card-section>
      <q-separator />
      <q-list bordered>
        <q-expansion-item icon="home" label="居家照顧" class="q-px-sm">
          <div class="q-pa-sm">
            提供到府日常照料與生活協助。
          </div>
        </q-expansion-item>
        <q-expansion-item icon="local_hospital" label="醫院看護" class="q-px-sm">
          <div class="q-pa-sm">
            協助住院期間的照護需求。
          </div>
        </q-expansion-item>
        <q-expansion-item icon="translate" label="外籍看護" class="q-px-sm">
          <div class="q-pa-sm">
            多語溝通、跨文化照護。
          </div>
        </q-expansion-item>
      </q-list>
      <q-card-actions align="right">
        <q-btn flat color="primary" to="/contact" label="聯繫我們" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
</script>

