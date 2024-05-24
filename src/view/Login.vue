<script>
import axios from "axios";
import TheButton from "../components/TheButton.vue";
import { showErrorMessage, showSuccessMessage } from "../utils/mesage.js";
import { setPrivateHeaders } from "../service/axiosIntance.js";
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../store/AuthStore.js";

export default {
  components: { TheButton },
  data() {
    return { formData: { username: "", password: "" }, loggingIn: false };
  },
  computed: {
    ...mapState(useAuthStore, {
      username: "username",
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      isLoggedIn: "isLoggedIn",
    }),
  },
  methods: {
    ...mapActions(useAuthStore, {
      login: "login",
    }),

    handleLoginSubmit() {
      if (!this.formData.username) {
        showErrorMessage("Username is required");
        return;
      }
      if (this.formData.password.length < 6) {
        //event emit create

        showErrorMessage("Please Enter at least 6 characters");
        this.$refs.password.focus();
      }
      this.loggingIn = true;
      axios
        .post(
          "https://api.rimoned.com/api/pharmacy-management/v1/login",
          this.formData,
        )
        .then((response) => {
          showSuccessMessage(response);
          this.login(response.data);
          localStorage.setItem("accessToken", response.data.accessToken);
          setPrivateHeaders();
          this.$router.push("/dashboard");
          console.log(response.data);
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.loggingIn = false;
        });
    },
  },
};
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="text-center">
        <img alt="lock" class="login-card__icon" src="../assets/img/lock.png" />
        <h2>User Login</h2>
      </div>
      <form action="" @submit.prevent="handleLoginSubmit">
        <input
          id="username"
          v-model="formData.username"
          class="mt-2"
          name="username"
          placeholder="Enter Username"
          required
          type="text"
        />
        <input
          id="password"
          ref="password"
          v-model="formData.password"
          class="mt-2"
          name="username"
          placeholder="Enter Password"
          required
          type="password"
        />

        <TheButton :block="true" :loading="loggingIn" class="mt-3">
          Login
        </TheButton>
        <div class="d-flex jc-between mt-3">
          <div>
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
          </div>
          <div>
            <a href="#">Forgot Password?</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.login-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(235, 235, 235);
}

.login-card {
  width: 400px;
  /* border: 1px solid gray; */
  min-height: 193px;
  box-shadow: 0 2px 9px 4px #dfdfdf;
  background-color: #fff;
  border-radius: 5px;
  padding: 44px 33px;
}

.login-card input[type="text"],
.login-card input[type="password"] {
  width: 100%;
}

.login-card__icon {
  max-width: 77px;
}
</style>
