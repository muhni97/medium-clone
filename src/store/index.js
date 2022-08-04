import {
  createStore
} from 'vuex'
import auth from './modules/auth'
import feed from './modules/feed'
import popularTags from './modules/popularTags'
import article from './modules/article'
import createArticle from './modules/createArticle'
import editArticle from './modules/editArticle'
import settings from './modules/settings'
import addFavorites from './modules/addToFavorites'
import userProfile from './modules/userProfile'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
    editArticle,
    settings,
    addFavorites,
    userProfile,
  }
})