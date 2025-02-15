<template>
  <div class="auth-container">
    <h2 class="auth-title">Вход</h2>
    <form @submit.prevent="handleLogin" class="auth-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" placeholder="Введите email" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input v-model="password" type="password" id="password" placeholder="Введите пароль" required />
      </div>
      <button type="submit" class="auth-button">Войти</button>
      <p class="auth-footer">Нет аккаунта? <router-link to="/register" class="auth-link">Зарегистрироваться</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('https://your-api-url/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });
        const data = await response.json();
        if (data.success) {
          this.$router.push('/catalog');
        } else {
          alert('Неверный логин или пароль');
        }
      } catch (error) {
        console.error('Ошибка при входе:', error);
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.auth-title {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}

.form-group input {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border 0.3s ease;
}

.form-group input:focus {
  border-color: #007bff;
}

.auth-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.auth-button:hover {
  background-color: #0056b3;
}

.auth-footer {
  text-align: center;
  font-size: 1rem;
  color: #777;
}

.auth-link {
  color: #007bff;
  text-decoration: none;
}

.auth-link:hover {
  text-decoration: underline;
}
</style>
