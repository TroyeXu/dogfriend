<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card">
      <q-card-section class="text-center">
        <div class="text-h6 q-mb-sm">下載行動 App</div>
        <p>掃描 QR Code 或前往商店下載，隨時掌握服務進度。</p>
      </q-card-section>

      <q-separator />

      <q-card-section class="row justify-center q-gutter-md">
        <q-img
          src="https://via.placeholder.com/120"
          alt="QR Code"
          width="120"
          height="120"
        />

        <div class="column q-gutter-sm">
          <q-btn icon="phone_iphone" label="App Store" color="primary" outline />
          <q-btn icon="android" label="Google Play" color="primary" outline />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" to="/" label="回首頁" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
</script>

