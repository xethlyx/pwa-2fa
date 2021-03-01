<template>
	<sidebar />
	<div class="main-content">
		<router-view v-slot="{ Component }">
			<transition name="standard-fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
	<transition name="fade">
		<div class="context-menu" v-if="$store.state.contextMenu" :style="`left: ${$store.state.contextMenu.x + 10}px; top: ${$store.state.contextMenu.y + 10}px;`">
			<div class="context-menu-entry" @click="copyToClipboard($store.state.keys[$store.state.contextMenu.keyId].code)">Copy Code</div>
			<div class="context-menu-entry" @click="$store.commit('deleteKey', $store.state.contextMenu.keyId)">Delete</div>
			<div class="context-menu-entry" @click="copyToClipboard($store.state.keys[$store.state.contextMenu.keyId].secret)">Export Secret</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Sidebar from '@/components/Sidebar.vue';
import store from './store';

@Options({
	components: {
		Sidebar
	}
})
export default class App extends Vue {
	msg!: string;

	clickListener() {
		if (store.state.contextMenu) store.commit('updateContext', undefined);
	}

	mounted() {
		document.addEventListener('click', this.clickListener);
		document.addEventListener('contextmenu', this.clickListener);
	}

	unmounted() {
		document.removeEventListener('click', this.clickListener);
		document.removeEventListener('contextmenu', this.clickListener);
	}

	copyToClipboard(string: string) {
		const textarea = document.createElement('textarea');
		textarea.value = string;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);
	}
}
</script>

<style>
*:focus {
	outline: 0;
}

body, html {
	background-color: #121212;
	padding: 0;
	margin: 0;
	color: #DFDFDF;
}

#app {
	position: absolute;
	font-family: 'Montserrat', sans-serif;
	display: grid;
	grid-template-columns: 285px 1fr;
	grid-template-rows: 1fr;
	height: 100%;
	width: 100%;
}

.main-content {
	width: 100%;
	height: 100%;
	border-radius: 5px 0 0 5px;
	background-color: #191919;
	padding: 20px;
	box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s cubic-bezier(.12,.8,.4,.93);
}

.fade-enter-from {
	transform: translateY(-5px);
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.standard-fade-enter-active,
.standard-fade-leave-active {
	transition: all 0.1s ease-in-out;
}

.standard-fade-enter-from,
.standard-fade-leave-to {
	opacity: 0;
}

.context-menu {
	position: absolute;
	background-color: #121212;
	z-index: 10;
	padding: 8px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	font-size: 14px;
	cursor: default;
}

.context-menu-entry {
	padding: 10px 20px;
	transition: all 0.1s cubic-bezier(.12,.8,.4,.93);
	border-radius: 5px;
}

.context-menu-entry:hover {
	background-color: #ffffff04;
}

.context-menu-entry:active {
	background-color: #ffffff0c;
}
</style>
