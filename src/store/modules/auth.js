import authApi from '@/api/auth'
import {
    setItem
} from '@/helpers/persistanceStorage'

const state = {
    isSubmitting: false,
    isLoggedIn: null,
    isLoading: false,
    currentUser: null,
    validationErrors: null
}

export const mutationTypes = {
    registerStart: '[auth] Register start',
    registerSuccess: '[auth] Register success',
    registerFailure: '[auth] Register failure',

    loginStart: '[auth] Login start',
    loginSuccess: '[auth] Login success',
    loginFailure: '[auth] Login failure',

    getCurrentUserStart: '[auth] Get current user start',
    getCurrentUserSuccess: '[auth] Get current user success',
    getCurrentUserFailure: '[auth] Get current user failure',

    updateCurrentUserStart: '[auth] Update current user start',
    updateCurrentUserSuccess: '[auth] Update current user success',
    updateCurrentUserFailure: '[auth] Update current user failure',

    logOut : '[auth] logout',
}

export const actionTypes = {
    register: '[auth] Register',
    login: '[auth] Login',
    getCurrentUser: '[auth] Get current user',
    updateCurrentUser: '[auth] Update current user',
    logOut: '[auth] logout',

}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}

const getters = {
    [getterTypes.currentUser]: state => {
        return state.currentUser
    },
    [getterTypes.isLoggedIn]: state => {
        return Boolean(state.isLoggedIn)
    },
    [getterTypes.isAnonymous]: state => {
        return state.isLoggedIn === false
    }
}

const mutations = {
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.registerSuccess](state, payload) {
        state.isSubmitting = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    [mutationTypes.registerFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationTypes.loginStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.loginSuccess](state, payload) {
        state.isSubmitting = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    [mutationTypes.loginFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationTypes.getCurrentUserStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getCurrentUserSuccess](state, payload) {
        state.isLoading = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    [mutationTypes.getCurrentUserFailure](state) {
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
    },
    [mutationTypes.updateCurrentUserStart]() {},
    [mutationTypes.updateCurrentUserSuccess](state, payload) {
        state.currentUser = payload
    },
    [mutationTypes.updateCurrentUserFailure]() {},
    [mutationTypes.logOut]() {
        state.currentUser = null
        state.isLoggedIn = false
    },
}

const actions = {
    [actionTypes.register](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart)
            authApi
                .register(credentials)
                .then(response => {
                    context.commit(mutationTypes.registerSuccess, response.data.user)
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(
                        mutationTypes.registerFailure,
                        result.response.data.errors
                    )
                })
        })
    },
    [actionTypes.login](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.loginStart)
            authApi
                .login(credentials)
                .then(response => {
                    context.commit(mutationTypes.loginSuccess, response.data.user)
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(
                        mutationTypes.loginFailure,
                        result.response.data.errors
                    )
                })
        })
    },
    [actionTypes.getCurrentUser](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getCurrentUserStart)
            authApi
                .getCurrentUser()
                .then(response => {
                    context.commit(
                        mutationTypes.getCurrentUserSuccess,
                        response.data.user
                    )
                    resolve(response.data.user)
                })
                .catch(() => {
                    context.commit(mutationTypes.getCurrentUserFailure)
                })
        })
    },
    [actionTypes.updateCurrentUser](context, {
        currentUserInput
    }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.updateCurrentUserStart)
            authApi
                .updateCurrentUser(currentUserInput)
                    .then(user => {
                        context.commit(
                            mutationTypes.updateCurrentUserSuccess,
                            user
                        )
                        resolve(user)
                    })
                    .catch((result) => {
                        context.commit(mutationTypes.updateCurrentUserFailure, result.response.data.errors)
                    })
                
        })
    },
    [actionTypes.logOut](context){  
        return new Promise(resolve => {
            setItem('accessToken', '')
            context.commit(mutationTypes.logOut)
            resolve()

        })
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}