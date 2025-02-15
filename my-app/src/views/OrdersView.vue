<template>
  <div class="orders">
    <h1 class="orders-title">Мои заказы</h1>
    <div v-if="orders.length === 0" class="no-orders">У вас пока нет заказов</div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order">
        <h2 class="order-id">Заказ №{{ order.id }}</h2>
        <p class="order-date">Дата: {{ formatDate(order.date) }}</p>
        <p class="order-status">
          Статус: <span :class="getStatusClass(order.status)">{{ order.status }}</span>
        </p>
        <h3 class="order-items-title">Товары:</h3>
        <ul class="order-items">
          <li v-for="item in order.items" :key="item.id" class="order-item">
            {{ item.name }} - {{ item.quantity }} шт. ({{ item.price }} ₽)
          </li>
        </ul>
        <p class="total">Итого: {{ order.total }} ₽</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: []
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await fetch("http://lifestealer86.ru/api-shop/order");
        const data = await response.json();
        this.orders = data;
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    getStatusClass(status) {
      switch (status) {
        case "В обработке":
          return "pending";
        case "Отправлен":
          return "shipped";
        case "Доставлен":
          return "delivered";
        default:
          return "";
      }
    }
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>

<style scoped>
.orders {
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.orders-title {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
}

.no-orders {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
}

.order {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.order:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.order-id {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

.order-date,
.order-status,
.order-items-title {
  font-size: 1.1rem;
  color: #555;
}

.order-items {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
}

.order-item {
  font-size: 1rem;
  color: #555;
}

.total {
  font-weight: bold;
  font-size: 1.3rem;
  color: #333;
  margin-top: 10px;
}

.pending {
  color: orange;
}

.shipped {
  color: blue;
}

.delivered {
  color: green;
}
</style>
