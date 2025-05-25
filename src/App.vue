<template>
  <q-layout view="hHh LpR fff">
    <!-- 防止 iOS 輸入時螢幕放大 -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- 粒子背景 -->
    <vue-particles
      id="tsparticles"
      class="particles-container"
      :options="particlesOptions"
      z
      :particlesLoaded="particlesLoaded"
    />
    
    <!-- 漸變背景的頁首 -->
    <q-header elevated class="header-gradient text-white">
      <q-toolbar>
        <q-toolbar-title class="header-title">
          <q-icon name="medical_services" size="md" class="q-mr-sm" />
          <h1 class="text-h5 q-my-none">專業護理服務計費系統</h1>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="page-background">
      <q-page padding>
        <div class="row q-col-gutter-md">
          <!-- 左側主卡片 -->
          <div class="col-12 col-md-8">
            <q-card class="main-card" flat bordered>
              <!-- 篩選器區域 -->
              <q-card-section>
                <q-tabs
                  v-model="selectedCategory"
                  class="category-tabs"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
                  outside-arrows
                  mobile-arrows
                >
                  <q-tab name="鐘點制" label="鐘點制" icon="schedule" />
                  <q-tab name="包班制" label="包班制" icon="work" />
                </q-tabs>

                <div class="row q-mt-md q-col-gutter-sm">
                  <div class="col-12 col-sm-8">
                    <q-input
                      v-model="searchText"
                      label="搜尋服務項目"
                      outlined
                      clearable
                      class="search-input"
                    >
                      <template v-slot:prepend>
                        <q-icon name="search" color="primary" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-sm-4">
                    <q-btn color="primary" icon="refresh" label="重置所有選擇" @click="resetSelections" class="full-width" outline />
                  </div>
                </div>
              </q-card-section>

              <!-- 統一篩選區域 -->
              <q-card-section class="q-pt-none">
                <div class="row items-center justify-between">
                  <div class="text-subtitle2">篩選選項：</div>
                  <q-btn
                    flat
                    dense
                    round
                    :icon="showFilters ? 'expand_less' : 'expand_more'"
                    @click="showFilters = !showFilters"
                  />
                </div>
                <q-slide-transition>
                  <div v-show="showFilters" class="filter-section q-pa-sm rounded-borders q-mt-sm">
                    <!-- 價格篩選 -->
                    <div class="filter-group">
                      <div class="filter-label">價格篩選：</div>
                      <div class="row q-col-gutter-sm">
                        <div class="col-auto">
                          <q-chip clickable @click="applyFilter('price', 100)" :color="activeFilters.price === 100 ? 'primary' : 'grey-4'" :text-color="activeFilters.price === 100 ? 'white' : 'black'" :outline="activeFilters.price !== 100">
                            價格 > 100元
                          </q-chip>
                        </div>
                        <div class="col-auto">
                          <q-chip clickable @click="applyFilter('price', 50)" :color="activeFilters.price === 50 ? 'primary' : 'grey-4'" :text-color="activeFilters.price === 50 ? 'white' : 'black'" :outline="activeFilters.price !== 50">
                            價格 > 50元
                          </q-chip>
                        </div>
                        <div class="col-auto">
                          <q-chip clickable @click="applyFilter('price', 0)" :color="activeFilters.price === 0 ? 'primary' : 'grey-4'" :text-color="activeFilters.price === 0 ? 'white' : 'black'" :outline="activeFilters.price !== 0">
                            全部
                          </q-chip>
                        </div>
                      </div>
                    </div>
                    
                    <!-- 子類別篩選 -->
                    <div class="filter-group q-mt-sm">
                      <div class="filter-label">類別篩選：</div>
                      <div class="row q-col-gutter-sm">
                        <div v-for="subCat in availableSubCategories" :key="subCat" class="col-auto">
                          <q-chip 
                            clickable 
                            @click="applyFilter('subCategory', subCat)" 
                            :color="activeFilters.subCategory === subCat ? 'secondary' : 'grey-4'" 
                            :text-color="activeFilters.subCategory === subCat ? 'white' : 'black'"
                            :outline="activeFilters.subCategory !== subCat"
                          >
                            {{ subCat }}
                          </q-chip>
                        </div>
                        <div class="col-auto">
                          <q-chip 
                            clickable 
                            @click="applyFilter('subCategory', null)" 
                            :color="!activeFilters.subCategory ? 'secondary' : 'grey-4'" 
                            :text-color="!activeFilters.subCategory ? 'white' : 'black'"
                            :outline="activeFilters.subCategory !== null"
                          >
                            全部
                          </q-chip>
                        </div>
                      </div>
                    </div>
                    
                    <!-- 重置篩選 -->
                    <div class="text-right q-mt-sm">
                      <q-btn 
                        outline
                        size="sm"
                        color="secondary" 
                        icon="filter_alt_off" 
                        label="清除篩選" 
                        @click="resetAllFilters"
                        :disable="!isAnyFilterActive"
                      />
                    </div>
                  </div>
                </q-slide-transition>
              </q-card-section>

              <!-- 服務項目列表 -->
              <q-card-section>
                <!-- 包班制班次選擇 -->
                <div v-if="selectedCategory === '包班制'" class="q-mb-md">
                  <div class="text-subtitle1 q-mb-sm">選擇班次</div>
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-sm-6" v-for="item in shiftTypeItems" :key="item.code">
                      <q-card 
                        :class="{'shift-card': true, 'shift-card-selected': isSelected(item)}"
                        clickable
                        @click="selectShiftType(item)"
                      >
                        <q-card-section class="q-py-sm">
                          <div class="row items-center">
                            <div class="col-auto">
                              <q-icon :name="item.icon" :color="getItemColor(item)" size="md" />
                            </div>
                            <div class="col q-ml-sm">
                              <div class="text-subtitle2">{{ item.name }}</div>
                              <div class="text-caption">
                                <q-icon name="paid" size="xs" color="primary" class="q-mr-xs" />
                                <span>{{ formatCurrency(item.price) }} 元/班</span>
                              </div>
                            </div>
                            <div class="col-auto">
                              <q-radio v-model="selectedShiftType" :val="item.code" color="primary" />
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </div>
                
                <div class="text-subtitle1 q-mb-sm">{{ selectedCategory === '包班制' ? '選擇附加服務' : '選擇服務項目' }}</div>
                <q-list bordered separator class="rounded-borders">
                  <transition-group name="list" tag="div">
                    <q-item
                      v-for="item in filteredItems"
                      :key="item.code"
                      clickable
                      @click="toggleItem(item)"
                      :class="{ 'selected-item': isSelected(item), 'mandatory-item': item.code === 'HR01' }"
                      class="service-item q-pa-md"
                      v-ripple
                      v-show="!(selectedCategory === '鐘點制' && item.subCategory === '時段加價')"
                    >
                      <q-item-section avatar>
                        <q-icon :name="item.icon" :color="getItemColor(item)" size="md" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-weight-bold text-body1">
                          {{ item.name }}
                          <q-badge v-if="item.code === 'HR01'" color="positive" class="q-ml-sm">
                            必選
                          </q-badge>
                        </q-item-label>
                        <q-item-label caption class="q-mt-sm">
                          <div class="row items-center">
                            <q-icon name="paid" size="xs" color="primary" class="q-mr-xs" />
                            <span>金額：{{ item.price }} 元</span>
                          </div>
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          @click.stop="toggleItem(item)"
                          v-model="selectedItems"
                          :val="item"
                          color="primary"
                          :disable="item.code === 'HR01' && !isSelected(item)"
                          :aria-label="`選擇 ${item.name}`"
                        />
                      </q-item-section>
                    </q-item>
                  </transition-group>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <!-- 右側摘要卡片 -->
          <div class="col-12 col-md-4">
            <q-card class="summary-card" flat bordered>
              <q-card-section>
                <div class="text-h6 text-primary">
                  <q-icon name="summarize" /> 費用統計
                </div>
                <!-- 預算設定和即時費用計算器 -->
                <div class="q-mt-md">
                  <q-input
                    v-model.number="budget"
                    type="number"
                    label="設定預算 (元)"
                    outlined
                    dense
                    :rules="[val => val >= 0 || '請輸入有效預算']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="account_balance_wallet" color="primary" />
                    </template>
                  </q-input>
                  <!-- 預算進度條 -->
                  <div class="q-mt-sm">
                    <q-linear-progress
                      :value="totalCost / (budget > 0 ? budget : 1)"
                      :color="getBudgetColor"
                      size="10px"
                      rounded
                    />
                    <div class="row justify-between q-mt-xs">
                      <div class="text-caption">0 元</div>
                      <div class="text-caption">{{ budget }} 元</div>
                    </div>
                  </div>
                </div>
                
                <!-- 即時費用計算器（鐘點制） -->
                <div v-if="selectedCategory === '鐘點制'" class="q-mt-md">
                  <div class="row items-center justify-between">
                    <div class="text-subtitle2">服務時間設定</div>
                    <q-btn
                      flat
                      dense
                      round
                      :icon="showCalculator ? 'expand_less' : 'expand_more'"
                      @click="showCalculator = !showCalculator"
                    />
                  </div>
                  <q-slide-transition>
                    <div v-show="showCalculator" class="q-mt-sm">
                  
                  <!-- 天數選擇 -->
                  <div class="q-mb-sm">
                    <div class="text-subtitle2 q-mb-xs">天數選擇</div>
                    <div class="row justify-between q-col-gutter-xs">
                      <div class="col-2" v-for="days in [1, 2, 3, 5, 7]" :key="days">
                        <q-btn 
                          :color="dayCount === days ? 'secondary' : 'white'" 
                          :text-color="dayCount === days ? 'white' : 'secondary'"
                          :label="`${days}天`" 
                          size="sm" 
                          @click="dayCount = days"
                          :unelevated="dayCount === days"
                          :flat="dayCount !== days"
                          class="q-px-xs day-btn full-width"
                          style="border: dayCount !== days ? '1px solid #26a69a' : 'none'"
                        />
                      </div>
                    </div>
                    <q-input
                      v-model.number="dayCount"
                      type="number"
                      label="自定義天數"
                      outlined
                      dense
                      min="1"
                      class="q-mt-sm"
                      :rules="[val => val >= 1 || '請輸入有效天數']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" color="secondary" />
                      </template>
                    </q-input>
                  </div>
                  
                  <!-- 快速選擇小時數 -->
                  <div class="q-mb-sm">
                    <div class="text-subtitle2 q-mb-xs">每日服務時數</div>
                    <div class="row justify-between q-col-gutter-xs">
                      <div class="col-2" v-for="hours in [4, 8, 10, 12, 24]" :key="hours">
                        <q-btn 
                          :color="hourCount === hours ? 'primary' : 'white'" 
                          :text-color="hourCount === hours ? 'white' : 'primary'"
                          :label="`${hours}時`" 
                          size="sm" 
                          @click="hourCount = hours"
                          :unelevated="hourCount === hours"
                          :flat="hourCount !== hours"
                          class="q-px-xs hour-btn full-width"
                          style="border: hourCount !== hours ? '1px solid #1976d2' : 'none'"
                        />
                      </div>
                    </div>
                    <q-input
                      v-model.number="hourCount"
                      type="number"
                      label="自定義小時數"
                      outlined
                      dense
                      min="1"
                      class="q-mt-sm"
                      :rules="[val => val >= 1 || '請輸入有效小時數']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="schedule" color="primary" />
                      </template>
                    </q-input>
                  </div>
                  
                  <!-- 加價項目 -->
                  <div class="q-mt-md">
                    <div class="row items-center justify-between">
                      <div class="text-subtitle2">加價項目</div>
                      <q-btn
                        flat
                        dense
                        round
                        :icon="showAdditionalItems ? 'expand_less' : 'expand_more'"
                        @click="showAdditionalItems = !showAdditionalItems"
                      />
                    </div>
                    <q-slide-transition>
                      <div v-show="showAdditionalItems" class="row q-col-gutter-sm q-mt-sm">
                        <div class="col-12">
                          <div class="row items-center">
                            <div class="col">
                              <q-toggle
                                v-model="isNightShift"
                                label="夜間時段 (22:00-08:00)"
                                color="blue-grey"
                                @update:model-value="toggleAdditionalService('HR09')"
                              />
                            </div>
                            <div class="col-auto text-blue-grey">
                              <q-badge color="blue-grey" text-color="white">
                                {{ formatCurrency(20) }} 元
                              </q-badge>
                            </div>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="row items-center">
                            <div class="col">
                              <q-toggle
                                v-model="isUrgent"
                                label="加價急徵"
                                color="amber"
                                @update:model-value="toggleAdditionalService('HR10')"
                              />
                            </div>
                            <div class="col-auto text-amber">
                              <q-badge color="amber" text-color="white">
                                {{ formatCurrency(30) }} 元
                              </q-badge>
                            </div>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="row items-center">
                            <div class="col">
                              <q-toggle
                                v-model="isDoubleUrgent"
                                label="二次加價急徵"
                                color="orange"
                                @update:model-value="toggleAdditionalService('HR11')"
                              />
                            </div>
                            <div class="col-auto text-orange">
                              <q-badge color="orange" text-color="white">
                                {{ formatCurrency(30) }} 元
                              </q-badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-slide-transition>
                  </div>
                  
                  <div class="text-subtitle1 q-mt-sm text-primary text-center">
                    預計費用：{{ formatCurrency(hourlyTotalWithTime) }} 元 ({{ dayCount }} 天 x {{ hourCount }} 時/天)
                  </div>
                    </div>
                  </q-slide-transition>
                </div>
                
                <!-- 包班制天數計算器 -->
                <div v-if="selectedCategory === '包班制'" class="q-mt-md">
                  <div class="row items-center justify-between">
                    <div class="text-subtitle2">包班時間設定</div>
                    <q-btn
                      flat
                      dense
                      round
                      :icon="showShiftCalculator ? 'expand_less' : 'expand_more'"
                      @click="showShiftCalculator = !showShiftCalculator"
                    />
                  </div>
                  <q-slide-transition>
                    <div v-show="showShiftCalculator" class="q-mt-sm">
                      <!-- 包班制天數選擇 -->
                      <div class="q-mb-sm">
                        <div class="text-subtitle2 q-mb-xs">包班天數</div>
                        <div class="row q-col-gutter-xs">
                          <div class="col-auto" v-for="days in [1, 3, 5, 7, 14]" :key="days">
                            <q-btn 
                              :color="shiftDayCount === days ? 'secondary' : 'white'" 
                              :text-color="shiftDayCount === days ? 'white' : 'secondary'"
                              :label="`${days}天`" 
                              size="sm" 
                              @click="shiftDayCount = days"
                              :unelevated="shiftDayCount === days"
                              :flat="shiftDayCount !== days"
                              class="q-px-sm day-btn"
                              style="border: shiftDayCount !== days ? '1px solid #26a69a' : 'none'"
                            />
                          </div>
                        </div>
                        <q-input
                          v-model.number="shiftDayCount"
                          type="number"
                          label="自定義天數"
                          outlined
                          dense
                          min="1"
                          class="q-mt-sm"
                          :rules="[val => val >= 1 || '請輸入有效天數']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="event" color="secondary" />
                          </template>
                        </q-input>
                      </div>
                      
                      <div class="text-subtitle1 q-mt-sm text-primary text-center">
                        預計費用：{{ formatCurrency(shiftTotalWithDays) }} 元 ({{ shiftDayCount }} 天)
                      </div>
                    </div>
                  </q-slide-transition>
                </div>
              </q-card-section>
              
              <q-card-section>
                <div class="text-center q-mb-md">
                  <div class="text-h5 text-weight-bold text-primary">
                    <q-icon name="paid" /> {{ formatCurrency(totalCost) }} 元
                  </div>
                  <div class="text-caption text-grey">
                    已選 {{ selectedItems.length }} 項服務
                  </div>
                </div>
                
                <!-- 圓餅圖 (使用 vue-chartjs) -->
                <div class="chart-container">
                  <Pie
                    v-if="chartData.labels.length > 0"
                    :data="chartData"
                    :options="chartOptions"
                    class="pie-chart"
                  />
                  <div v-else class="text-center text-grey q-pa-md">
                    尚未選擇任何服務項目
                  </div>
                </div>
              </q-card-section>
              
              <q-card-section v-if="selectedItems.length > 0">
                <q-list dense>
                  <q-item v-for="item in selectedItems" :key="`selected-${item.code}`">
                    <q-item-section>
                      <q-item-label>{{ item.name }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      {{ formatCurrency(item.price) }} 元
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-footer elevated class="footer-gradient text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row items-center no-wrap">
            <div class="col-auto">
              <div class="text-h6">
                總費用：<span ref="totalCostElement" class="cost-display" :class="{ 'exceeded': totalCost > budget }">{{ formatCurrency(totalCost) }}</span> 元
              </div>
            </div>
            
            <div class="col-auto q-ml-sm" v-if="totalCost > budget">
              <q-badge color="negative">
                超出預算 {{ formatCurrency(totalCost - budget) }} 元
              </q-badge>
            </div>
          </div>
        </q-toolbar-title>
        <q-btn flat round icon="help" @click="showHelp = true">
          <q-tooltip>幫助</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-footer>
    
    <!-- 幫助對話框 -->
    <q-dialog v-model="showHelp">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center bg-primary text-white">
          <div class="text-h6">使用說明</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <p><b>鐘點制</b>：按小時計費，基本照護為必選項目，可根據需求選擇附加服務。</p>
          <p><b>包班制</b>：按班次計費，選擇12小時或24小時班次，可根據需求選擇附加服務。</p>
          <p>點擊服務項目或勾選核取方塊可選擇/取消選擇服務。</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  

  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { gsap } from 'gsap'

// 導入 Chart.js 相關組件
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Pie } from 'vue-chartjs'

// 註冊 Chart.js 組件
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend)

const $q = useQuasar()

// 粒子加載完成回調
const particlesLoaded = async (container) => {
  console.log('粒子容器已加載', container)
}

// 服務項目數據
const careItems = ref([
  // 鐘點制項目 - 基本服務
  { code: 'HR01', name: '基本照護(必選)', price: 200, category: '鐘點制', subCategory: '基本服務', selectedByDefault: true, icon: 'favorite', color: 'deep-orange' },
  
  // 鐘點制項目 - 醫療照護
  { code: 'HR02', name: '抽痰需求', price: 50, category: '鐘點制', subCategory: '醫療照護', icon: 'medical_services', color: 'light-blue' },
  { code: 'HR03', name: '鼻胃管或其他管灌', price: 60, category: '鐘點制', subCategory: '醫療照護', icon: 'medical_services', color: 'teal' },
  { code: 'HR04', name: '導尿管或其它引流管', price: 50, category: '鐘點制', subCategory: '醫療照護', icon: 'medical_services', color: 'cyan' },
  { code: 'HR05', name: '氣切or氣管內管', price: 60, category: '鐘點制', subCategory: '醫療照護', icon: 'medical_services', color: 'indigo' },
  
  // 鐘點制項目 - 特殊需求
  { code: 'HR06', name: '體重>50公斤並需協助上下床', price: 70, category: '鐘點制', subCategory: '特殊需求', icon: 'bed', color: 'deep-purple' },
  { code: 'HR07', name: '意識不清或無法配合', price: 70, category: '鐘點制', subCategory: '特殊需求', icon: 'psychology', color: 'purple' },
  { code: 'HR08', name: '有任何傳染病或需要隔離病人', price: 80, category: '鐘點制', subCategory: '特殊需求', icon: 'coronavirus', color: 'red' },
  
  // 鐘點制項目 - 時段加價
  { code: 'HR09', name: '夜間:2200-0800', price: 20, category: '鐘點制', subCategory: '時段加價', icon: 'bedtime', color: 'blue-grey' },
  { code: 'HR10', name: '加價急徵', price: 30, category: '鐘點制', subCategory: '時段加價', icon: 'priority_high', color: 'amber' },
  { code: 'HR11', name: '二次加價急徵', price: 30, category: '鐘點制', subCategory: '時段加價', icon: 'bolt', color: 'orange' },
  
  // 包班制項目 - 基本班次
  { code: 'SH01', name: '12小時/班', price: 3000, category: '包班制', subCategory: '基本班次', icon: 'schedule', color: 'primary' },
  { code: 'SH02', name: '24小時/班', price: 5500, category: '包班制', subCategory: '基本班次', icon: 'access_time_filled', color: 'secondary' },
  
  // 包班制項目 - 特殊需求
  { code: 'SH03', name: '體重>50公斤並需協助上下床', price: 200, category: '包班制', subCategory: '特殊需求', icon: 'bed', color: 'deep-purple' },
  { code: 'SH04', name: '意識不清或無法配合', price: 200, category: '包班制', subCategory: '特殊需求', icon: 'psychology', color: 'purple' },
  { code: 'SH05', name: '有任何傳染病或需要隔離病人', price: 300, category: '包班制', subCategory: '特殊需求', icon: 'coronavirus', color: 'red' }
])

// 狀態變數
const selectedHourlyItems = ref(careItems.value.filter(item => item.selectedByDefault && item.category === '鐘點制'))
const selectedShiftItems = ref([])
const selectedCategory = ref('鐘點制')
const selectedShiftType = ref('SH01') // 預設選擇12小時班
const searchText = ref('')
const showHelp = ref(false)
const previousTotalCost = ref(0)
const totalCostElement = ref(null)
const particleContainer = ref(null)
const budget = ref(10000) // 預設預算為 3000 元
const hourCount = ref(1) // 鐘點制小時數
const dayCount = ref(1) // 鐘點制天數
const shiftDayCount = ref(1) // 包班制天數

// 收合/展開狀態
const showFilters = ref(false)
const showCalculator = ref(false)
const showShiftCalculator = ref(false)
const showAdditionalItems = ref(true)

const isNightShift = ref(false) // 是否為夜班時段
const isUrgent = ref(false) // 是否為加價急徵
const isDoubleUrgent = ref(false) // 是否為二次加價急徵


// 篩選系統狀態
const activeFilters = ref({
  price: 0,
  subCategory: null
})

// 判斷是否有任何篩選條件被啟用
const isAnyFilterActive = computed(() => {
  return activeFilters.value.price > 0 || 
         activeFilters.value.subCategory !== null
})

// 粒子效果配置
const particlesOptions = {
  background: {
    color: {
      value: "transparent"
    }
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: ["#4A90E2", "#50C8B4", "#89253e"]
    },
    links: {
      color: "#c8c8c8",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce"
      },
      random: true,
      speed: 1,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 30
    },
    opacity: {
      value: 0.3
    },
    shape: {
      type: "circle"
    },
    size: {
      value: { min: 1, max: 3 }
    }
  },
  detectRetina: true
}

// 計算屬性
const selectedItems = computed(() => 
  selectedCategory.value === '鐘點制' ? selectedHourlyItems.value : selectedShiftItems.value
)

// 鐘點制費用計算（考慮小時數和天數）
const hourlyTotalWithTime = computed(() => {
  if (selectedCategory.value !== '鐘點制') return 0
  
  // 基本費用（每項服務的價格）
  let baseTotal = selectedHourlyItems.value.reduce((sum, item) => {
    // 時段加價項目不要乘以小時數
    if (item.subCategory === '時段加價') {
      return sum + (item.price * dayCount.value)
    }
    return sum + (item.price * hourCount.value * dayCount.value)
  }, 0)
  
  return baseTotal
})

// 預算顏色計算
const getBudgetColor = computed(() => {
  const ratio = totalCost.value / budget.value
  if (ratio >= 1) return 'negative'
  if (ratio >= 0.9) return 'warning'
  if (ratio >= 0.7) return 'orange'
  return 'positive'
})

// 可用的子類別列表
const availableSubCategories = computed(() => {
  // 根據當前選擇的主類別，獲取可用的子類別
  const subCategories = careItems.value
    .filter(item => item.category === selectedCategory.value && (item.subCategory === '醫療照護' || item.subCategory === '特殊需求'))
    .map(item => item.subCategory)
  
  // 去除重複項
  return [...new Set(subCategories)]
})

// 班次選項
const shiftTypeItems = [
  { code: 'SH01', name: '12小時/班', price: 3000, category: '包班制', subCategory: '基本班次', icon: 'schedule', color: 'primary' },
  { code: 'SH02', name: '24小時/班', price: 5500, category: '包班制', subCategory: '基本班次', icon: 'access_time_filled', color: 'secondary' }
];

const filteredItems = computed(() => {
  return careItems.value.filter(item => {
    const matchCategory = item.category === selectedCategory.value
    let matchSearch = true
    let matchPrice = true
    let matchSubCategory = true
    
    // 如果是包班制，只顯示特殊需求項目，不顯示基本班次項目
    if (selectedCategory.value === '包班制' && item.subCategory === '基本班次') {
      return false;
    }
    
    // 處理搜尋邏輯
    if (searchText.value) {
      matchSearch = item.name.toLowerCase().includes(searchText.value.toLowerCase())
    }
    
    // 處理價格篩選
    if (activeFilters.value.price > 0) {
      matchPrice = item.price > activeFilters.value.price
    }
    
    // 處理子類別篩選
    if (activeFilters.value.subCategory) {
      matchSubCategory = item.subCategory === activeFilters.value.subCategory
    }
    
    return matchCategory && matchSearch && matchPrice && matchSubCategory
  })
})

// 包班制費用計算（考慮天數）
const shiftTotalWithDays = computed(() => {
  if (selectedCategory.value !== '包班制') return 0
  
  // 基本班次費用
  let basePrice = 0;
  if (selectedShiftType.value === 'SH01') {
    basePrice = 3000; // 12小時班費用
  } else if (selectedShiftType.value === 'SH02') {
    basePrice = 5500; // 24小時班費用
  }
  
  // 包班制費用 = 班次基本費用 * 天數 + 附加服務費用 * 天數
  const additionalServices = selectedShiftItems.value.reduce((sum, item) => sum + item.price, 0);
  return (basePrice + additionalServices) * shiftDayCount.value;
})

const totalCost = computed(() => {
  if (selectedCategory.value === '鐘點制') {
    return hourlyTotalWithTime.value
  } else {
    return shiftTotalWithDays.value
  }
})

// Chart.js 圖表數據
const chartData = computed(() => {
  if (selectedItems.value.length === 0) {
    return {
      labels: [],
      datasets: []
    }
  }
  
  // 按子類別分組計算費用
  const subCategoryCosts = {}
  let totalCostBySubCategory = 0
  
  selectedItems.value.forEach(item => {
    if (!subCategoryCosts[item.subCategory]) {
      subCategoryCosts[item.subCategory] = 0
    }
    subCategoryCosts[item.subCategory] += item.price
    totalCostBySubCategory += item.price
  })
  
  // 轉換為圖表數據格式
  const labels = Object.keys(subCategoryCosts)
  const data = labels.map(label => subCategoryCosts[label])
  
  // 為不同子類別設置不同顏色
  const backgroundColors = [
    '#4A90E2', // 藍色
    '#50C8B4', // 綠色
    '#F5A623', // 橙色
    '#D0021B', // 紅色
    '#9013FE', // 紫色
    '#BD10E0', // 粉紅色
    '#7ED321'  // 淺綠色
  ]
  
  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderWidth: 0
      }
    ]
  }
})

// Chart.js 圖表選項
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.raw || 0;
          const percentage = ((value / totalCost.value) * 100).toFixed(1);
          return `${label}: ${formatCurrency(value)} 元 (${percentage}%)`;
        }
      }
    }
  }
}

// 格式化金額函數
function formatCurrency(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 方法
function toggleItem(item) {
  const targetArray = selectedCategory.value === '鐘點制' ? selectedHourlyItems : selectedShiftItems
  const index = targetArray.value.findIndex(i => i.code === item.code)
  
  
  // 取得點擊位置，用於粒子效果
  const clickEvent = window.event
  if (clickEvent) {
    createParticleExplosion(clickEvent.clientX, clickEvent.clientY, item.color || 'primary')
  }
  
  if (index === -1) {
    // 添加項目時的動畫效果
    targetArray.value.push(item)
    
    
    // 使用 GSAP 對項目元素進行動畫
    const itemElement = document.querySelector(`[data-code="${item.code}"]`)
    if (itemElement) {
      gsap.fromTo(itemElement, 
        { scale: 1, backgroundColor: 'rgba(76, 175, 80, 0.2)' },
        { scale: 1, backgroundColor: 'rgba(25, 118, 210, 0.08)', duration: 0.5, ease: 'power1.out' }
      )
    }
  } else if (item.code !== 'HR01') {
    // 移除非必選項目
    targetArray.value.splice(index, 1)
    
    // 使用 GSAP 對項目元素進行動畫
    const itemElement = document.querySelector(`[data-code="${item.code}"]`)
    if (itemElement) {
      gsap.fromTo(itemElement, 
        { scale: 1, backgroundColor: 'rgba(255, 87, 34, 0.2)' },
        { scale: 1, backgroundColor: 'transparent', duration: 0.5, ease: 'power1.out' }
      )
    }
  }
}

// 創建粒子爆炸效果
function createParticleExplosion(x, y, color) {
  // 創建容器
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.left = '0'
  container.style.top = '0'
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.pointerEvents = 'none'
  container.style.zIndex = '9999'
  document.body.appendChild(container)
  
  // 創建粒子
  const particleCount = 20
  const particles = []
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.style.position = 'absolute'
    particle.style.width = `${Math.random() * 6 + 2}px`
    particle.style.height = particle.style.width
    particle.style.backgroundColor = color === 'primary' ? '#1976d2' : 
                                    color === 'secondary' ? '#26a69a' : 
                                    color === 'deep-orange' ? '#ff5722' : 
                                    `#${Math.floor(Math.random() * 16777215).toString(16)}`
    particle.style.borderRadius = '50%'
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    container.appendChild(particle)
    particles.push(particle)
    
    // 使用 GSAP 動畫
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 100 + 50
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed
    
    gsap.to(particle, {
      x: vx,
      y: vy,
      opacity: 0,
      duration: 0.6 + Math.random() * 0.4,
      ease: 'power1.out',
      onComplete: () => {
        container.removeChild(particle)
        // 清理容器
        if (container.childElementCount === 0) {
          document.body.removeChild(container)
        }
      }
    })
  }
}

function isSelected(item) {
  return selectedItems.value.some(i => i.code === item.code)
}

// 選擇班次類型
function selectShiftType(item) {
  selectedShiftType.value = item.code;
}

function resetSelections() {
  // 重置為初始狀態，保留必選項目
  selectedHourlyItems.value = careItems.value.filter(item => item.selectedByDefault && item.category === '鐘點制')
  selectedShiftItems.value = []
  selectedShiftType.value = 'SH01' // 重置為12小時班
  searchText.value = ''
  
  // 重置所有篩選條件
  resetAllFilters()
  
  // 重置加價選項
  isNightShift.value = false
  isUrgent.value = false
  isDoubleUrgent.value = false
  
  // 重置天數和小時數
  dayCount.value = 1
  hourCount.value = 1
  shiftDayCount.value = 1
}

// 統一的篩選應用函數
function applyFilter(filterType, value) {
  // 清空搜尋文字，避免衝突
  if (filterType !== 'search') {
    searchText.value = ''
  }
  
  // 如果點擊的是當前已選中的篩選條件，則取消該篩選
  if (activeFilters.value[filterType] === value) {
    activeFilters.value[filterType] = filterType === 'price' ? 0 : null
    if (filterType === 'mandatory') {
      activeFilters.value.mandatory = false
    }
  } else {
    // 否則應用新的篩選條件
    activeFilters.value[filterType] = value
  }
}

// 重置所有篩選條件
function resetAllFilters() {
  activeFilters.value = {
    price: 0,
    subCategory: null
  }
  
  // 顯示重置篩選通知
  if (isAnyFilterActive.value) {
    $q.notify({
      message: '已清除所有篩選條件',
      color: 'secondary',
      icon: 'filter_alt_off',
      position: 'top',
      timeout: 1500
    })
  }
}

// 處理加價服務的切換
function toggleAdditionalService(code) {
  const item = careItems.value.find(item => item.code === code)
  if (!item) return
  
  const index = selectedHourlyItems.value.findIndex(i => i.code === code)
  
  // 根據 toggle 狀態添加或移除服務
  if (code === 'HR09') { // 夜間時段
    if (isNightShift.value && index === -1) {
      selectedHourlyItems.value.push(item)
    } else if (!isNightShift.value && index !== -1) {
      selectedHourlyItems.value.splice(index, 1)
    }
  } else if (code === 'HR10') { // 加價急徵
    if (isUrgent.value && index === -1) {
      selectedHourlyItems.value.push(item)
    } else if (!isUrgent.value && index !== -1) {
      selectedHourlyItems.value.splice(index, 1)
    }
  } else if (code === 'HR11') { // 二次加價急徵
    if (isDoubleUrgent.value && index === -1) {
      selectedHourlyItems.value.push(item)
    } else if (!isDoubleUrgent.value && index !== -1) {
      selectedHourlyItems.value.splice(index, 1)
    }
  }
}

function calculatePreviewCost(item) {
  // 計算預覽費用
  if (isSelected(item)) {
    // 如果已選中，則顯示移除後的總費用
    if (item.code === 'HR01') {
      // 基本照護不可移除
      return totalCost.value
    }
    
    // 鐘點制需要考慮小時數
    if (selectedCategory.value === '鐘點制' && item.subCategory !== '時段加價') {
      return totalCost.value - (item.price * hourCount.value)
    } else {
      return totalCost.value - item.price
    }
  } else {
    // 如果未選中，則顯示添加後的總費用
    // 鐘點制需要考慮小時數
    if (selectedCategory.value === '鐘點制' && item.subCategory !== '時段加價') {
      return totalCost.value + (item.price * hourCount.value)
    } else {
      return totalCost.value + item.price
    }
  }
}

function getItemIcon(item) {
  // 返回項目的圖標，如果沒有定義則使用默認圖標
  return item.icon || 'help_outline'
}

function getItemColor(item) {
  // 返回項目的顏色，如果沒有定義則使用默認顏色
  return item.color || 'primary'
}





// 監聽總費用變化，添加動畫效果和預算警示
watch(totalCost, (newVal, oldVal) => {
  previousTotalCost.value = oldVal
  
  // 預算警示
  if (newVal > budget.value) {
    $q.notify({
      message: `總費用 (${newVal} 元) 已超過預算 (${budget.value} 元)！`,
      color: 'negative',
      icon: 'warning',
      timeout: 3000
    })
  } else if (newVal > budget.value * 0.9 && newVal <= budget.value) {
    $q.notify({
      message: `總費用 (${newVal} 元) 接近預算上限 (${budget.value} 元)。`,
      color: 'warning',
      icon: 'warning',
      timeout: 2000
    })
  }
  
  // 使用 GSAP 實現數字變化動畫
  if (totalCostElement.value) {
    // 先停止任何正在進行的動畫
    gsap.killTweensOf(totalCostElement.value)
    
    // 如果是增加費用，使用綠色動畫；如果是減少費用，使用紅色動畫
    const color = newVal > oldVal ? '#4caf50' : newVal < oldVal ? '#f44336' : 'inherit'
    
    // 先變色
    gsap.to(totalCostElement.value, {
      color: color,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        // 然後返回原來的預設顏色
        gsap.to(totalCostElement.value, {
          color: 'inherit',
          duration: 0.5,
          delay: 0.5,
          ease: 'power2.inOut'
        })
      }
    })
    
    // 對數字進行彈跳動畫
    gsap.fromTo(totalCostElement.value, 
      { scale: 1 },
      { scale: 1.2, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 }
    )
    
    // 如果費用變化較大，則創建浮動數字效果
    if (Math.abs(newVal - oldVal) > 100) {
      const floatingNumber = document.createElement('div')
      floatingNumber.textContent = newVal > oldVal ? `+${newVal - oldVal}` : `${newVal - oldVal}`
      floatingNumber.style.position = 'fixed'
      floatingNumber.style.color = newVal > oldVal ? '#4caf50' : '#f44336'
      floatingNumber.style.fontSize = '1.5rem'
      floatingNumber.style.fontWeight = 'bold'
      floatingNumber.style.zIndex = '9999'
      floatingNumber.style.pointerEvents = 'none'
      
      // 將浮動數字放在總費用附近
      const rect = totalCostElement.value.getBoundingClientRect()
      floatingNumber.style.left = `${rect.right + 10}px`
      floatingNumber.style.top = `${rect.top}px`
      
      document.body.appendChild(floatingNumber)
      
      // 使用 GSAP 對浮動數字進行動畫
      gsap.to(floatingNumber, {
        y: -50,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        onComplete: () => {
          document.body.removeChild(floatingNumber)
        }
      })
    }
  }
})



// 鐘點制即時費用計算器
function calculateHourlyCost() {
  // 取得小時數輸入值
  const hourCount = hourCountInput.value
  
  // 取得時段選擇值
  const timePeriod = timePeriodSelect.value
  
  // 計算即時費用
  const hourlyCost = calculateHourlyCostByTimePeriod(timePeriod, hourCount)
  
  // 更新顯示的即時費用
  hourlyCostDisplay.value = hourlyCost
}

// 根據時段選擇計算鐘點制費用
function calculateHourlyCostByTimePeriod(timePeriod, hourCount) {
  // 根據時段選擇計算費用
  switch (timePeriod) {
    case '早班':
      return hourCount * 200
    case '晚班':
      return hourCount * 250
    case '夜班':
      return hourCount * 300
    default:
      return 0
  }
}



// 監聽夜間時段切換
watch(isNightShift, (newVal) => {
  toggleAdditionalService('HR09')
})

// 監聽加價急徵切換
watch(isUrgent, (newVal) => {
  toggleAdditionalService('HR10')
})

// 監聽二次加價急徵切換
watch(isDoubleUrgent, (newVal) => {
  toggleAdditionalService('HR11')
})

// 生命週期鎖子
onMounted(() => {
 
  // 為每個項目添加自定義屬性，用於 GSAP 動畫
  setTimeout(() => {
    document.querySelectorAll('.service-item').forEach(item => {
      const code = item.querySelector('.q-item-label')?.textContent?.trim()
      if (code) {
        item.setAttribute('data-code', code)
      }
    })
    
    // 初始化總費用元素的動畫
    if (totalCostElement.value) {
      gsap.fromTo(totalCostElement.value, 
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
      )
    }
    
    // 為卡片添加入場動畫
    const cards = document.querySelectorAll('.main-card, .summary-card')
    cards.forEach((card, index) => {
      gsap.fromTo(card, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 * index, ease: 'power2.out' }
      )
    })
  }, 500)
})
</script>

<style scoped>
/* 基本樣式 */
.header-gradient {
  background: linear-gradient(135deg, #3a6186, #89253e);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.header-title {
  display: flex;
  align-items: center;
}

.footer-gradient {
  background: linear-gradient(135deg, #89253e, #3a6186);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.page-background {
  background-color: #f8f9fa;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e6ed' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  position: relative;
}

/* 粒子效果樣式 */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* 卡片樣式 */
.main-card,
.summary-card {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.main-card:hover,
.summary-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* 篩選器區域樣式 */
.category-tabs {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 4px;
}

.filter-section {
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.filter-group {
  padding: 8px 0;
}

.filter-label {
  font-weight: 500;
  color: #666;
  margin-bottom: 6px;
  font-size: 0.9rem;
}

.q-tab__indicator {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(90deg, #4A90E2, #50C8B4);
  height: 4px;
  border-radius: 2px;
}

/* 標籤頁樣式 */
.q-tab__indicator {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(90deg, #4A90E2, #50C8B4);
  height: 4px;
  border-radius: 2px;
}

/* 搜尋框樣式 */
.search-input {
  transition: all 0.3s ease;
}

.search-input:focus-within {
  transform: scale(1.01);
}

/* 服務項目樣式 */
.service-item {
  border-radius: 8px;
  margin: 8px 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
  transform: translateY(-2px);
}

.selected-item {
  background-color: rgba(25, 118, 210, 0.08) !important;
  border-left: 4px solid #1976d2;
}

.mandatory-item {
  background-color: rgba(76, 175, 80, 0.08);
}

/* 小時按鈕樣式 */
.hour-btn, .day-btn {
  min-width: 50px;
  font-weight: 500;
  border-radius: 16px;
  transition: all 0.2s ease;
  margin: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  font-size: 0.8rem;
}

.hour-btn {
  border: 1px solid #1976d2 !important;
}

.day-btn {
  border: 1px solid #26a69a !important;
}

.hour-btn.q-btn--unelevated {
  border: none !important;
}

/* 天數按鈕樣式 */
.day-btn {
  min-width: 60px;
  font-weight: 500;
  border-radius: 16px;
  transition: all 0.2s ease;
  margin: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #26a69a !important;
}

.day-btn.q-btn--unelevated {
  border: none !important;
}

/* 圓餅圖樣式 */
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  height: 250px;
}

.pie-chart {
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
}

.shift-card {
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.shift-card-selected {
  border: 2px solid #1976d2;
  box-shadow: 0 3px 8px rgba(25, 118, 210, 0.2);
}

/* 總費用顯示樣式 */
.cost-display {
  font-weight: bold;
  position: relative;
  display: inline-block;
  animation: pulse 0.5s ease;
}

.cost-display.exceeded {
  color: #f44336;
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* 動畫效果 */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 列表動畫 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 響應式調整 */
@media (max-width: 600px) {
  .pie-chart {
    width: 120px;
    height: 120px;
  }
  
  .legend-item {
    margin: 2px 4px;
  }
  
  .legend-text {
    font-size: 12px;
  }
}
</style>