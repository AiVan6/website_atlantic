<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
</script>

<template>
  <PageHeader title="Страница не найдена">
    Возможно, она была перемещена или в адресе допущена ошибка.
  </PageHeader>
  <section class="container section not-found">
    <p class="not-found__code" aria-hidden="true">404</p>
    <div class="not-found__actions">
      <BaseButton :to="{ name: 'home' }" icon="arrow-left">На главную</BaseButton>
      <BaseButton :to="{ name: 'catalog' }" variant="ghost">Перейти в каталог</BaseButton>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  display: grid;
  justify-items: center;
  gap: var(--space-5);
  text-align: center;
}

.not-found__code {
  font-family: var(--font-display);
  font-size: clamp(5rem, 3rem + 10vw, 9rem);
  font-weight: 700;
  line-height: 1;
  color: var(--aqua-100);
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}
</style>
