<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card q-pa-md" style="max-width: 380px;">
      <q-card-section class="text-center">
        <div class="text-h6 q-mb-sm">下載行動 App</div>
        <p>掃描 QR Code 或前往商店下載，隨時掌握服務進度。</p>
        <img
          class="qr-code q-my-md"
          src="https://api.qrserver.com/v1/create-qr-code/?data=https://www.example.com/app&size=150x150"
          alt="App QR Code"
        />
        <div class="row justify-center q-gutter-sm">
          <q-btn flat color="primary" label="App Store" />
          <q-btn flat color="secondary" label="Google Play" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
</script>

<style scoped>
.qr-code {
  width: 150px;
  height: 150px;
}
</style>

