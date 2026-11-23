<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'

/** Шапка внутренней страницы: хлебные крошки, заголовок, описание. */
defineProps({
  title: { type: String, required: true },
  /** [{ label, to? }] — последний элемент считается текущей страницей. */
  breadcrumbs: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="page-header">
    <div class="container page-header__inner">
      <nav v-if="breadcrumbs.length" aria-label="Хлебные крошки">
        <ol class="crumbs">
          <li v-for="(crumb, index) in breadcrumbs" :key="crumb.label" class="crumbs__item">
            <RouterLink v-if="crumb.to && index < breadcrumbs.length - 1" :to="crumb.to">{{ crumb.label }}</RouterLink>
            <span v-else aria-current="page">{{ crumb.label }}</span>
            <BaseIcon v-if="index < breadcrumbs.length - 1" name="chevron-down" :size="14" class="crumbs__sep" />
          </li>
        </ol>
      </nav>
      <h1 class="page-header__title">{{ title }}</h1>
      <p v-if="$slots.default" class="page-header__text"><slot /></p>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  padding-block: calc(var(--header-h) + var(--space-7)) var(--space-7);
  color: var(--white);
  background:
    radial-gradient(ellipse at 80% -20%, rgb(91 186 216 / 0.28), transparent 60%),
    linear-gradient(180deg, rgb(10 32 54 / 0.9), rgb(15 45 75 / 0.94)),
    url('@/assets/images/depth.webp') center 30% / cover;
}

.page-header__inner {
  display: grid;
  gap: var(--space-3);
}

.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  color: var(--color-text-inverse-muted);
  font-size: var(--text-sm);
}

.crumbs__item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.crumbs__item a:hover {
  color: var(--white);
}

.crumbs__sep {
  transform: rotate(-90deg);
  opacity: 0.6;
}

.page-header__title {
  font-size: var(--text-3xl);
}

.page-header__text {
  max-width: 620px;
  color: var(--color-text-inverse-muted);
  font-size: var(--text-lg);
}
</style>
