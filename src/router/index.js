import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
        path: "/",
        name: "index",
        component: () => import("../views/index.vue")
    },
    {
        path: "/public",
        name: "public",
        component: () => import("../views/public.vue")
    },
    {
        path: "/photo",
        name: "photo",
        component: () => import("../views/photo.vue")
    },
    {
        path: "/qr",
        name: "qr",
        component: () => import("../views/qr.vue")
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('../views/demo.vue')
    },
    {
        path: '/image',
        name: 'image',
        component: () => import('../views/image.vue')
    }
];

const router = new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    routes
});

// router.beforeEach((to,from,next)=>{
//     if (to.matched.length === 0) { //匹配前往的路由不存在
//         from.name ? next({
//             name: from.name
//         }) : next({path:'/'}); //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
//     } else {
//         if(to.path === '/' || to.path === '/logout' || to.path === '/registered' || localStorage.getItem('token')){
//             next();
//         }else{
//             localStorage.clear();
//             next({
//                 path:'/'
//             });
//         }
//     }
// })

// router.beforeEach((to, from, next) => {
//     if (from.path === '/vip') {
//         if (!confirm('确定要跳转吗？')) {
//             next(false)
//             return
//         }
//     }
//     next(true)
// })

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});

export default router
