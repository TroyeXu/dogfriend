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
          <q-btn flat to="/" :label="$t('nav.home')" />
          <q-btn flat to="/services" :label="$t('nav.services')" />
          <q-btn flat to="/caregivers" :label="$t('nav.caregivers')" />
          <q-btn flat to="/pricing" :label="$t('nav.pricing')" />
          <q-btn flat to="/about" :label="$t('nav.about')" />
          <q-btn flat to="/subsidy" :label="$t('nav.subsidy')" />
          <q-btn flat to="/advantages" :label="$t('nav.advantages')" />
          <q-btn flat to="/blog" :label="$t('nav.blog')" />
          <q-btn flat to="/contact" :label="$t('nav.contact')" />
        </div>
        <div class="q-ml-md">
          <q-btn flat size="sm" @click="locale = 'zh'">中文</q-btn>
          <q-btn flat size="sm" @click="locale = 'en'">EN</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="left" overlay class="q-pa-md">
      <q-list>
        <q-item
          v-for="item in menuItems"
          :key="item.to"
          clickable
          v-ripple
          :to="item.to"
          @click="drawer = false"
        >
          <q-item-section>{{ $t(`nav.${item.key}`) }}</q-item-section>
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
import { useI18n } from 'vue-i18n'

const drawer = ref(false)
const { locale } = useI18n()
const menuItems = [
  { key: 'home', to: '/' },
  { key: 'services', to: '/services' },
  { key: 'caregivers', to: '/caregivers' },
  { key: 'pricing', to: '/pricing' },
  { key: 'about', to: '/about' },
  { key: 'subsidy', to: '/subsidy' },
  { key: 'advantages', to: '/advantages' },
  { key: 'blog', to: '/blog' },
  { key: 'contact', to: '/contact' },
]
</script>
