import { axiosInstance, setAuthorizationHeader } from "@/api";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userInfo: { id: null, name: null, email: null },
    accessToken: null,
    refreshToken: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axiosInstance.post('/api/token/v1/issue', credentials);
        const { user, access_token, refresh_token } = response.data.body;
        this.accessToken = access_token;
        this.refreshToken = refresh_token;
        this.userInfo = user
        console.log(user, this.userInfo)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
        setAuthorizationHeader(`Bearer ${this.accessToken}`)
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async refresh() {
      try {
        const response = await axiosInstance.post('/api/token/v1/refresh', { user_id: this.userInfo.id, refresh: this.refreshToken });
        const { user, access_token, refresh_token } = response.data.body;
        this.accessToken = access_token;
        this.refreshToken = refresh_token;
        this.userInfo = user
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
        setAuthorizationHeader(`Bearer ${this.accessToken}`)
      } catch (error) {
        console.error('Token refresh failed:', error);
        this.logout();
      }
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }
})
