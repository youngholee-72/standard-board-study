<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">

              <div class="mb-md-5 mt-md-4 pb-5">

                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Please enter your login</p>

                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input type="text" v-model="user_id" id="user_id" class="form-control form-control-lg" />
                  <label class="form-label" for="typeEmailX">UserID</label>
                </div>

                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input type="password" id="typePasswordX" class="form-control form-control-lg" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>

                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5"
                  @click="handleLogin">Login</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const user_id = ref(null)

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  const credentials = { user_id: user_id.value };
  await authStore.login(credentials);
  router.push('/');
};
</script>

<style scoped></style>
