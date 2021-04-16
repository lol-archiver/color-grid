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

// export default function() {
// 	window.A = {
// 		// async conn(action, params, conf = {}) {
// 		// 	const actUrl = A.r(action);

// 		// 	if(params) {
// 		// 		conf.params = params;
// 		// 	}

// 		// 	const result = (await Axios.get(prefix + actUrl, conf)).data;

// 		// 	if(result.success) {
// 		// 		if(result.data && result.data.alert) {
// 		// 			await X.alert(result.data.alert);
// 		// 		}

// 		// 		return result.data;
// 		// 	}
// 		// 	else {
// 		// 		throw result.text || '请求不成功';
// 		// 	}
// 		// },
// 		// async connRaw(action, params, conf = {}) {
// 		// 	let actUrl = A.r(action);

// 		// 	if(params) {
// 		// 		conf.params = params;
// 		// 	}

// 		// 	return (await Axios.get(prefix + actUrl, conf)).data;
// 		// },

// 		// async post(action, params, conf = {}) {
// 		// 	let actUrl = A.r(action);

// 		// 	if(typeof params == 'object' && params instanceof FormData) {
// 		// 		if(typeof conf.headers == 'object' && conf.headers) {
// 		// 			conf.headers['Content-Type'] = 'multipart/form-data';
// 		// 		}
// 		// 		else {
// 		// 			conf.headers = { 'Content-Type': 'multipart/form-data' };
// 		// 		}
// 		// 	}

// 		// 	let result = (await Axios.post(prefix + actUrl, params, conf)).data;

// 		// 	if(result.success) {
// 		// 		if(result.data && result.data.alert) {
// 		// 			await X.alert(result.data.alert);
// 		// 		}

// 		// 		return result.data;
// 		// 	}
// 		// 	else {
// 		// 		throw result.text;
// 		// 	}
// 		// },
// 		// async postRaw(action, params, conf = {}) {
// 		// 	let actUrl = A.r(action);

// 		// 	return (await Axios.post(prefix + actUrl, params, conf)).data;
// 		// },

// 		// jump(action, params) {
// 		// 	let actUrl = A.r(action);
// 		// 	let query = '';

// 		// 	for(let key in params) {
// 		// 		if(params[key]) {
// 		// 			if(typeof params[key] == 'object') {
// 		// 				query += `&${key}=${JSON.stringify(params[key])}`;
// 		// 			}
// 		// 			else {
// 		// 				query += `&${key}=${params[key]}`;
// 		// 			}
// 		// 		}
// 		// 	}

// 		// 	query = query.replace(/^&/, '');

// 		// 	window.location.href = `${prefix}${actUrl}?${query}`;
// 		// },

// 		// reg(action, path, force) {
// 		// 	if(force || !actionList[action]) {
// 		// 		actionList[action] = path;
// 		// 	}
// 		// },

// 		// r(action, prefix = 'uapi', forceReg = false) {
// 		// 	if(forceReg || !actionList[action]) {
// 		// 		return actionList[action] = prefixDict[prefix] + action;
// 		// 	}
// 		// 	else {
// 		// 		return actionList[action];
// 		// 	}
// 		// },

// 		async static(action, conf = {}) {
// 			let result = await Axios.get(action, conf);
// 			return result;
// 		}
// 	};
// }