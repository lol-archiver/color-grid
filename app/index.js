import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import B from './lib/Bus.js';

window.app = B.app = createApp(App);
B.app.mount('#app');

B.app.loadComp = async slot => {
	if(!B.app.component(slot)) {
		const comp = await import(`./comp/${slot.replace(/-/g, '/')}.vue`);

		B.app.component(slot, comp.default);
	}
};