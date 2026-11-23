<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { pluralize } from '@/utils/catalog'

/** Плитки категорий — быстрый переход в каталог с выбранным фильтром. */
defineProps({
  categories: { type: Array, required: true },
  loading: { type: Boolean, default: false },
})
</script>

<template>
  <ul class="tiles" :aria-busy="loading">
    <template v-if="loading">
      <li v-for="n in 8" :key="n" class="tile tile--skeleton" aria-hidden="true"></li>
    </template>
    <li v-for="category in categories" v-else :key="category.type">
      <RouterLink :to="{ name: 'catalog', query: { type: category.type } }" class="tile">
        <span class="tile__icon">
          <BaseIcon :name="category.icon" :size="22" />
        </span>
        <span class="tile__text">
          <span class="tile__label">{{ category.label }}</span>
          <span class="tile__count">
            {{ category.count }} {{ pluralize(category.count, ['позиция', 'позиции', 'позиций']) }}
          </span>
        </span>
        <img v-if="category.coverUrl" :src="category.coverUrl" alt="" class="tile__cover" loading="lazy" decoding="async" />
        <BaseIcon name="arrow-right" :size="18" class="tile__arrow" />
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: var(--space-4);
}

.tile {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 96px;
  padding: var(--space-3) var(--space-4);
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  transition:
    border-color var(--duration) var(--ease-out),
    box-shadow var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out);
}

.tile:hover {
  border-color: var(--aqua-300);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.tile__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--aqua-50);
  color: var(--blue-600);
  transition:
    background-color var(--duration) var(--ease-out),
    color var(--duration) var(--ease-out);
}

.tile:hover .tile__icon {
  background: var(--navy-800);
  color: var(--white);
}

.tile__text {
  display: grid;
  flex: 1;
  min-width: 0;
  line-height: 1.3;
}

.tile__label {
  font-weight: 600;
  color: var(--navy-900);
}

.tile__count {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.tile__cover {
  flex-shrink: 0;
  width: 68px;
  height: 68px;
  border-radius: var(--radius-md);
  object-fit: contain;
  background: var(--white);
  transition: transform var(--duration-slow) var(--ease-out);
}

.tile:hover .tile__cover {
  transform: scale(1.08) rotate(-3deg);
}

.tile__arrow {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  color: var(--blue-500);
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out);
}

.tile:hover .tile__arrow {
  opacity: 1;
  transform: none;
}

.tile--skeleton {
  min-height: 96px;
  background: linear-gradient(100deg, var(--gray-100) 30%, var(--gray-50) 50%, var(--gray-100) 70%) 0 0 / 300% 100%;
  animation: shimmer 1.4s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: -150% 0;
  }
}

@media (hover: none) {
  .tile__arrow {
    display: none;
  }
}

/* Телефоны: две колонки компактных плиток без обложек */
@media (max-width: 559px) {
  .tiles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-3);
  }

  .tile {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    min-height: 0;
    padding: var(--space-4);
  }

  .tile__cover {
    display: none;
  }

  .tile__label {
    font-size: var(--text-sm);
  }

  .tile__count {
    font-size: var(--text-xs);
  }

  .tile--skeleton {
    min-height: 116px;
  }
}
</style>
