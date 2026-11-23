<script setup>
import { computed } from 'vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import ContactLinks from './ContactLinks.vue'
import OrderSteps from './OrderSteps.vue'
import { useOrderDialog } from '@/composables/useOrderDialog'
import { getCategoryLabel } from '@/config/categories'

const { isOpen, product, close } = useOrderDialog()

const model = computed({
  get: () => isOpen.value,
  set: (value) => {
    if (!value) close()
  },
})

const message = computed(() =>
  product.value ? `Здравствуйте! Хочу заказать: ${product.value.name}.` : 'Здравствуйте! Хочу сделать заказ.',
)
</script>

<template>
  <BaseDialog v-model:open="model" title="Как заказать?">
    <div class="order">
      <div v-if="product" class="order__product">
        <img v-if="product.imageUrl" :src="product.imageUrl" alt="" class="order__thumb" width="56" height="56" />
        <div>
          <p class="order__product-label">{{ getCategoryLabel(product.type) }}</p>
          <p class="order__product-name">{{ product.name }}</p>
        </div>
      </div>

      <OrderSteps compact />

      <p class="order__note">
        <BaseIcon name="info" :size="18" />
        <span>Цены могут меняться — <strong>точные цены уточняйте у менеджера.</strong></span>
      </p>

      <div class="order__contacts">
        <h3 class="order__subtitle">Контакты для связи</h3>
        <ContactLinks :message="message" />
      </div>
    </div>
  </BaseDialog>
</template>

<style scoped>
.order {
  display: grid;
  gap: var(--space-5);
}

.order__product {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--gray-50);
}

.order__thumb {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  background: var(--white);
  object-fit: contain;
}

.order__product-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.order__product-name {
  font-weight: 600;
  color: var(--navy-900);
}

.order__note {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--amber-100);
  color: #6b4a17;
  font-size: var(--text-sm);
}

.order__note .icon {
  margin-top: 2px;
}

.order__subtitle {
  margin-bottom: var(--space-3);
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--navy-900);
}
</style>
