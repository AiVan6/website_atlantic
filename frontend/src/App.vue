<script setup>
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import FloatingActions from '@/components/layout/FloatingActions.vue'
import OrderDialog from '@/components/contact/OrderDialog.vue'
</script>

<template>
  <a href="#main" class="skip-link">Перейти к содержимому</a>
  <AppHeader />
  <main id="main" tabindex="-1">
    <RouterView />
  </main>
  <AppFooter />
  <FloatingActions />
  <OrderDialog />
</template>

<style scoped>
main {
  outline: none;
}
</style>
