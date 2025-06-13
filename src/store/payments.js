import { defineStore } from 'pinia'

export const usePaymentsStore = defineStore('payments', {
  state: () => ({
    payments: [
      { id: 1, date: '2024-05-01', amount: 1000, method: '信用卡', status: '已完成' },
      { id: 2, date: '2024-05-15', amount: 800, method: '轉帳', status: '待處理' }
    ]
  }),
  getters: {
    getAll: (state) => state.payments
  },
  actions: {
    addPayment(payment) {
      this.payments.push(payment)
    }
  }
})
