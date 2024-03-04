<script setup lang="ts">
import { ILoginInput } from "@/api/types";
import router from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useStore();

const { showPassword, rules } = storeToRefs(store);

const email = ref<string>();
const password = ref<string>();

function onSubmit() {
  const userData: ILoginInput = {
    email: email.value!,
    password: password.value!,
  };


  store
    .loginUser(userData)
    .then(() => {
      router.push("/feeds");
      const token = localStorage.getItem("access_token");
      console.log(token)
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        alert(error.response.data.message);
        return;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of

        console.log("error without response");
        return;
      } else {
        // Something happened in setting up the request that triggered an Error
        alert(`Error:  ${error.message}`);
        return;
      }
      // console.log(error.config);
    });
}
</script>

<template>
  <v-container>
    <v-card width="500" class="mx-auto mt-5">
      <v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              color="info"
              label="Email"
              v-model="email"
              placeholder="name@example.com"
              :rules="[rules.required]"
              clearable
              prepend-icon="mdi-account-circle"
            />
            <v-text-field
              color="info"
              :type="showPassword ? 'text' : 'Password'"
              label="Password"
              v-model="password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
            <v-divider> </v-divider>
            <v-card-actions>
              <v-btn color="info" @click="onSubmit()">Login</v-btn>

              <v-spacer></v-spacer>
              <div>Need an account? Register now!</div>
              <v-btn
                class="text-decoration-underline"
                to="register"
                color="success"
                >Register</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card-title>
    </v-card>
  </v-container>
</template>
