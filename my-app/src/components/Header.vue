<template>
  <header>
    <nav>
      <router-link to="/catalog">Каталог</router-link>
      <router-link to="/cart">Корзина</router-link>
      <router-link to="/orders">Мои заказы</router-link>
      <router-link to="/login">Войти</router-link>
    </nav>
  </header>
</template>

<style scoped>
header {
  background: #333;
  color: white;
  padding: 10px;
}
nav a {
  color: white;
  margin-right: 15px;
  text-decoration: none;
}
</style>
