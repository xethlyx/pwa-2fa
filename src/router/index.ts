import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			sidebar: 'codes'
		}
	},
	{
		path: '/settings',
		name: 'Settings',
		component: Settings,
		meta: {
			sidebar: 'settings'
		}
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
