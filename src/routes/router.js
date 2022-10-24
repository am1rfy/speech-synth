import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: 'Home'
        },
        component: () => import('../views/home-page.vue')
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