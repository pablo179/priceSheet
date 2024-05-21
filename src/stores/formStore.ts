import { defineStore } from 'pinia'
import { writeProduct } from '@/firebase'

export const useFormStore = defineStore({
  id: 'form',
  state: () => ({
    products: []
  }),
  actions: {
    async addProduct(name: string, price: number) {
      await writeProduct(name, price)
    }
  }
})
