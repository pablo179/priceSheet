export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount)
}

export const formatDate = (date: Date) => {
  // return the date in the format 5 de enero de 2021
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  //@ts-ignore
  return date.toLocaleDateString('es-MX', options)
}
