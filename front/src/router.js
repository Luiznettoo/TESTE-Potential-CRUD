import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/developers",
      name: "developers",
      component: () => import("./components/DevelopersList")
    },
  ]
});