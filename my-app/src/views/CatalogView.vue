<template>
  <div class="catalog">
    <h1 class="catalog-title">Каталог товаров</h1>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="products">
      <div v-for="product in products" :key="product.id" class="product">
        <img :src="`http://lifestealer86.ru/api-shop/${product.image}`" :alt="product.name" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price"><strong>Цена:</strong> {{ product.price }} ₽</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://lifestealer86.ru/api-shop/products');
        if (!response.ok) {
          throw new Error('Ошибка при загрузке товаров');
        }
        const data = await response.json();
        products.value = data.data;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchProducts);

    return { products, loading, error };
  }
};
</script>

<style scoped>
.catalog {
  max-width: 1100px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.catalog-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #888;
}

.error {
  color: red;
  text-align: center;
  font-size: 1.2rem;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product {
  border: 1px solid #ddd;
  padding: 20px;
  width: 220px;
  text-align: center;
  background: #fff;
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.product img {
  max-width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.product-name {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
}

.product-description {
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
  height: 60px;
  overflow: hidden;
}

.product-price {
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
}

@media (max-width: 768px) {
  .products {
    justify-content: flex-start;
  }

  .product {
    width: 180px;
  }
}
</style>
