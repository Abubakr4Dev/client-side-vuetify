<script setup lang="ts">
import { IRegisterInput } from "@/api/types";
import router from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const email = ref<string>();
const password = ref<string>();

function onSubmit() {
  const userData: IRegisterInput = {
    email: email.value!,
    password: password.value!,
  };
  store
    .registerUser(userData)
    .then(() => {
      router.push("/feeds");
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

const store = useStore();

const { showPassword, rules } = storeToRefs(store);
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
              :rules="[rules.required]"
              placeholder="name@example.com"
              prepend-icon="mdi-account-circle"
            />
            <v-text-field
              color="info"
              :type="showPassword ? 'text' : 'Password'"
              label="Password"
              v-model="password"
              :rules="[rules.required]"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
            <v-divider> </v-divider>
            <v-card-actions>
              <v-btn color="success" @click="onSubmit()">Register</v-btn>
              <v-spacer></v-spacer>
              <div>Have an account? Login now!</div>
              <v-btn class="text-decoration-underline" to="login" color="info"
                >Login</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card-title>
    </v-card>
  </v-container>
</template>
