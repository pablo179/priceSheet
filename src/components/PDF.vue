<script setup lang="ts">
import backImage from '../assets/back2.jpg'
import { formatMoney, formatDate } from '../utils'
import { usePdfStore } from '../stores/pdfStore'

const {
  VITE_APP_ADDRESS,
  VITE_APP_PHONE,
  VITE_APP_PHONE_2,
  VITE_APP_DATE_PREFIX,
  VITE_APP_CLABE,
  VITE_APP_BANK,
  VITE_APP_SIGNATURE,
  VITE_APP_SIGNATURE_2
  //@ts-ignore
} = import.meta.env
const {
  pdf: { date, requester, products, subTotal, total, iva }
} = usePdfStore()
</script>

<template>
  <div id="pdf-container">
    <img :src="backImage" alt="back" class="img-back" />
    <div class="flex-box">
      <h1 class="logo">
        <span class="first-word--logo">Decoraciones</span>
        <span class="last-word--logo">Castillo</span>
      </h1>
      <div class="info">
        <span class="address"> {{ VITE_APP_ADDRESS }} </span>
        <span class="tel"> {{ VITE_APP_PHONE }}</span>
        <span class="tel"> {{ VITE_APP_PHONE_2 }} </span>
      </div>
      <div class="vertical-box between">
        <div>
          <div class="custom-subtitle">Solicitante:</div>
          <p class="atn">{{ requester }}</p>
        </div>
        <div class="date">{{ VITE_APP_DATE_PREFIX }} a {{ date && formatDate(date) }}</div>
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
            <tr v-for="item in products" :key="item.concept">
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
                {{ formatMoney(subTotal) }}
              </td>
            </tr>
            <tr>
              <td colspan="3" class="subtotal-label">IVA 16%:</td>
              <td class="subtotal">
                {{ formatMoney(iva) }}
              </td>
            </tr>
            <tr>
              <td colspan="2" class="total-label"></td>
              <td colspan="2" class="overallTotal">
                <span>Total: </span>
                {{ formatMoney(total) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="terms">
        <div class="custom-subtitle">Terminos y Condiciones</div>
        <p>
          Tiempo de entrega 8 días hábiles a partir de la fecha de anticipo. El anticipo es del 60%
          del total de la cotización. El saldo restante se liquida al momento de la entrega. Esta
          cotización tiene una vigencia de 15 días a partir de la fecha de emisión. Entrega
          programada a partir del anticipo.
        </p>
        <div class="custom-subtitle">Formas de Pago:</div>
        <p>
          Efectivo, transferencia electrónica, depósito bancario. Clabe: {{ VITE_APP_CLABE }} Banco
          {{ VITE_APP_BANK }}
        </p>
      </div>
      <div class="signature">
        <span> {{ VITE_APP_SIGNATURE }} </span>
        <span> {{ VITE_APP_SIGNATURE_2 }} </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#pdf-container {
  width: 814px;
  height: 1054px;
  position: relative;
  padding: 40px 0px;

  .img-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    z-index: -1;
  }

  .flex-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .logo {
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 60px;

      .first-word--logo {
        font-size: 30px;
        font-weight: 600;
      }

      .last-word--logo {
        font-size: 36px;
        font-weight: 700;
        font-family: 'Montserrat', sans-serif;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 60px;
      margin-top: 10px;
      font-weight: 600;
      width: 50%;

      span {
        font-size: 12px;
      }
    }

    .date {
      font-weight: 600;
      margin-right: 60px;
      width: 225px;
    }

    .custom-subtitle {
      font-size: 20px;
      font-weight: 600;
      margin-left: 60px;
    }

    .atn {
      width: auto;
      white-space: pre-wrap;
      margin-left: 60px;
      font-weight: 500;
    }

    .vertical-box {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      &.between {
        justify-content: space-between;
      }
    }

    .table-bg {
      width: 714px;
      margin: 30px 50px;
      background: rgba(255, 255, 255, 0.725);

      .products-table {
        border-collapse: collapse;
        margin: 10px;
        width: 694px;

        thead {
          border: 2px solid #3b3535;

          th {
            padding: 10px;
            font-weight: 600;
            text-align: center;
          }
        }

        tbody {
          tr {
            height: 45px;
            border-bottom: 1px solid #3b3535;

            td {
              padding: 10px;

              &.quantity {
                text-align: center;
              }

              &.concept {
                > div {
                  font-size: 14px;
                  font-weight: 500;
                  white-space: pre-wrap;
                }

                .spec {
                  font-size: 12px;
                  text-align: end;
                  padding: 5px 9px;
                }
              }

              &.price,
              &.total {
                text-align: center;
                font-size: 12px;
                font-weight: 500;
              }
            }
          }
        }

        tfoot {
          tr {
            border-bottom: none;

            > td {
              text-align: right;

              &.subtotal,
              &.overallTotal {
                text-align: center;

                &.overallTotal {
                  font-size: 16px;
                  font-weight: 600;

                  span {
                    font-weight: 400;
                    font-size: 16px;
                    margin-right: 20px;
                  }
                }
              }
            }

            &:last-child {
              td:last-child {
                border-top: 1px solid #3b3535;
                border-bottom: 2px solid #3b3535;
              }
            }
          }
        }
      }
    }

    .terms {
      p {
        margin: 0 60px;
      }
    }

    .signature {
      margin: 0 60px;
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-weight: 600;
    }
  }
}
</style>
