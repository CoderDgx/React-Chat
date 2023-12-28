import type { AppStore } from "./store";
import cookie from "js-cookie";

export const userSelector = (state: AppStore) => {
  let user = state.user || cookie.get("user");
  return user || {};
};

export const mobileSelector = (state: AppStore) => state.mobile;

export const backgroundSelector = (state: AppStore) => {
  // return state.background || localStorage.getItem("background");
  return state.background;
};
