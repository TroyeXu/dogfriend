<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">聯繫我們</div>
      </q-card-section>
      <q-separator />
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon name="phone" color="primary" />
          </q-item-section>
          <q-item-section>電話：02-1234-5678</q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="email" color="primary" />
          </q-item-section>
          <q-item-section>Email：service@example.com</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
</script>

<style scoped>
.info-card {
  max-width: 500px;
  width: 100%;
}
</style>
