<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">補助與保險資訊</div>
        <q-list bordered class="rounded-borders q-mt-md">
          <q-item v-for="(item, i) in subsidies" :key="i" clickable>
            <q-item-section>{{ item.name }}</q-item-section>
            <q-item-section side>
              <q-icon name="open_in_new" color="primary" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const subsidies = [
  { name: '長照補助' },
  { name: '看護保險方案' }
]
</script>

