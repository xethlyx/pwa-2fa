<template>
	<div class="home">
		<key-container v-for="(key, id) in $store.state.keys" :key="id" :label="key.name" :code="key.code" :id="id" />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import KeyContainer from '@/components/KeyContainer.vue';
import store from '@/store';

@Options({
	components: {
		KeyContainer
	}
})
export default class Home extends Vue {
	isMounted = true;

	animate() {
		const timeRemaining = (store.state.expiry - Date.now()) / 30000;

		const searchingIndicators = document.getElementsByClassName('above');
		for (const indicator of searchingIndicators) {
			if (!(indicator instanceof HTMLObjectElement)) continue;

			// csstricks radical method

			const { contentDocument } = indicator;
			if (!contentDocument) continue;

			const circle = contentDocument.querySelector('circle');
			if (!circle) continue;

			const radius = circle.r.baseVal.value;
			const circumference = radius * 2 * Math.PI;

			circle.style.strokeDasharray = `${circumference} ${circumference}`;
			circle.style.strokeDashoffset = `${circumference}`;

			const offset = circumference - timeRemaining * circumference;
			circle.style.strokeDashoffset = `${offset}px`;
		}

		if (!this.isMounted) return;
		setTimeout(this.animate, 1000);
	}

	mounted() {
		this.animate();
	}

	unmounted() {
		this.isMounted = false;
	}
}
</script>

<style scoped>
.home {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 400px));
}
</style>
