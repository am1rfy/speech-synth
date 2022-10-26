import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: 'Speech To Text'
        },
        component: () => import('../views/stt-page.vue')
    },
    {
        path: '/speech-to-text',
        name: 'stt',
        meta: {
            title: 'Speech To Text'
        },
        component: () => import('../views/stt-page.vue')
    },
    {
        path: '/text-to-speech',
        name: 'tts',
        meta: {
            title: 'Text To Speech'
        },
        component: () => import('../views/tts-page.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        meta: {
            title: 'Not found'
        },
        component: () => import('../views/not-found-page.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router