<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="q-mr-sm"
          @click="drawer = !drawer"
        />
        <div class="q-gutter-sm q-hidden-xs">
          <q-btn flat to="/" label="首頁" />
          <q-btn flat to="/services" label="服務介紹" />
          <q-btn flat to="/caregivers" label="看護列表" />
          <q-btn flat to="/pricing" label="計費" />
          <q-btn flat to="/about" label="關於我們" />
          <q-btn flat to="/subsidy" label="補助資訊" />
          <q-btn flat to="/blog" label="常見問題" />
          <q-btn flat to="/contact" label="聯繫我們" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="left" overlay class="q-pa-md">
      <q-list>
        <q-item v-for="item in menuItems" :key="item.to" clickable v-ripple :to="item.to" @click="drawer = false">
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const menuItems = [
  { label: '首頁', to: '/' },
  { label: '服務介紹', to: '/services' },
  { label: '看護列表', to: '/caregivers' },
  { label: '計費', to: '/pricing' },
  { label: '關於我們', to: '/about' },
  { label: '補助資訊', to: '/subsidy' },
  { label: '常見問題', to: '/blog' },
  { label: '聯繫我們', to: '/contact' }
]
</script>
