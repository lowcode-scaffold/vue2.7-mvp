import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/vue"
  },
  // 依赖 vue-demi，进而依赖 @vue/composition-api
  //   {
  //     path: "/formily",
  //     name: "formily",
  //     component: () =>
  //       import(
  //         /* webpackChunkName: "formily" */ "../views/formily-reactive/userManage/List"
  //       )
  //   },
  {
    path: "/mobx",
    name: "mobx",
    component: () =>
      import(/* webpackChunkName: "mobx" */ "../views/mobx/userManage/List")
  },
  {
    path: "/vue",
    name: "vue",
    component: () =>
      import(/* webpackChunkName: "vue" */ "../views/vue/userManage/List")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
