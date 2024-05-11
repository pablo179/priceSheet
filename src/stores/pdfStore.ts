import { defineStore } from 'pinia'

export type PDFInfo = {
  date: Date | null
  requester: string
  products: {
    quantity: number
    concept: string
    spec: string
    price: number
  }[]
  subTotal: number
  iva: number
  total: number
}

export const usePdfStore = defineStore({
  id: 'pdf',
  state: () => ({
    pdf: {
      date: new Date(),
      requester: '',
      products: [
        {
          quantity: 1,
          concept: '',
          spec: '',
          price: 0
        }
      ],
      subTotal: 0,
      iva: 0,
      total: 0
    } as PDFInfo,
    showPreviewModal: false
  }),
  actions: {
    setPdf(pdf: PDFInfo) {
      this.pdf = pdf
    },
    togglePreviewModal() {
      this.showPreviewModal = !this.showPreviewModal
    }
  }
})
