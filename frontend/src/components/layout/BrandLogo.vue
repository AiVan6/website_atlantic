<script setup>
import logoUrl from '@/assets/images/logo.png'
import { company } from '@/config/site'

defineProps({
  size: { type: Number, default: 44 },
})
</script>

<template>
  <RouterLink :to="{ name: 'home' }" class="brand" :aria-label="`${company.name} — на главную`">
    <span class="brand__mark" :style="{ width: `${size}px`, height: `${size}px` }">
      <img :src="logoUrl" alt="" :width="size" :height="size" />
    </span>
    <span class="brand__name">{{ company.name }}</span>
  </RouterLink>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--white);
}

.brand__mark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: transform var(--duration-slow) var(--ease-out);
}

.brand:hover .brand__mark {
  transform: rotate(-12deg);
}

.brand__name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.01em;
  /* El Messiri визуально сидит выше базовой линии */
  padding-top: 0.2em;
}
</style>
