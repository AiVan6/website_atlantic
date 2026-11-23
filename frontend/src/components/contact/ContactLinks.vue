<script setup>
import { computed } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { contacts, whatsappLink } from '@/config/site'

const props = defineProps({
  /** Текст, который подставится в сообщение WhatsApp. */
  message: { type: String, default: '' },
  inverse: { type: Boolean, default: false },
  /** compact — только иконки с подписями-подсказками. */
  compact: { type: Boolean, default: false },
})

const items = computed(() => [
  {
    key: 'phone',
    icon: 'phone',
    label: 'Позвонить',
    value: contacts.phone.display,
    href: contacts.phone.href,
    external: false,
  },
  {
    key: 'telegram',
    icon: 'telegram',
    label: 'Telegram',
    value: contacts.telegram.display,
    href: contacts.telegram.href,
    external: true,
  },
  {
    key: 'whatsapp',
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: contacts.whatsapp.display,
    href: whatsappLink(props.message),
    external: true,
  },
])
</script>

<template>
  <ul class="contacts" :class="{ 'contacts--inverse': inverse, 'contacts--compact': compact }">
    <li v-for="item in items" :key="item.key">
      <a
        class="contact"
        :class="`contact--${item.key}`"
        :href="item.href"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noopener noreferrer' : undefined"
        :aria-label="compact ? `${item.label}: ${item.value}` : undefined"
        :title="compact ? item.label : undefined"
      >
        <span class="contact__icon">
          <BaseIcon :name="item.icon" :size="20" />
        </span>
        <span v-if="!compact" class="contact__text">
          <span class="contact__label">{{ item.label }}</span>
          <span class="contact__value">{{ item.value }}</span>
        </span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.contacts {
  display: grid;
  gap: var(--space-3);
}

.contacts--compact {
  display: flex;
  gap: var(--space-3);
}

.contact {
  --contact-accent: var(--blue-600);

  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition:
    border-color var(--duration) var(--ease-out),
    background-color var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out);
}

.contact:hover {
  border-color: var(--contact-accent);
  transform: translateY(-1px);
}

.contact--telegram {
  --contact-accent: var(--color-telegram);
}

.contact--whatsapp {
  --contact-accent: var(--color-whatsapp);
}

.contact__icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--contact-accent) 12%, transparent);
  color: var(--contact-accent);
  transition:
    background-color var(--duration) var(--ease-out),
    color var(--duration) var(--ease-out);
}

.contact:hover .contact__icon {
  background: var(--contact-accent);
  color: var(--white);
}

.contact__text {
  display: grid;
  line-height: 1.3;
}

.contact__label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.contact__value {
  font-weight: 600;
  color: var(--navy-900);
}

.contacts--compact .contact {
  padding: 0;
  border: 0;
  background: none;
}

/* Тёмный фон (подвал) */
.contacts--inverse .contact {
  border-color: rgb(255 255 255 / 0.12);
  background: rgb(255 255 255 / 0.04);
}

.contacts--inverse .contact:hover {
  border-color: var(--contact-accent);
  background: rgb(255 255 255 / 0.08);
}

.contacts--inverse .contact__icon {
  background: rgb(255 255 255 / 0.08);
  color: var(--white);
}

.contacts--inverse .contact__label {
  color: var(--color-text-inverse-muted);
}

.contacts--inverse .contact__value {
  color: var(--white);
}

.contacts--inverse.contacts--compact .contact {
  background: none;
}
</style>
