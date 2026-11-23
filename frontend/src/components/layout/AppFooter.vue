<script setup>
import BrandLogo from './BrandLogo.vue'
import ContactLinks from '@/components/contact/ContactLinks.vue'
import { company, navigation } from '@/config/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contacts" class="footer" aria-labelledby="footer-title">
    <div class="container footer__inner">
      <div class="footer__about">
        <BrandLogo :size="52" />
        <p class="footer__tagline">
          {{ company.tagline }}, солёная и вяленая рыба, снеки. Более {{ company.yearsOnMarket }} лет
          в {{ company.regionIn }}.
        </p>
      </div>

      <div class="footer__contacts">
        <h2 id="footer-title" class="footer__title">Контакты</h2>
        <ContactLinks inverse />
      </div>

      <nav class="footer__nav" aria-label="Навигация в подвале">
        <h2 class="footer__title">Разделы</h2>
        <ul>
          <li><RouterLink :to="{ name: 'home' }">Главная</RouterLink></li>
          <li v-for="item in navigation.slice(0, -1)" :key="item.label">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="container footer__bottom">
      <p>© {{ year }} {{ company.name }}</p>
      <p>Информация на сайте не является публичной офертой. Цены и наличие уточняйте у менеджера.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding-top: var(--space-8);
  color: var(--color-text-inverse);
  background:
    linear-gradient(180deg, rgb(10 32 54 / 0.94), rgb(6 21 37 / 0.98)),
    url('@/assets/images/depth.webp') center top / cover;
}

.footer__inner {
  display: grid;
  grid-template-columns: 1.3fr 1fr 0.7fr;
  gap: var(--space-7);
  padding-bottom: var(--space-7);
}

.footer__about {
  display: grid;
  align-content: start;
  gap: var(--space-5);
}

.footer__tagline {
  max-width: 380px;
  color: var(--color-text-inverse-muted);
}

.footer__title {
  margin-bottom: var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--aqua-300);
}

.footer__nav ul {
  display: grid;
  gap: var(--space-3);
}

.footer__nav a {
  color: var(--color-text-inverse-muted);
  transition: color var(--duration) var(--ease-out);
}

.footer__nav a:hover {
  color: var(--white);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2) var(--space-5);
  padding-block: var(--space-5) calc(var(--space-5) + env(safe-area-inset-bottom));
  border-top: 1px solid rgb(255 255 255 / 0.1);
  color: rgb(220 233 245 / 0.55);
  font-size: var(--text-xs);
}

@media (max-width: 899px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
  }

  .footer__about {
    grid-column: 1 / -1;
  }
}

@media (max-width: 599px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}
</style>
