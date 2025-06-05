<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6 q-mb-sm">成為看護員</div>
        <p>這裡簡述看護員如何加入平台。</p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="primary" to="/register" label="立即加入" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
</script>

<style scoped>
.info-card {
  max-width: 600px;
  width: 100%;
}
</style>
