import { readonly, ref, shallowRef } from 'vue'

const isOpen = ref(false)
const product = shallowRef(null)

export function useOrderDialog() {
  function open(selectedProduct = null) {
    product.value = selectedProduct
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen: readonly(isOpen), product: readonly(product), open, close }
}
