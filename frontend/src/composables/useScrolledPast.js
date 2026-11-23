import { onBeforeUnmount, onMounted, ref } from 'vue'

/** true, когда страница прокручена дальше порога (в пикселях). */
export function useScrolledPast(threshold) {
  const isPast = ref(false)
  let frame = 0

  function update() {
    frame = 0
    isPast.value = window.scrollY > threshold
  }

  function onScroll() {
    if (!frame) frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    if (frame) cancelAnimationFrame(frame)
  })

  return isPast
}
