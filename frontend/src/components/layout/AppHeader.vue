<script setup>
import { computed, nextTick, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandLogo from './BrandLogo.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import ContactLinks from '@/components/contact/ContactLinks.vue'
import { navigation } from '@/config/site'
import { useOrderDialog } from '@/composables/useOrderDialog'
import { useScrolledPast } from '@/composables/useScrolledPast'

const route = useRoute()
const { open: openOrder } = useOrderDialog()
const isScrolled = useScrolledPast(24)
const isMenuOpen = ref(false)
const toggle = useTemplateRef('toggle')
const panel = useTemplateRef('panel')

// Прозрачная шапка поверх первого экрана — только там, где это задано маршрутом.
const isTransparent = computed(() => route.meta.transparentHeader && !isScrolled.value && !isMenuOpen.value)

function isActive(item) {
  return item.to.name === 'catalog' && route.name === 'catalog'
}

function setMenu(open) {
  isMenuOpen.value = open
  document.documentElement.classList.toggle('is-scroll-locked', open)
  if (open) {
    nextTick(() => panel.value?.querySelector('a, button')?.focus())
  }
}

function closeMenu({ restoreFocus = false } = {}) {
  if (!isMenuOpen.value) return
  setMenu(false)
  if (restoreFocus) toggle.value?.focus()
}

function orderFromMenu() {
  closeMenu()
  openOrder()
}

watch(() => route.fullPath, () => closeMenu())
onBeforeUnmount(() => document.documentElement.classList.remove('is-scroll-locked'))
</script>

<template>
  <header
    class="header"
    :class="{ 'header--transparent': isTransparent, 'header--menu-open': isMenuOpen }"
    @keydown.esc="closeMenu({ restoreFocus: true })"
  >
    <div class="container header__inner">
      <BrandLogo :size="44" />

      <nav class="header__nav" aria-label="Основная навигация">
        <ul class="header__links">
          <li v-for="item in navigation" :key="item.label">
            <RouterLink
              :to="item.to"
              class="header__link"
              :class="{ 'is-active': isActive(item) }"
              :aria-current="isActive(item) ? 'page' : undefined"
              active-class=""
              exact-active-class=""
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <BaseButton class="header__cta" variant="outline-light" size="sm" icon="message" @click="openOrder()">
        Связаться
      </BaseButton>

      <button
        ref="toggle"
        type="button"
        class="header__toggle"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
        @click="setMenu(!isMenuOpen)"
      >
        <BaseIcon :name="isMenuOpen ? 'close' : 'menu'" :size="24" />
      </button>
    </div>

    <!--
      Меню вынесено в body: backdrop-filter шапки создаёт containing block для position: fixed,
      и внутри шапки панель не смогла бы занять весь экран.
    -->
    <Teleport to="body">
      <Transition name="menu">
        <div
          v-show="isMenuOpen"
          id="mobile-menu"
          ref="panel"
          class="menu"
          @keydown.esc="closeMenu({ restoreFocus: true })"
        >
          <nav class="container menu__inner" aria-label="Мобильная навигация">
            <ul class="menu__links">
              <li v-for="(item, index) in navigation" :key="item.label" :style="{ '--i': index }">
                <RouterLink :to="item.to" class="menu__link" active-class="" exact-active-class="">
                  {{ item.label }}
                  <BaseIcon name="arrow-right" :size="20" />
                </RouterLink>
              </li>
            </ul>

            <div class="menu__footer">
              <ContactLinks inverse />
              <BaseButton variant="light" block icon="message" @click="orderFromMenu">Как заказать?</BaseButton>
            </div>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  color: var(--white);
  background: rgb(10 32 54 / 0.9);
  backdrop-filter: saturate(1.4) blur(14px);
  box-shadow: 0 1px 0 rgb(255 255 255 / 0.06), 0 8px 24px -16px rgb(0 0 0 / 0.5);
  transition:
    background-color var(--duration-slow) var(--ease-out),
    box-shadow var(--duration-slow) var(--ease-out),
    backdrop-filter var(--duration-slow) var(--ease-out);
}

.header--transparent {
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
}

.header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  height: var(--header-h);
}

.header__nav {
  margin-left: auto;
}

.header__links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.header__link {
  position: relative;
  display: block;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  color: rgb(255 255 255 / 0.82);
  font-weight: 500;
  font-size: var(--text-sm);
  transition: color var(--duration) var(--ease-out);
}

.header__link::after {
  content: '';
  position: absolute;
  right: var(--space-3);
  bottom: 2px;
  left: var(--space-3);
  height: 2px;
  border-radius: 2px;
  background: var(--aqua-400);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration) var(--ease-out);
}

.header__link:hover,
.header__link.is-active {
  color: var(--white);
}

.header__link:hover::after,
.header__link.is-active::after {
  transform: scaleX(1);
}

.header__toggle {
  display: none;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-left: auto;
  margin-right: calc(var(--space-2) * -1);
  border: 0;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--white);
  -webkit-tap-highlight-color: transparent;
}

.header__toggle:hover {
  background: rgb(255 255 255 / 0.1);
}

/* Мобильное меню */
.menu {
  position: fixed;
  inset: var(--header-h) 0 0;
  z-index: 45;
  color: var(--white);
  overflow-y: auto;
  overscroll-behavior: contain;
  background:
    linear-gradient(180deg, rgb(10 32 54 / 0.96), rgb(6 21 37 / 0.98)),
    url('@/assets/images/depth.webp') center / cover;
}

.menu__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  min-height: 100%;
  padding-block: var(--space-5) calc(var(--space-6) + env(safe-area-inset-bottom));
}

.menu__links {
  display: grid;
}

.menu__links li {
  border-bottom: 1px solid rgb(255 255 255 / 0.1);
}

.menu__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) 0;
  font-family: var(--font-display);
  font-size: 1.625rem;
  font-weight: 600;
  line-height: 1.2;
}

.menu__link .icon {
  color: var(--aqua-400);
  transition: transform var(--duration) var(--ease-out);
}

.menu__link:hover .icon {
  transform: translateX(4px);
}

.menu__footer {
  display: grid;
  gap: var(--space-4);
  margin-top: auto;
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.menu-enter-active .menu__links li {
  animation: menu-item var(--duration-slow) var(--ease-out) both;
  animation-delay: calc(var(--i) * 40ms);
}

@keyframes menu-item {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

@media (max-width: 1023px) {
  .header__nav,
  .header__cta {
    display: none;
  }

  .header__toggle {
    display: grid;
  }
}

@media (min-width: 1024px) {
  .menu {
    display: none !important;
  }
}
</style>
