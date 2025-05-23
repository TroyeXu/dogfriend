<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-blue-grey-9 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <h1 class="text-h5 q-my-none">專業護理服務計費系統</h1>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-card class="main-card" flat bordered>
          <!-- 篩選器區域 -->
          <q-card-section>
            <q-tabs
              v-model="selectedCategory"
              dense
              class="bg-grey-2 text-primary"
              active-color="primary"
              indicator-color="primary"
              align="justify"
            >
              <q-tab name="鐘點制" label="鐘點制" />
              <q-tab name="包班制" label="包班制" />
            </q-tabs>
            <q-input
              v-model="searchText"
              label="搜尋服務項目"
              outlined
              clearable
              class="q-mt-md"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-card-section>

          <!-- 服務項目列表 -->
          <q-card-section>
            <q-list bordered separator>
              <q-item
                v-for="item in filteredItems"
                :key="item.code"
                clickable
                @click="toggleItem(item)"
                :class="{ 'selected-item': isSelected(item), 'mandatory-item': item.code === 'HR01' }"
                class="q-pa-md"
              >
                <q-item-section>
                  <q-item-label class="text-weight-bold text-body1">
                    {{ item.name }}
                    <q-badge v-if="item.code === 'HR01'" color="positive" class="q-ml-sm">
                      必選
                    </q-badge>
                  </q-item-label>
                  <q-item-label caption class="q-mt-sm">
                    <div>金額：{{ item.price }} 元</div>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    @click="toggleItem(item)"
                    v-model="selectedItems"
                    :val="item"
                    color="primary"
                    dense
                    :disable="item.code === 'HR01' && !isSelected(item)"
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
          <div class="text-h6">總費用：{{ totalCost }} 元 (已選 {{ selectedItems.length }} 項)</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'

const careItems = ref([
  // 鐘點制項目
  { code: 'HR01', name: '基本照護(必選)', price: 200, category: '鐘點制', selectedByDefault: true },
  { code: 'HR02', name: '抽痰需求', price: 50, category: '鐘點制' },
  { code: 'HR03', name: '鼻胃管或其他管灌', price: 60, category: '鐘點制' },
  { code: 'HR04', name: '導尿管或其它引流管', price: 50, category: '鐘點制' },
  { code: 'HR05', name: '氣切or氣管內管', price: 60, category: '鐘點制' },
  { code: 'HR06', name: '體重>50公斤並需協助上下床', price: 70, category: '鐘點制' },
  { code: 'HR07', name: '意識不清或無法配合', price: 70, category: '鐘點制' },
  { code: 'HR08', name: '有任何傳染病或需要隔離病人', price: 80, category: '鐘點制' },
  { code: 'HR09', name: '夜間:2200-0800', price: 20, category: '鐘點制' },
  { code: 'HR10', name: '加價急徵', price: 30, category: '鐘點制' },
  { code: 'HR11', name: '二次加價急徵', price: 30, category: '鐘點制' },
  // 包班制項目
  { code: 'SH01', name: '12小時/班', price: 3000, category: '包班制' },
  { code: 'SH02', name: '24小時/班', price: 5500, category: '包班制' },
  { code: 'SH03', name: '體重>50公斤並需協助上下床', price: 200, category: '包班制' },
  { code: 'SH04', name: '意識不清或無法配合', price: 200, category: '包班制' },
  { code: 'SH05', name: '有任何傳染病或需要隔離病人', price: 300, category: '包班制' }
])

const selectedHourlyItems = ref(careItems.value.filter(item => item.selectedByDefault && item.category === '鐘點制'))
const selectedShiftItems = ref([])
const selectedCategory = ref('鐘點制')
const searchText = ref('')

// 計算屬性
const selectedItems = computed(() => 
  selectedCategory.value === '鐘點制' ? selectedHourlyItems.value : selectedShiftItems.value
)

const filteredItems = computed(() => {
  return careItems.value.filter(item => {
    const matchCategory = item.category === selectedCategory.value
    const matchSearch = item.name.toLowerCase().includes(searchText.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

const totalCost = computed(() => 
  selectedItems.value.reduce((sum, item) => sum + item.price, 0)
)

// 方法
function toggleItem(item) {
  const targetArray = selectedCategory.value === '鐘點制' ? selectedHourlyItems : selectedShiftItems
  const index = targetArray.value.findIndex(i => i.code === item.code)
  if (index === -1) {
    targetArray.value.push(item)
  } else if (item.code !== 'HR01') {
    targetArray.value.splice(index, 1)
  }
}

function isSelected(item) {
  return selectedItems.value.some(i => i.code === item.code)
}
</script>

<style scoped>

</style>