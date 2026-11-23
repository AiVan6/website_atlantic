<script setup>
import { ref, watch } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

/** Изображение товара с плавным появлением и запасным вариантом, если файл недоступен. */
const props = defineProps({
  src: { type: String, default: null },
  alt: { type: String, required: true },
  eager: { type: Boolean, default: false },
})

const status = ref(props.src ? 'loading' : 'error')

watch(
  () => props.src,
  (src) => {
    status.value = src ? 'loading' : 'error'
  },
)
</script>

<template>
  <div class="pimg" :class="`pimg--${status}`">
    <img
      v-if="src && status !== 'error'"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      class="pimg__img"
      @load="status = 'loaded'"
      @error="status = 'error'"
    />
    <div v-if="status === 'error'" class="pimg__fallback" role="img" :aria-label="alt">
      <BaseIcon name="fish" :size="40" :stroke-width="1.25" />
    </div>
  </div>
</template>

<style scoped>
.pimg {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--white);
}

.pimg--loading {
  background: linear-gradient(100deg, var(--gray-100) 30%, var(--gray-50) 50%, var(--gray-100) 70%) 0 0 / 300% 100%;
  animation: shimmer 1.4s linear infinite;
}

.pimg__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}

.pimg--loaded .pimg__img {
  opacity: 1;
}

.pimg__fallback {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: var(--aqua-50);
  color: var(--aqua-400);
}

@keyframes shimmer {
  to {
    background-position: -150% 0;
  }
}
</style>
