import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import GlobalFeed from '../views/GlobalFeed.vue'
import YourFeed from '../views/YourFeed.vue'
import TagFeed from '../views/TagFeed.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ArticlePage from '../views/ArticlePage.vue'
import CreateArticle from '../views/CreateArticle.vue'
import EditArticle from '../views/EditArticle.vue'
import SettingsPage from '../views/SettingsPage.vue'
import UserProfile from '../views/UserProfile.vue'


const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  }, 
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }, 
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: CreateArticle
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: ArticlePage
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: EditArticle
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage
  },
  {
    path: '/profile/:slug',
    name: 'userProfile',
    component: UserProfile
  },
  {
    path: '/profile/:slug/favorite',
    name: 'userProfileFavorites',
    component: UserProfile
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router