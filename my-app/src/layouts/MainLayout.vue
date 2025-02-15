<template>
  <div>
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
/* Основной контейнер для страницы */
main {
  padding: 20px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f4f4f4; /* Мягкий фон для улучшения восприятия */
}

/* Добавление стилей для футера */
footer {
  background-color: #222;
  color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 0.9rem;
  margin-top: 20px;
  border-top: 1px solid #ddd;
}

footer a {
  color: #4CAF50; /* Цвет ссылок */
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline; /* Подчеркнутые ссылки при наведении */
}
</style>
