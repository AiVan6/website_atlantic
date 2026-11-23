<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import OrderSteps from '@/components/contact/OrderSteps.vue'
import { contacts, whatsappLink } from '@/config/site'
</script>

<template>
  <section id="order" class="section order" aria-labelledby="order-title">
    <div class="container">
      <SectionHeading eyebrow="Заказ" title="Как заказать" title-id="order-title">
        Оформление заказа занимает пару минут: свяжитесь с менеджером любым удобным способом.
      </SectionHeading>

      <OrderSteps class="order__steps" />

      <div class="order__cta">
        <p class="order__cta-text">
          <strong>Цены могут меняться.</strong> Точную стоимость и наличие уточняйте у менеджера.
        </p>
        <div class="order__cta-actions">
          <BaseButton :href="whatsappLink('Здравствуйте! Хочу сделать заказ.')" icon="whatsapp">
            Написать в WhatsApp
          </BaseButton>
          <BaseButton :href="contacts.phone.href" variant="ghost" icon="phone">{{ contacts.phone.display }}</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.order {
  padding-top: 0;
}

.order__steps {
  margin-top: var(--space-7);
}

.order__cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-5);
  padding: var(--space-5) var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.order__cta-text {
  color: var(--color-text-muted);
}

.order__cta-text strong {
  color: var(--navy-900);
}

.order__cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

@media (max-width: 599px) {
  .order__cta {
    padding: var(--space-5);
  }

  .order__cta-actions,
  .order__cta-actions > * {
    width: 100%;
  }
}
</style>
