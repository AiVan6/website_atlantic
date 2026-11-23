<script setup>
import { computed } from 'vue'
import heroLarge from '@/assets/images/hero-1760.webp'
import heroSmall from '@/assets/images/hero-960.webp'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { company } from '@/config/site'
import { useOrderDialog } from '@/composables/useOrderDialog'
import { useProducts } from '@/composables/useProducts'
import { pluralize } from '@/utils/catalog'

const { products, status } = useProducts()
const { open: openOrder } = useOrderDialog()

const stats = computed(() => {
  const items = [
    { value: `${company.yearsOnMarket}+`, label: `${pluralize(company.yearsOnMarket, ['год', 'года', 'лет'])} на рынке` },
    { value: `${company.partnerStores}+`, label: 'магазинов-партнёров' },
  ]
  if (status.value === 'success' && products.value.length > 0) {
    const count = products.value.length
    items.push({ value: String(count), label: `${pluralize(count, ['позиция', 'позиции', 'позиций'])} в каталоге` })
  }
  return items
})
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <img
      class="hero__bg"
      :src="heroLarge"
      :srcset="`${heroSmall} 960w, ${heroLarge} 1760w`"
      sizes="100vw"
      alt=""
      fetchpriority="high"
      decoding="async"
    />
    <div class="hero__overlay" aria-hidden="true"></div>

    <div class="container hero__content">
      <h1 id="hero-title" class="hero__title">
        Рыба горячего <br class="hero__br" />и&nbsp;холодного копчения
      </h1>
      <p class="hero__lead">
        «{{ company.name }}» — надёжный поставщик копчёной, солёной и вяленой рыбы и снековой продукции для
        магазинов и покупателей {{ company.regionOf }}.
      </p>
      <div class="hero__actions">
        <BaseButton :to="{ name: 'catalog' }" variant="light" size="lg" icon-right="arrow-right">
          Смотреть каталог
        </BaseButton>
        <BaseButton variant="outline-light" size="lg" @click="openOrder()">Как заказать?</BaseButton>
      </div>

      <dl class="hero__stats">
        <div v-for="stat in stats" :key="stat.label" class="hero__stat">
          <dt class="visually-hidden">{{ stat.label }}</dt>
          <dd>
            <span class="hero__stat-value">{{ stat.value }}</span>
            <span class="hero__stat-label" aria-hidden="true">{{ stat.label }}</span>
          </dd>
        </div>
      </dl>
    </div>

    <a href="#products" class="hero__scroll" aria-label="К разделу «Продукция»">
      <BaseIcon name="chevron-down" :size="24" />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: max(600px, 100svh);
  padding-block: calc(var(--header-h) + var(--space-7)) var(--space-8);
  overflow: hidden;
  color: var(--white);
  background: var(--navy-900);
  isolation: isolate;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 60% center;
  animation: hero-zoom 18s var(--ease-out) both;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg, rgb(6 21 37 / 0.88) 0%, rgb(6 21 37 / 0.6) 45%, rgb(6 21 37 / 0.15) 100%),
    linear-gradient(0deg, rgb(6 21 37 / 0.75) 0%, transparent 40%),
    linear-gradient(180deg, rgb(6 21 37 / 0.5) 0%, transparent 25%);
}

.hero__content {
  display: grid;
  justify-items: start;
  gap: var(--space-5);
}

.hero__content > * {
  animation: rise var(--duration-slow) var(--ease-out) both;
}

.hero__content > :nth-child(2) {
  animation-delay: 60ms;
}

.hero__content > :nth-child(3) {
  animation-delay: 120ms;
}

.hero__content > :nth-child(4) {
  animation-delay: 180ms;
}

.hero__content > :nth-child(5) {
  animation-delay: 240ms;
}

.hero__title {
  max-width: 14ch;
  font-size: var(--text-hero);
  line-height: 1.04;
}

.hero__lead {
  max-width: 560px;
  color: rgb(230 240 250 / 0.85);
  font-size: var(--text-lg);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5) var(--space-7);
  margin: var(--space-6) 0 0;
  padding-top: var(--space-5);
  border-top: 1px solid rgb(255 255 255 / 0.16);
}

.hero__stat dd {
  display: grid;
  margin: 0;
}

.hero__stat-value {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.1;
}

.hero__stat-label {
  color: rgb(220 233 245 / 0.7);
  font-size: var(--text-sm);
}

.hero__scroll {
  position: absolute;
  bottom: var(--space-5);
  left: 50%;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  color: rgb(255 255 255 / 0.8);
  transform: translateX(-50%);
  animation: bob 2.4s ease-in-out infinite;
}

.hero__scroll:hover {
  color: var(--white);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@keyframes hero-zoom {
  from {
    transform: scale(1.08);
  }
}

@keyframes bob {
  50% {
    transform: translate(-50%, 6px);
  }
}

@media (max-width: 599px) {
  .hero {
    align-items: flex-end;
  }

  .hero__overlay {
    background:
      linear-gradient(0deg, rgb(6 21 37 / 0.94) 0%, rgb(6 21 37 / 0.7) 55%, rgb(6 21 37 / 0.35) 100%);
  }

  .hero__br {
    display: none;
  }

  .hero__actions {
    width: 100%;
  }

  .hero__actions > * {
    flex: 1 1 100%;
  }

  .hero__stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-3);
    width: 100%;
    margin-top: var(--space-4);
  }

  .hero__stat-label {
    font-size: var(--text-xs);
    line-height: 1.3;
  }

  .hero__scroll {
    display: none;
  }
}

@media (max-height: 700px) and (min-width: 600px) {
  .hero__scroll {
    display: none;
  }
}
</style>
