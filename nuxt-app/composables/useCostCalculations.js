import { computed } from 'vue'

export default function useCostCalculations(state) {
  const {
    selectedCategory,
    selectedHourlyItems,
    selectedShiftItems,
    selectedShiftType,
    hourCount,
    dayCount,
    shiftDayCount
  } = state

  const selectedItems = computed(() =>
    selectedCategory.value === '鐘點制' ? selectedHourlyItems.value : selectedShiftItems.value
  )

  const hourlyRate = computed(() => {
    if (selectedCategory.value !== '鐘點制') return 0
    return selectedHourlyItems.value.reduce((sum, item) => {
      return item.subCategory === '時段加價' ? sum : sum + item.price
    }, 0)
  })

  const hourlyRateReachedLimit = computed(() => hourlyRate.value >= 500)

  function wouldExceedLimit(item) {
    return false
  }

  const hourlyTotalWithTime = computed(() => {
    if (selectedCategory.value !== '鐘點制') return 0
    return selectedHourlyItems.value.reduce((sum, item) => {
      if (item.subCategory === '時段加價') {
        return sum + item.price * dayCount.value
      }
      return sum + item.price * hourCount.value * dayCount.value
    }, 0)
  })

  const shiftTotalWithDays = computed(() => {
    if (selectedCategory.value !== '包班制') return 0
    let basePrice = 0
    if (selectedShiftType.value === 'SH01') {
      basePrice = 3000
    } else if (selectedShiftType.value === 'SH02') {
      basePrice = 5500
    }
    const additionalServices = selectedShiftItems.value.reduce((sum, item) => sum + item.price, 0)
    return (basePrice + additionalServices) * shiftDayCount.value
  })

  const totalCost = computed(() =>
    selectedCategory.value === '鐘點制' ? hourlyTotalWithTime.value : shiftTotalWithDays.value
  )

  function calculatePreviewCost(item) {
    if (selectedCategory.value === '鐘點制' && item.subCategory !== '時段加價') {
      return totalCost.value + item.price * hourCount.value
    } else {
      return totalCost.value + item.price
    }
  }

  function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return {
    selectedItems,
    hourlyRate,
    hourlyRateReachedLimit,
    wouldExceedLimit,
    hourlyTotalWithTime,
    shiftTotalWithDays,
    totalCost,
    calculatePreviewCost,
    formatCurrency
  }
}
