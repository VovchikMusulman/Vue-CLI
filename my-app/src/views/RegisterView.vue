<template>
  <div class="auth-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister" class="auth-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" placeholder="Введите email" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input v-model="password" type="password" id="password" placeholder="Введите пароль" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Повторите пароль</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" placeholder="Повторите пароль" required />
      </div>
      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? "Регистрация..." : "Зарегистрироваться" }}
      </button>
      <p class="redirect-text">Уже есть аккаунт? <router-link to="/login" class="link">Войти</router-link></p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
      errorMessage: ''
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Пароли не совпадают";
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      try {
        const response = await fetch("http://lifestealer86.ru/api-shop/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          this.$router.push("/login");
        } else {
          this.errorMessage = data.error || "Ошибка регистрации";
        }
      } catch (error) {
        this.errorMessage = "Ошибка соединения с сервером";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 2rem;
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

label {
  font-size: 1rem;
  margin-bottom: 8px;
  color: #555;
}

input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
}

button {
  padding: 12px;
  font-size: 1.1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #0056b3;
}

.redirect-text {
  text-align: center;
  font-size: 1rem;
}

.link {
  color: #007bff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.error {
  color: red;
  text-align: center;
  font-size: 0.9rem;
}
</style>
