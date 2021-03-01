<template>
	<div class="sidebar">
		<div class="logo">
			<img src="@/assets/logo.svg" alt="">
			<span>PWA-2FA</span>
		</div>
		<button class="new-code" @click="toggleDropdown">
			Add New Code
		</button>
		<transition name="fade">
			<div class="dropdown" v-if="dropdownShown">
				<div class="dropdown-node" @click="notImplemented">Scan QR Code</div>
				<div class="dropdown-node" @click="getCode">Enter Code</div>
			</div>
		</transition>
		<div class="navigation">
			<router-link :class="{'navigation-node': true, 'active': $route.meta.sidebar === 'codes'}" to="/">My Codes</router-link>
			<router-link :class="{'navigation-node': true, 'active': $route.meta.sidebar === 'settings'}" to="/settings">Settings</router-link>
			<a href="https://github.com/xethlyx/pwa-2fa" class="navigation-node" target="_blank" rel="norefferer noopener">Source Code</a>
		</div>
	</div>
</template>

<script lang="ts">
import store from '@/store';
import { Vue } from 'vue-class-component';

export default class Sidebar extends Vue {
	dropdownShown = false;
	debounce = false;

	toggleDropdown() {
		if (!this.dropdownShown) this.debounce = true;
		this.dropdownShown = !this.dropdownShown;
	}

	notImplemented() {
		// eslint-disable-next-line no-alert
		alert('Not implemented!');
	}

	getCode() {
		// eslint-disable-next-line no-alert
		const label = window.prompt('What do you want to call this key?');
		if (!label) return;
		// eslint-disable-next-line no-alert
		const key = window.prompt('What is the secret?');
		if (!key) return;

		store.commit('addKey', [label, key]);
	}

	private hideDropdown() {
		if (this.debounce) {
			this.debounce = false;
			return;
		}

		this.dropdownShown = false;
	}

	mounted() {
		document.addEventListener('click', this.hideDropdown);
		document.addEventListener('contextmenu', this.hideDropdown);
	}

	unmounted() {
		document.removeEventListener('click', this.hideDropdown);
		document.removeEventListener('contextmenu', this.hideDropdown);
	}
}
</script>

<style scoped>
.sidebar {
	display: flex;
	flex-direction: column;
	width: 100%;
	user-select: none;
}

.sidebar a {
	text-decoration: none;
}

.logo {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin: 30px 0;
}

.logo img {
	width: 45px;
}

.logo span {
	font-size: 20px;
	font-weight: 500;
}

.sidebar button {
	position: relative;
	background: linear-gradient(75deg, #6F65FF, #4093FF);
	font-family: 'Montserrat', sans-serif;
	font-weight: 500;
	color: #DFDFDF;
	font-size: 14px;
	padding: 10px;
	border-radius: 5px;
	margin: 0 20px;
	border-width: 0;
	box-shadow: 0 3px 25px #659dff79;
	transition: all 0.1s cubic-bezier(.12,.8,.4,.93);
}

.sidebar button:hover {
	transform: translateY(-3px);
	box-shadow: 0 3px 35px #659dff62;
}

.sidebar button:active {
	transform: translateY(1px);
	opacity: 0.9;
	box-shadow: 0 3px 25px rgba(101, 157, 255, 0.527);
}

.navigation {
	margin: 30px 20px;
	display: flex;
	flex-direction: column;
	gap: 5px;
}

.navigation-node {
	color: #A1A1A1;
	padding: 10px 20px;
	cursor: default;
	transition: all 0.1s cubic-bezier(.12,.8,.4,.93);
	font-weight: 500;
	font-size: 14px;
	border-radius: 5px;
}

.navigation-node:hover {
	background-color: #161616;
	color: #DFDFDF;
}

.navigation-node.active, .navigation-node:active {
	background-color: #191919;
	color: #DFDFDF;
}

.dropdown {
	position: absolute;
	width: 245px;
	top: 155px;
	left: 20px;
	background-color: #202020;
	padding: 8px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 10px;
	border-radius: 5px;
	font-size: 14px;
	cursor: default;
}

.dropdown-node {
	padding: 10px 20px;
	transition: all 0.1s cubic-bezier(.12,.8,.4,.93);
	border-radius: 5px;
}

.dropdown-node:hover {
	background-color: #ffffff04;
}

.dropdown-node:active {
	background-color: #ffffff0c;
}
</style>
