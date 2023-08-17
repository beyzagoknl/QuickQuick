import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import RegisterView from "../views/RegisterView.vue"
import LoginView from "../views/LoginView.vue"
import GameView from "../views/GameView.vue"
import ProfileSection from '../views/account/ProfileSection.vue'
import EditProfile from '../views/account/EditProfile.vue'


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
    component: GameView
  },
  {
    path: '/account',
    name: 'AccountView',
    children:[
      {
        path: 'profile',
        name: 'ProfileSection',
        component: ProfileSection
      },
      {
        path: 'edit-profile',
        name: 'EditProfile',
        component: EditProfile
    }
 
    ]
  },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  