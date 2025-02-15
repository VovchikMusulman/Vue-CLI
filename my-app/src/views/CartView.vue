<template>
  <div class="cart">
    <h1 class="cart-title">Корзина</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">Корзина пуста</div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="cart-item-image"/>
        <div class="cart-item-details">
          <h2 class="cart-item-name">{{ item.name }}</h2>
          <p class="cart-item-price">Цена: {{ item.price }} ₽</p>
          <p class="cart-item-quantity">Количество: {{ item.quantity }}</p>
          <button @click="removeFromCart(item.id)" class="remove-btn">Удалить</button>
        </div>
      </div>
      <h2 class="total-price">Общая сумма: {{ totalPrice }} ₽</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: []
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  methods: {
    async fetchCart() {
      try {
        const response = await fetch("http://lifestealer86.ru/api-shop/cart");
        const data = await response.json();
        this.cartItems = data;
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    },
    async removeFromCart(itemId) {
      try {
        await fetch(`http://lifestealer86.ru/api-shop/cart/${itemId}`, { method: "DELETE" });
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      } catch (error) {
        console.error("Ошибка удаления:", error);
      }
    }
  },
  mounted() {
    this.fetchCart();
  }
};
</script>

<style scoped>
.cart {
  max-width: 1000px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

.cart-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.empty-cart {
  text-align: center;
  font-size: 1.5rem;
  color: #888;
}

.cart-item {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cart-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-item-name {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.cart-item-price,
.cart-item-quantity {
  font-size: 1.1rem;
  color: #555;
}

.remove-btn {
  background-color: #ff4f4f;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #ff1a1a;
}

.total-price {
  text-align: center;
  font-size: 2rem;
  margin-top: 30px;
  color: #333;
  font-weight: bold;
}
</style>
