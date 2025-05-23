<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-blue-grey-9 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <h1 class="text-h4 q-my-none">專業護理服務計費系統</h1>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-card class="main-card" flat bordered>


      <!-- 篩選器區域 -->
      <q-card-section class="row q-col-gutter-md ">
        <q-select
          v-model="selectedCategory"
          :options="categories"
          label="服務類別篩選"
          outlined
          class="col-12 col-md-4"
        />
        <q-input
          v-model="searchText"
          label="搜尋服務項目"
          outlined
          class="col-12 col-md-4"
        />
      </q-card-section>

      <!-- 服務項目列表 -->
      <q-card-section>
        <q-list bordered>
          <q-item
            v-for="item in filteredItems"
            :key="item.code"
            clickable
            @click="toggleItem(item)"
            :class="{ 'selected-item': isSelected(item) }"
          >
            <q-item-section>
              <q-item-label class="text-weight-medium">{{ item.name }}</q-item-label>
              <q-item-label caption>
                <div class="row q-gutter-x-md">
                  <div>代碼：{{ item.code }}</div>
                  <div>單價：{{ item.price }} 元</div>
                  <div>時長：{{ item.duration }} 分鐘</div>
                  <div>類別：{{ item.category }}</div>
                </div>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox
                v-model="selectedItems"
                :val="item"
                color="primary"
                dense
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>


    </q-card>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row justify-between q-gutter-x-xl">
            <div>總服務時間：{{ formatDuration(totalDuration) }}</div>
            <div>總費用：{{ totalCost }} 元</div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'

const careItems = ref([
  { code: 'BA01', name: '基本身體清潔', price: 260, category: '日常照顧', duration: 30 },
  { code: 'BA02', name: '基本日常照顧', price: 195, category: '日常照顧', duration: 45 },
  { code: 'BA03', name: '測量生命徵象', price: 35, category: '健康監測', duration: 10 },
  { code: 'BA04', name: '協助進食或管灌餵食', price: 130, category: '營養支持', duration: 20 },
  { code: 'BA05', name: '餐食照顧', price: 310, category: '營養支持', duration: 60 },
  { code: 'BA07', name: '協助沐浴及洗頭', price: 325, category: '衛生護理', duration: 40 },
  { code: 'BA10', name: '翻身拍背', price: 155, category: '體位護理', duration: 15 },
  { code: 'BA11', name: '肢體關節活動', price: 195, category: '復健護理', duration: 30 },
  { code: 'BA12', name: '協助上下樓梯', price: 130, category: '行動輔助', duration: 25 },
  { code: 'BA13', name: '陪同外出', price: 195, category: '外出陪同', duration: 60 },
  { code: 'BA14', name: '陪同就醫', price: 685, category: '醫療陪同', duration: 120 },
  { code: 'BA15-1', name: '家務協助(自用)', price: 195, category: '居家服務', duration: 60 },
  { code: 'BA16-1', name: '代購代領代送', price: 130, category: '生活協助', duration: 45 },
  { code: 'BA18', name: '安全看視', price: 200, category: '安全監護', duration: 30 },
  { code: 'BA20', name: '陪伴服務', price: 175, category: '心理支持', duration: 60 },
  { code: 'BA22', name: '巡視服務', price: 130, category: '安全檢查', duration: 15 },
  { code: 'BA23', name: '協助洗頭', price: 200, category: '衛生護理', duration: 20 },
  { code: 'BA24', name: '協助排泄', price: 220, category: '衛生護理', duration: 15 },
  { code: 'GA09', name: '居家喘息服務(2小時)', price: 770, category: '特殊服務', duration: 120 }
])

const selectedItems = ref([])
const selectedCategory = ref('所有類別')
const searchText = ref('')

// 計算屬性
const categories = computed(() => [
  '所有類別',
  ...new Set(careItems.value.map(item => item.category))
])

const filteredItems = computed(() => {
  return careItems.value.filter(item => {
    const matchCategory = selectedCategory.value === '所有類別' || 
      item.category === selectedCategory.value
    const matchSearch = item.name.toLowerCase().includes(searchText.value.toLowerCase()) || 
      item.code.toLowerCase().includes(searchText.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

const totalCost = computed(() => 
  selectedItems.value.reduce((sum, item) => sum + item.price, 0)
)

const totalDuration = computed(() => 
  selectedItems.value.reduce((sum, item) => sum + item.duration, 0)
)

// 方法
function toggleItem(item) {
  const index = selectedItems.value.findIndex(i => i.code === item.code)
  if (index === -1) {
    selectedItems.value.push(item)
  } else {
    selectedItems.value.splice(index, 1)
  }
}

function isSelected(item) {
  return selectedItems.value.some(i => i.code === item.code)
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours} 小時 ${remainingMinutes} 分鐘`
}
</script>

<style scoped>

</style>