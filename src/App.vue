<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat to="/" label="首頁" />
        <q-btn flat to="/services" label="服務介紹" />
        <q-btn flat to="/caregivers" label="看護列表" />
        <q-btn flat to="/pricing" label="計費" />
        <q-btn flat to="/about" label="關於我們" />
        <q-btn flat to="/subsidy" label="補助資訊" />
        <q-btn flat to="/blog" label="常見問題" />
        <q-btn flat to="/contact" label="聯繫我們" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>
