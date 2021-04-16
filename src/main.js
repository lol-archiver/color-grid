import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

window.app = createApp(App);
app.mount('#app');

app.loadComp = async slot => {
	if(!app.component(slot)) {
		const comp = await import(`./comps/${slot.replace(/-/g, '/')}.vue`);

		app.component(slot, comp.default);
	}
};