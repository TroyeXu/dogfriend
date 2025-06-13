import { defineStore } from 'pinia'

export const useCaregiverStore = defineStore('caregivers', {
  state: () => ({
    caregivers: [
      {
        id: 1,
        name: '王小明',
        experience: '5年照護經驗',
        skills: '老人照護、急救訓練',
        licenses: ['照服員結業證書', 'CPR 證照'],
        rating: 4.5,
        photo: '',
        available: '周一至周五 09:00-18:00'
      },
      {
        id: 2,
        name: '李小美',
        experience: '3年醫院工作經驗',
        skills: '傷口護理、復健協助',
        licenses: ['護理師證照'],
        rating: 4.8,
        photo: '',
        available: '排班彈性'
      }
    ]
  }),
  getters: {
    getById: (state) => (id) => state.caregivers.find(c => c.id === Number(id))
  }
})
