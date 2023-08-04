import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import UpdateToDoItem from '../views/UpdateToDoItem.vue'
import NotFound from '../views/NotFound.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: "/item/:todo_id",
    name: "UpdateToDoItem",
    component: UpdateToDoItem
  },
  // redirect
  {
    path: "/todolist",
    redirect: "/"
  },
  // catchall 404
  {
    path: "/:catchAll(.*)", //catches any route not catched by the other route objects
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
