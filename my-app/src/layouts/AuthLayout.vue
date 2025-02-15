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
/* Контейнер для main */
main {
  padding: 20px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9; /* Мягкий фон для основного контента */
}

/* Добавим стили для футера */
footer {
  background-color: #222;
  color: white;
  padding: 20px 0;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 20px;
  border-top: 1px solid #ddd;
}

footer a {
  color: #007bff;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
</style>
