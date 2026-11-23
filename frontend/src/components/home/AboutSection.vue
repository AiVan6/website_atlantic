<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { company } from '@/config/site'

const highlights = [
  { icon: 'award', title: `Более ${company.yearsOnMarket} лет`, text: `на рынке ${company.regionOf}` },
  { icon: 'users', title: `${company.partnerStores}+ магазинов`, text: 'сотрудничают с нами по всему региону' },
  { icon: 'flame', title: 'Горячее и холодное копчение', text: 'а также солёная и вяленая рыба' },
  { icon: 'package', title: 'Снековая продукция', text: 'широкий выбор закусок к столу' },
]
</script>

<template>
  <section id="about" class="section about" aria-labelledby="about-title">
    <div class="container">
      <div class="about__panel">
        <div class="about__text">
          <SectionHeading eyebrow="О компании" title="О нас" title-id="about-title" />
          <p>
            <strong>«{{ company.name }}»</strong> — надёжный поставщик рыбы горячего и холодного копчения в
            Алтайском крае. С момента своего основания более {{ company.yearsOnMarket }} лет назад мы с гордостью
            предоставляем высококачественные продукты для наших клиентов.
          </p>
          <p>
            Мы специализируемся исключительно на перекупке качественной рыбы, которая проходит процесс горячего и
            холодного копчения, а также снековой продукции. Наша компания не занимается вылавливанием или готовкой
            рыбы, а является надёжным звеном в поставке копчёных деликатесов.
          </p>
          <p>
            На протяжении многих лет мы развивались и укрепляли свою репутацию, устанавливая партнёрские отношения с
            более чем {{ company.partnerStores }} магазинами по всему региону. Наш опыт и профессионализм позволяют
            удовлетворять потребности клиентов, предоставляя широкий ассортимент высококачественной рыбы.
          </p>
        </div>

        <ul class="about__highlights">
          <li v-for="item in highlights" :key="item.title" class="highlight">
            <span class="highlight__icon">
              <BaseIcon :name="item.icon" :size="24" />
            </span>
            <span class="highlight__title">{{ item.title }}</span>
            <span class="highlight__text">{{ item.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding-top: 0;
}

.about__panel {
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  align-items: center;
  gap: var(--space-7);
  padding: clamp(var(--space-5), 5vw, var(--space-8));
  overflow: hidden;
  border-radius: var(--radius-xl);
  background:
    radial-gradient(circle at 100% 0%, rgb(91 186 216 / 0.22), transparent 55%),
    linear-gradient(160deg, var(--aqua-50), #e8f1f8);
}

.about__text {
  display: grid;
  gap: var(--space-4);
  color: var(--gray-700);
  font-size: var(--text-lg);
}

.about__text > :first-child {
  margin-bottom: var(--space-2);
}

.about__text strong {
  color: var(--navy-900);
}

.about__highlights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

.highlight {
  display: grid;
  align-content: start;
  gap: var(--space-1);
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: rgb(255 255 255 / 0.8);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(6px);
}

.highlight__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--navy-800);
  color: var(--aqua-300);
}

.highlight__title {
  font-weight: 700;
  line-height: 1.3;
  color: var(--navy-900);
}

.highlight__text {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

@media (max-width: 899px) {
  .about__panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 479px) {
  .about__text {
    font-size: var(--text-base);
  }

  .about__highlights {
    gap: var(--space-3);
  }

  .highlight {
    padding: var(--space-4);
  }
}
</style>
