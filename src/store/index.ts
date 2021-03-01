import { totp } from 'otplib';
import { createStore } from 'vuex';

function generateId(length: number) {
	const result = [];
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
	return result.join('');
}

const store = createStore({
	state: {
		keys: {} as Record<string, { name: string; secret: string; code: string }>,
		expiry: 0,
		contextMenu: undefined as undefined | { x: number; y: number; keyId: string; debounce?: true }
	},
	mutations: {
		importKeys(state, keys) {
			state.keys = keys;
		},
		addKey(state, [name, secret]: [string, string]) {
			state.keys[generateId(5)] = {
				name,
				secret,
				code: totp.generate(secret)
			};

			localStorage.setItem('keys', JSON.stringify(state.keys));
		},
		deleteKey(state, keyId: string) {
			// eslint-disable-next-line no-alert
			const confirm = window.confirm(`Are you sure you want to delete ${state.keys[keyId].name}?`);
			if (!confirm) return;

			delete state.keys[keyId];
		},
		updateKeys(state) {
			const newKeys = { ...state.keys };

			Object.entries(newKeys).forEach(([index, key]) => {
				newKeys[index].code = totp.generate(key.secret);
			});
		},
		updateContext(state, newContext?: { x: number; y: number; keyId: string }) {
			if (state.contextMenu?.debounce && !newContext) {
				delete state.contextMenu.debounce;
				return;
			}

			state.contextMenu = newContext ? { ...newContext, debounce: true } : undefined;
		},
		updateExpiry(state) {
			state.expiry = Date.now() + totp.timeRemaining() * 1000;
		}
	},
	actions: {
	},
	modules: {
	}
});

export default store;

if (localStorage.getItem('keys')) {
	store.commit('importKeys', JSON.parse(localStorage.getItem('keys')!));
}

function updateCode() {
	console.log('update', totp.timeRemaining() * 1000);
	store.commit('updateKeys');
	store.commit('updateExpiry');
	setTimeout(updateCode, totp.timeRemaining() * 1000);
}
setTimeout(updateCode, 0);
