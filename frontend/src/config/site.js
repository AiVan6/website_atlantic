/**
 * Контент и контакты компании — единый источник для всех компонентов.
 * Меняйте данные здесь, а не в разметке.
 */

const PHONE_E164 = '+79069611329'
const WHATSAPP_NUMBER = PHONE_E164.slice(1)

export const company = {
  name: 'Атлантика',
  tagline: 'Рыба горячего и холодного копчения',
  region: 'Алтайский край',
  /** Предложный падеж: «в Алтайском крае». */
  regionIn: 'Алтайском крае',
  /** Родительный падеж: «покупателей Алтайского края». */
  regionOf: 'Алтайского края',
  yearsOnMarket: 16,
  partnerStores: 150,
}

export const contacts = {
  phone: {
    href: `tel:${PHONE_E164}`,
    display: '+7 906 961-13-29',
  },
  telegram: {
    href: 'https://t.me/Atlantika8',
    display: '@Atlantika8',
  },
  whatsapp: {
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    display: '+7 906 961-13-29',
  },
}

/** Ссылка на WhatsApp с заранее подготовленным сообщением. */
export function whatsappLink(message) {
  if (!message) return contacts.whatsapp.href
  return `${contacts.whatsapp.href}?text=${encodeURIComponent(message)}`
}

export const navigation = [
  { label: 'Каталог', to: { name: 'catalog' } },
  { label: 'О компании', to: { name: 'home', hash: '#about' } },
  { label: 'Как заказать', to: { name: 'home', hash: '#order' } },
  { label: 'Контакты', to: { hash: '#contacts' } },
]

export const priceDisclaimer = 'Для получения точной и корректной информации рекомендуется обратиться к менеджеру.'

/** Порядок оформления заказа (используется в разделе на главной и в окне «Как заказать?»). */
export const orderSteps = [
  {
    icon: 'message',
    title: 'Свяжитесь с нами',
    text: 'Позвоните оператору или напишите в Telegram или WhatsApp.',
  },
  {
    icon: 'list',
    title: 'Согласуйте список',
    text: 'Расскажите, какую продукцию и в каком объёме хотите приобрести.',
  },
  {
    icon: 'clock',
    title: 'Узнайте сумму и срок',
    text: 'Менеджер назовёт общую сумму заказа и примерное время готовности.',
  },
  {
    icon: 'store',
    title: 'Заберите заказ',
    text: 'Доставка по Бийску пока осуществляется только на торговую точку — самовывоз.',
  },
]
