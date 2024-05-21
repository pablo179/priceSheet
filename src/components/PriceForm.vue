<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { usePdfStore } from '../stores/pdfStore'
import { useFormStore } from '../stores/formStore'
import { storeToRefs } from 'pinia'

const store = usePdfStore()
const formStore = useFormStore()

const { pdf } = storeToRefs(store)

const clearDate = () => {
  pdf.value.date = null
}

const previousConcepts: any[] = []

const addProduct = () => {
  pdf.value.products.push({ quantity: 1, concept: '', spec: '', price: 0 })
}

const deleteProduct = (index: number) => {
  pdf.value.products.splice(index, 1)
}

const subTotal = computed(() => {
  return pdf.value.products.reduce((acc, row) => acc + row.quantity * row.price, 0)
})

const iva = computed(() => {
  return subTotal.value * 0.16
})

const total = computed(() => {
  return Math.round(subTotal.value * 1.16)
})

const handleSaveProduct = async () => {
  const product = pdf.value.products[0].concept
  const price = pdf.value.products[0].price
  await formStore.addProduct(product, price)
}

watchEffect(() => {
  pdf.value.subTotal = pdf.value.products.reduce((acc, row) => acc + row.quantity * row.price, 0)
  pdf.value.iva = pdf.value.subTotal * 0.16
  pdf.value.total = Math.round(pdf.value.subTotal * 1.16)
})
</script>

<template>
  <b-navbar type="is-primary" fixed="top" data-theme="dark">
    <template #brand>
      <b-navbar-item href="#">Decoraciones Castillo</b-navbar-item>
    </template>
  </b-navbar>
  <div class="container is-max-desktop">
    <form class="box">
      <b-field label="Fecha de emisión" style="width: 170px">
        <b-datepicker
          v-model="pdf.date"
          locale="es-MX"
          placeholder="Selecciona una fecha"
          icon="calendar-today"
          :icon-right="pdf.date ? 'close-circle' : ''"
          icon-right-clickable
          @icon-right-click="clearDate"
          trap-focus
        >
        </b-datepicker>
      </b-field>
      <b-field label="Solicitante">
        <b-input
          v-model="pdf.requester"
          type="textarea"
          placeholder="Nombre de solicitante"
        ></b-input>
      </b-field>
      <b-table :data="pdf.products">
        <b-table-column field="quantity" label="Cantidad" v-slot="props" width="100" numeric>
          <b-field>
            <b-numberinput
              size="is-small"
              v-model="props.row.quantity"
              :min="1"
              controls-position="compact"
            ></b-numberinput>
          </b-field>
        </b-table-column>
        <b-table-column field="concept" label="Concepto" v-slot="props">
          <b-field>
            <b-autocomplete
              v-model="props.row.concept"
              placeholder="Producto"
              open-on-focus
              :data="previousConcepts"
              @select="
                //@ts-ignore
                (option) => {
                  props.row.concept = option?.value
                  props.row.price = option?.price
                }
              "
              clearable
            />
          </b-field>
          <b-field
            label="Especificaciones del producto"
            label-position="on-border"
            style="width: 70%; margin-left: auto"
            @input="props.row.spec = $event.target.value"
          >
            <b-input type="textarea" custom-class="spec-textarea"></b-input>
          </b-field>
        </b-table-column>
        <b-table-column field="price" label="Precio" v-slot="props" width="120">
          <b-field>
            <b-input v-model="props.row.price" type="number" min="0" />
          </b-field>
        </b-table-column>
        <b-table-column field="total" label="Total" v-slot="props" width="120">
          <b-field>
            <b-input type="number" min="0" :value="props.row.quantity * props.row.price" />
          </b-field>
        </b-table-column>
        <b-table-column v-slot="props" width="100">
          <b-button @click="deleteProduct(props.index)" type="is-danger" icon-right="close" />
        </b-table-column>
        <template #footer>
          <div class="columns">
            <div class="column is-four-fifths has-text-centered">
              <b-button @click="addProduct" type="is-primary" icon-left="plus">
                Agregar Producto
              </b-button>
            </div>
            <div class="column">
              <b-field horizontal label="Sub Total">
                <b-input readonly :value="subTotal" />
              </b-field>
              <b-field horizontal label="IVA">
                <b-input readonly :value="iva" />
              </b-field>
              <b-field horizontal label="Total">
                <b-input readonly :value="total" />
              </b-field>
            </div>
          </div>
        </template>
      </b-table>
      <div class="has-text-centered">
        <button type="submit" @click.prevent="store.togglePreviewModal" class="button is-primary">
          Vista Previa
        </button>
        <button type="submit" @click.prevent="handleSaveProduct" class="button is-primary">
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>
