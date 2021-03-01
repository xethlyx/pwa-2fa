import KeyContainer from '@/components/KeyContainer.vue';
import { shallowMount } from '@vue/test-utils';

describe('KeyContainer works', () => {
	it('KeyContainer works', () => {
		const wrapper = shallowMount(KeyContainer, {
			props: {
				label: 'Testing',
				code: '123456',
				secret: 'secret'
			}
		});
		expect(wrapper.text()).toContain('Testing');
		expect(wrapper.text()).toContain('123');
		expect(wrapper.text()).toContain('456');
		expect(wrapper.text()).not.toContain('secret');
	});
});
