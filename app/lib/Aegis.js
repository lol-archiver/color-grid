import Axios from 'axios';

const Aegis = {
	prefixDefault: '.',

	parseURLAction(action, prefix = Aegis.prefixDefault) {
		return `${prefix}${prefix.endsWith('/') ? '' : '/'}${action}`;
	},
	fetch(action, conf = {}) {
		const urlAction = Aegis.parseURLAction(action, conf.prefix);

		return Axios.get(urlAction, conf);
	}
};

export default Aegis;