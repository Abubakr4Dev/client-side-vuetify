// Utilities
import { createPinia } from "pinia";
import { IRegisterInput, ILoginInput } from "@/api/types";
export default createPinia();

import { defineStore } from "pinia";
import { loginUserFn, registerUserFn } from "@/api/axios-api";

export const useStore = defineStore("mainStore", {
  state: () => ({
    token: localStorage.getItem("auth-token"),
    showPassword: false,
    rules: {
      required: (value: string) => !!value || "Field is required",
    },

    links: [
      // { label: "Home", url: "/" },
      { label: "Login", url: "/Login" },
      // { label: 'About Us', url: '' },
      // { label: 'Services', url: '' },
      { label: "Register", url: "/register" },
    ],
  }),
  actions: {
    setToken(value: string) {
      this.token = value;
      localStorage.setItem("auth-token", value);
    },
    // setToken(state): (value: string) => null {
    //   return (value: string): any => {
    //     state.token = value;
    //     localStorage.setItem("auth-token", value);
    //   };
    // },
    registerUser(userData: IRegisterInput) {
      return registerUserFn(userData).then((res) =>
        this.setToken(res.access_token)
      );
    },
    loginUser(userData: ILoginInput) {
      return loginUserFn(userData).then((res) =>
        this.setToken(res.access_token)
      );
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
});
