import { watch } from 'vue'
import { gsap } from 'gsap'

export default function useCareActions(state, calculations, particleApi) {
  const {
    careItems,
    selectedHourlyItems,
    selectedShiftItems,
    selectedCategory,
    selectedShiftType,
    searchText,
    isNightShift,
    isUrgent,
    isDoubleUrgent,
    hourCount,
    dayCount,
    shiftDayCount
  } = state

  const { createParticleExplosion } = particleApi

  function toggleItem(item) {
    const targetArray = selectedCategory.value === '鐘點制' ? selectedHourlyItems : selectedShiftItems
    const index = targetArray.value.findIndex(i => i.code === item.code)
    const clickEvent = window.event
    if (clickEvent) {
      createParticleExplosion(clickEvent.clientX, clickEvent.clientY, item.color || 'primary')
    }
    if (index === -1) {
      targetArray.value.push(item)
      const el = document.querySelector(`[data-code="${item.code}"]`)
      if (el) {
        gsap.fromTo(el, { scale: 1, backgroundColor: 'rgba(76, 175, 80, 0.2)' }, { scale: 1, backgroundColor: 'rgba(25, 118, 210, 0.08)', duration: 0.5, ease: 'power1.out' })
      }
    } else if (item.code !== 'HR01') {
      targetArray.value.splice(index, 1)
      const el = document.querySelector(`[data-code="${item.code}"]`)
      if (el) {
        gsap.fromTo(el, { scale: 1, backgroundColor: 'rgba(255, 87, 34, 0.2)' }, { scale: 1, backgroundColor: 'transparent', duration: 0.5, ease: 'power1.out' })
      }
    }
  }

  function isSelected(item) {
    return calculations.selectedItems.value.some(i => i.code === item.code)
  }

  function selectShiftType(item) {
    selectedShiftType.value = item.code
  }

  function resetSelections() {
    selectedHourlyItems.value = careItems.value.filter(item => item.selectedByDefault && item.category === '鐘點制')
    selectedShiftItems.value = []
    selectedShiftType.value = 'SH01'
    searchText.value = ''
    isNightShift.value = false
    isUrgent.value = false
    isDoubleUrgent.value = false
    dayCount.value = 1
    hourCount.value = 1
    shiftDayCount.value = 1
  }

  function toggleAdditionalService(code) {
    const item = careItems.value.find(item => item.code === code)
    if (!item) return
    const index = selectedHourlyItems.value.findIndex(i => i.code === code)
    if (code === 'HR09') {
      if (isNightShift.value && index === -1) {
        selectedHourlyItems.value.push(item)
      } else if (!isNightShift.value && index !== -1) {
        selectedHourlyItems.value.splice(index, 1)
      }
    } else if (code === 'HR10') {
      if (isUrgent.value && index === -1) {
        selectedHourlyItems.value.push(item)
      } else if (!isUrgent.value && index !== -1) {
        selectedHourlyItems.value.splice(index, 1)
      }
    } else if (code === 'HR11') {
      if (isDoubleUrgent.value && index === -1) {
        selectedHourlyItems.value.push(item)
      } else if (!isDoubleUrgent.value && index !== -1) {
        selectedHourlyItems.value.splice(index, 1)
      }
    }
  }

  function getItemIcon(item) {
    return item.icon || 'help_outline'
  }

  function getItemColor(item) {
    return item.color || 'primary'
  }

  watch(isNightShift, () => { toggleAdditionalService('HR09') })
  watch(isUrgent, () => { toggleAdditionalService('HR10') })
  watch(isDoubleUrgent, () => { toggleAdditionalService('HR11') })

  return {
    toggleItem,
    isSelected,
    selectShiftType,
    resetSelections,
    toggleAdditionalService,
    getItemIcon,
    getItemColor
  }
}
