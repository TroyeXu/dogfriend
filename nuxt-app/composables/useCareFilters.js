import { computed } from 'vue'

export default function useCareFilters(state) {
  const { searchText, activeFilters, careItems, selectedCategory } = state

  const isAnyFilterActive = computed(
    () => activeFilters.value.price > 0 || activeFilters.value.subCategory !== null
  )

  const availableSubCategories = computed(() => {
    const subCategories = careItems.value
      .filter(item => item.category === selectedCategory.value && (item.subCategory === '醫療照護' || item.subCategory === '特殊需求'))
      .map(item => item.subCategory)
    return [...new Set(subCategories)]
  })

  const filteredItems = computed(() => {
    return careItems.value.filter(item => {
      const matchCategory = item.category === selectedCategory.value
      let matchSearch = true
      let matchPrice = true
      let matchSubCategory = true

      if (selectedCategory.value === '包班制' && item.subCategory === '基本班次') {
        return false
      }

      if (searchText.value) {
        matchSearch = item.name.toLowerCase().includes(searchText.value.toLowerCase())
      }

      if (activeFilters.value.price > 0) {
        matchPrice = item.price > activeFilters.value.price
      }

      if (activeFilters.value.subCategory) {
        matchSubCategory = item.subCategory === activeFilters.value.subCategory
      }

      return matchCategory && matchSearch && matchPrice && matchSubCategory
    })
  })

  function applyFilter(filterType, value) {
    if (filterType !== 'search') {
      searchText.value = ''
    }
    if (activeFilters.value[filterType] === value) {
      activeFilters.value[filterType] = filterType === 'price' ? 0 : null
    } else {
      activeFilters.value[filterType] = value
    }
  }

  function resetAllFilters() {
    activeFilters.value = { price: 0, subCategory: null }
  }

  return {
    isAnyFilterActive,
    availableSubCategories,
    filteredItems,
    applyFilter,
    resetAllFilters
  }
}
