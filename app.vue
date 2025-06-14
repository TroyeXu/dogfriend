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
          aria-label="Menu"
        />
        <q-toolbar-title>護理服務計費系統</q-toolbar-title>
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

    <q-drawer 
      v-model="drawer" 
      side="left" 
      overlay 
      bordered
      :width="250"
      :breakpoint="700"
      class="bg-grey-2"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header>導航選單</q-item-label>
          <q-item
            v-for="item in menuItems"
            :key="item.to"
            clickable
            v-ripple
            :to="item.to"
            @click="drawer = false"
            exact
          >
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <NuxtPage />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-center">
            © 2025 護理服務計費系統 - 版權所有
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)

const menuItems = [
  { to: '/', label: '首頁' },
  { to: '/services', label: '服務介紹' },
  { to: '/caregivers', label: '看護列表' },
  { to: '/pricing', label: '計費' },
  { to: '/about', label: '關於我們' },
  { to: '/subsidy', label: '補助資訊' },
  { to: '/blog', label: '常見問題' },
  { to: '/contact', label: '聯繫我們' }
]
</script>
