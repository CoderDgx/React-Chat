export interface AppState {
  user: User;
  token: string;
  mobile: boolean;
  background: string;
}

export const appState: AppState = {
  user: {
    userId: "",
    username: "",
    password: "",
    avatar: "",
    createTime: 0,
  },
  token: "",
  mobile: false,
  background: "",
};
