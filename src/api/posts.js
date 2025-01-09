// current directory index.js import
import { useAxios } from '@vueuse/integrations/useAxios';
import { useAuthStore } from '@/stores/auth'

export async function apiRequest(endpoint, config = {}) {
  const authStore = useAuthStore()
  try {
    if (!authStore.accessToken) {
      throw new Error('No access token available');
    }
    const { data, isFinished, isLoading, error } = useAxios(endpoint, config)
    console.log(data)

    return {
      data,
      isFinished,
      isLoading,
      error
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === 'token expired') {
        console.warn('Access token expired, refreshing...');
        try {
          await authStore.refreshTokens();
          const { data, isFinished, isLoading, error } = useAxios(endpoint, config)

          return {
            data,
            isFinished,
            isLoading,
            error
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          this.logout();
          throw refreshError;
        }
      } else {
        console.error('Unauthorized error:', error);
        this.logout();
        throw error;
      }
    } else {
      throw error;
    }
  }
}
