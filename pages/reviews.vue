<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">用戶評價</div>

        <div class="row items-center q-mt-sm">
          <span class="text-subtitle2 q-mr-sm">平均評分</span>
          <q-rating
            :model-value="averageRating"
            readonly
            color="amber"
            size="sm"
          />
          <q-badge color="primary" class="q-ml-sm">{{
            averageRating.toFixed(1)
          }}</q-badge>
        </div>

        <q-list bordered class="rounded-borders q-mt-md">
          <q-item v-for="(r, i) in reviews" :key="i">
            <q-item-section>
              <q-item-label>{{ r.name }}</q-item-label>
              <q-item-label caption>{{ r.comment }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-rating v-model="r.rating" readonly :max="5" color="amber" />
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator spaced />

        <q-form @submit.prevent="submitReview" class="q-mt-md">
          <q-input v-model="name" label="姓名" dense class="q-mb-sm" />
          <q-input
            v-model="comment"
            label="評論"
            type="textarea"
            autogrow
            dense
            class="q-mb-sm"
          />
          <div class="row items-center q-mb-md">
            <span class="text-subtitle2 q-mr-sm">評分</span>
            <q-rating v-model="rating" :max="5" color="amber" />
          </div>
          <q-btn type="submit" color="primary" label="送出" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('用戶評價 - DogFriend', '查看其他用戶對 DogFriend 的評價與回饋')
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReviewStore } from '../stores/reviews'

const store = useReviewStore()
const { reviews, averageRating } = storeToRefs(store)

const name = ref('')
const comment = ref('')
const rating = ref(0)

function submitReview() {
  if (!name.value || !comment.value || !rating.value) return
  store.addReview({
    name: name.value,
    comment: comment.value,
    rating: rating.value,
  })
  name.value = ''
  comment.value = ''
  rating.value = 0
}
</script>
