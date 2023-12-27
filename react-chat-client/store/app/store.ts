import { create } from "zustand";
import cookie from "js-cookie";

import type { AppState } from "./state";
import { appState } from "./state";
import { processReturn } from "../../utils/common";
import fetch from "../../api/fetch";

interface AppAction {
  setUser: (payload: any) => void;
  clearUser: () => void;
  setToken: (payload: string) => void;
  setMobile: (payload: boolean) => void;
  setBackground: (payload: string) => void;
  register: (payload: any) => void;
  login: (payload: any) => void;
}

export type AppStore = AppState & AppAction;

export const useAppStore = create<AppStore>((set, get) => ({
  ...appState,
  setUser: (payload) => {
    set({ user: payload });
    cookie.set("user", payload, { expires: 3650 });
  },
  clearUser: () => {
    set({
      user: {
        userId: "",
        username: "",
        password: "",
        avatar: "",
        createTime: 0,
      },
    });
    cookie.set("user", "");
  },
  setToken: (payload) => {
    set({ token: payload });
    cookie.set("token", payload, { expires: 3 });
  },
  setMobile: (payload) => set({ mobile: payload }),
  setBackground: (payload) => {
    set({ background: payload });
    localStorage.setItem("background", payload);
  },
  register: async (payload) => {
    let res = await fetch.post("/auth/register", {
      ...payload,
    });
    let data = processReturn(res);
    if (data) {
      set({ user: data.user });
      set({ token: data.token });
      return data;
    }
  },
  login: async (payload) => {
    let res = await fetch.post("/auth/login", {
      ...payload,
    });
    let data = processReturn(res);
    if (data) {
      set({ user: data.user });
      set({ token: data.token });
      return data;
    }
  },
}));
