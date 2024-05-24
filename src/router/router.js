import { createWebHistory, createRouter } from "vue-router";
import Login from "../view/Login.vue";
import Dashboard from "../view/Dashboard.vue";

const Overview = () => import("../dashboard/Overview.vue");
const Drugs = () => import("../dashboard/Drugs.vue");
const Vendors = () => import("../dashboard/Vendors.vue");
const SellingHistory = () => import("../dashboard/SellingHistory.vue");
const Settings = () => import("../dashboard/Settings.vue");
const Account = () => import("../dashboard/settings/Account.vue");
const Website = () => import("../dashboard/settings/Website.vue");
const Theme = () => import("../dashboard/settings/Theme.vue");

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    name: "Dashboard",
    redirect: "/dashboard/overview",
    children: [
      { path: "overview", component: Overview },
      { path: "drugs", component: Drugs },
      { path: "vendors", component: Vendors },
      { path: "selling-history", component: SellingHistory },
      {
        path: "settings",
        component: Settings,
        redirect: "/dashboard/settings/account",
        children: [
          { path: "account", component: Account },
          { path: "website", component: Website },
          { path: "theme", component: Theme },
        ],
      },
    ],
  },
  { path: "/", component: Login, name: "Login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
