import { createRouter, createWebHistory } from "vue-router";
import NotFoundView from "@/views/NotFoundView.vue";
import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";
import LoginView from "@/views/LoginView.vue";

import PostListView from "@/views/posts/PostListView.vue";
import PostCreateView from "@/views/posts/PostCreateView.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import PostEditView from "@/views/posts/PostEditView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/posts',
    name: 'List',
    component: PostListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/posts/create',
    name: 'Create',
    component: PostCreateView,
    meta: { requiresAuth: true }
  },
  {
    path: '/posts/:id',
    name: 'Detail',
    component: PostDetailView,
    props: true
  },
  {
    path: '/posts/:id/edit',
    name: 'Edit',
    component: PostEditView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.accessToken) {
    next({ name: 'Login' })
  } else {
    next();
  }
})

export default router;
