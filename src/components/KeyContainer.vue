<template>
	<div class="key-container" @contextmenu.prevent="$store.commit('updateContext', {x: $event.pageX, y: $event.pageY, keyId: id})">
		<span class="label-container">
			<span class="label">{{ label }}</span>
		</span>
		<button class="more" @click="$store.commit('updateContext', {x: $event.pageX, y: $event.pageY, keyId: id})"><img src="@/assets/more.svg" alt="more" draggable="false"></button>
		<span class="code">
			<span class="first">{{ code.substring(0, 3) }}</span>
			<span>{{ code.substring(3, 6) }}</span>
		</span>
		<div class="progress">
			<object data="./spinner.svg" class="behind" type="image/svg+xml" />
			<object data="./spinner.svg" class="above" type="image/svg+xml" />
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	props: {
		label: String,
		code: String,
		id: String
	}
})
export default class KeyContainer extends Vue {
	label!: string;
	code!: string;
	id!: string;
}
</script>

<style scoped>
.key-container {
	display: grid;
	grid-template-rows: 20px 1fr;
	grid-template-columns: 1fr 30px;
	gap: 10px;
	background-color: #202020;
	border-radius: 8px;
	padding: 15px;
}

.label {
	font-size: 14px;
}

.code {
	color: #659EFF;
	text-shadow: 0 3px 6px #659dff52;
	font-size: 30px;
}

.first {
	display: inline-block;
	margin-right: 6px;
}

.label-container, .more {
	display: flex;
	align-items: center;
}

.more {
	background: transparent;
	border-width: 0;
	transition: all 0.1s cubic-bezier(.12,.8,.4,.93);
}

.more:hover {
	opacity: 0.7;
}

.progress {
	position: relative;
}

.progress * {
	position: absolute;
	left: 0;
	top: 0;
}

.progress .behind {
	filter: invert(13%) sepia(0%) saturate(0%) hue-rotate(151deg) brightness(93%) contrast(82%);
	z-index: 5;
}

.progress .above {
	filter: invert(60%) sepia(10%) saturate(5930%) hue-rotate(194deg) brightness(100%) contrast(103%);
	z-index: 10;
}
</style>
