<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { whatsappLink } from '@/config/site'
import { useScrolledPast } from '@/composables/useScrolledPast'

const showToTop = useScrolledPast(600)

function scrollToTop() {
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <div class="fab-stack">
    <Transition name="fab">
      <button v-show="showToTop" type="button" class="fab fab--top" aria-label="Наверх" @click="scrollToTop">
        <BaseIcon name="arrow-up" :size="20" />
      </button>
    </Transition>
    <a
      class="fab fab--whatsapp"
      :href="whatsappLink('Здравствуйте! У меня вопрос по ассортименту.')"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
    >
      <BaseIcon name="whatsapp" :size="28" :stroke-width="1.6" />
    </a>
  </div>
</template>

<style scoped>
.fab-stack {
  position: fixed;
  right: max(var(--space-4), env(safe-area-inset-right));
  bottom: max(var(--space-4), env(safe-area-inset-bottom));
  z-index: 40;
  display: grid;
  justify-items: center;
  gap: var(--space-3);
}

.fab {
  display: grid;
  place-items: center;
  border: 0;
  border-radius: var(--radius-full);
  color: var(--white);
  box-shadow: var(--shadow-lg);
  transition:
    transform var(--duration) var(--ease-out),
    background-color var(--duration) var(--ease-out),
    opacity var(--duration) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}

.fab:hover {
  transform: translateY(-2px);
}

.fab--top {
  width: 44px;
  height: 44px;
  background: rgb(15 45 75 / 0.88);
  backdrop-filter: blur(8px);
}

.fab--top:hover {
  background: var(--navy-700);
}

.fab--whatsapp {
  width: 56px;
  height: 56px;
  background: var(--color-whatsapp);
}

.fab--whatsapp:hover {
  background: #18924a;
}

.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.9);
}

@media (max-width: 599px) {
  .fab--whatsapp {
    width: 52px;
    height: 52px;
  }
}
</style>
