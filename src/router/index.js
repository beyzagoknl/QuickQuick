import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import RegisterView from "../views/RegisterView.vue"
import LoginView from "../views/LoginView.vue"
import GameView from "../views/GameView.vue"
import ProfileSection from '../views/ProfileView.vue'
import { useUserStore } from "@/store/user-storage";

const routes=[
{
    path: '/',
    name:'home',
    component:HomeView
},
{
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/game',
    name: 'game',
    meta: { requiresAuth: true },
    component: GameView
  },
  {
    path: '/profile',
    name: 'ProfileSection',
    meta: { requiresAuth: true },
    component: ProfileSection
  }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  

  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const isAuthenticated = !!userStore.token
  
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      next({ name: 'login' }); 
    } else {
      next(); 
    }
  });
  
  export default router;