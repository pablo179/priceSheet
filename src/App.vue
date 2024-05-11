<script setup lang="ts">
// @ts-ignore
import html2pdf from 'html2pdf.js'
import PDF from './components/PDF.vue'
import PriceForm from './components/PriceForm.vue'
import { usePdfStore } from './stores/pdfStore'
import { storeToRefs } from 'pinia'

const store = usePdfStore()
const { showPreviewModal, pdf } = storeToRefs(store)

const exportPdf = () => {
  html2pdf(document.getElementById('pdf-container'), {
    margin: 0,
    filename: `presupuesto-${pdf.value.requester}-${new Date().toISOString()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  })
}
</script>

<template>
  <PriceForm />
  <b-modal v-model="showPreviewModal">
    <div class="box">
      <PDF />
      <footer class="modal-card-foot">
        <b-button expanded label="Descargar" type="is-primary" @click="exportPdf" />
      </footer>
    </div>
  </b-modal>
</template>

<script lang="ts">
document.title = 'Decoraciones Castillo'
</script>
