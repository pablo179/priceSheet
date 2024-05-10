<script setup lang="ts">
// @ts-ignore
import html2pdf from 'html2pdf.js'
import backImage from './assets/back2.jpg'
import { formatMoney } from './utils'

const exportPdf = () => {
  html2pdf(document.getElementById('pdf-container'), {
    margin: 0,
    filename: 'myfile.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  })
}
const atn = `Jorge De Santiago Contreras\nTitular Del Area Cordinadora De Archivos\nDel Auntamiento De Pahuatlan`

const data = [
  {
    quantity: 1,
    concept: 'Material Screen Basic One apertura al 1%',
    spec: '1.50 x 1.50 mts. color blanco',
    price: 17000
  },
  {
    quantity: 2,
    concept: 'Material Screen Basic One apertura al 1%',
    spec: '1.50 x 1.50 mts. color blanco \n checking break line',
    price: 17000
  }
]
</script>

<template>
  <button @click="exportPdf">Export</button>
  <div id="pdf-container">
    <img :src="backImage" alt="back" class="img-back" />
    <div class="flex-box">
      <h1 class="logo">
        <span class="first-word--logo">Decoraciones</span>
        <span class="last-word--logo">Castillo</span>
      </h1>
      <div class="info">
        <span class="address">
          Av. 21 De Marzo #1002 Col. Insurgentes Tulancingo De Bravo Hidalgo
        </span>
        <span class="tel"> Tel. (775) 7553920 </span>
      </div>
      <div class="vertical-box between">
        <div>
          <div class="subtitle">Solicitante:</div>
          <p class="atn">{{ atn }}</p>
        </div>
        <div class="date">Tulancingo de Bravo, Hidalgo a 5 de marzo 2024</div>
      </div>
      <div class="table-bg">
        <table class="products-table">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Concepto</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.concept">
              <td class="quantity">{{ item.quantity }}</td>
              <td class="concept">
                <div>{{ item.concept }}</div>
                <div class="spec">{{ item.spec }}</div>
              </td>
              <td class="price">{{ formatMoney(item.price) }}</td>
              <td class="total">{{ formatMoney(item.price * item.quantity) }}</td>
            </tr>
            <tr></tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="subtotal-label">Subtotal:</td>
              <td class="subtotal">
                {{ formatMoney(data.reduce((acc, item) => acc + item.price * item.quantity, 0)) }}
              </td>
            </tr>
            <tr>
              <td colspan="3" class="subtotal-label">IVA 16%:</td>
              <td class="subtotal">
                {{
                  formatMoney(
                    data.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.16
                  )
                }}
              </td>
            </tr>
            <tr>
              <td colspan="2" class="total-label"></td>
              <td colspan="2" class="overallTotal">
                <span>Total: </span>
                {{
                  formatMoney(
                    Math.round(
                      data.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.16
                    )
                  )
                }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="terms">
        <div class="subtitle">Terminos y Condiciones</div>
        <p>
          Tiempo de entrega 8 días hábiles a partir de la fecha de anticipo. El anticipo es del 60%
          del total de la cotización. El saldo restante se liquida al momento de la entrega. Esta
          cotización tiene una vigencia de 15 días a partir de la fecha de emisión. Entrega
          programada a partir del anticipo.
        </p>
        <div class="subtitle">Formas de Pago:</div>
        <p>
          Efectivo, transferencia electrónica, depósito bancario. Clabe: 036312500208468143 Banco
          Inbursa a nombre de Edgar Daniel Castillo Morales
        </p>
      </div>
      <div class="signature">
        <span>Decoraciones Castillo agradece su preferencia</span>
        <span>Ing. Edgar Daniel Castillo Morales</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
