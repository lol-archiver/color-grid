<template>
	<div class="mb-1">
		<div class="TabButton inline-block box-border h-8 w-32 mx-4 text-center leading-8 cursor-pointer" :class="{ _now: compNow == 'PatchTable' }" @click="compNowPrepare = 'PatchTable'">主美更新表</div>
		<div class="TabButton inline-block box-border h-8 w-32 mx-4 text-center leading-8 cursor-pointer" :class="{ _now: compNow == 'ChromasPatchTable' }" @click="compNowPrepare = 'ChromasPatchTable'">炫彩更新表</div>
		<div class="TabButton inline-block box-border h-8 w-32 mx-4 text-center leading-8 cursor-pointer" :class="{ _now: compNow == 'Example' }" @click="compNowPrepare = 'Example'">图块示例</div>
		<div class="TabButton inline-block box-border h-8 w-32 mx-4 text-center leading-8 cursor-pointer" :class="{ _now: compNow == 'Find' }" @click="compNowPrepare = 'Find'">速查</div>
	</div>
	<component :is="compNow" class="CompNow" :data="data" />
</template>

<script setup>
	import { ref, watch, onBeforeMount, } from 'vue';
	import A from './lib/Aegis.js';
	import B from './lib/Bus.js';


	const data = ref({ champion: { cn: {}, en: {} }, patches: {} });
	const compNow = ref(null);
	const compNowPrepare = ref('');

	onBeforeMount(async () => {
		data.value.champion.cn = (await A.fetch('data/champion/zh_cn.json')).data;
		data.value.champion.en = (await A.fetch('data/champion/en_us.json')).data;

		const datasPatch = (await A.fetch('data/patch.json')).data;

		for(const patch in datasPatch) {
			const datas = datasPatch[patch];

			datas.forEach((raw, index) => {
				let [csid, type, tag, chromasAppend] = raw.split('.');

				datas[index] = { csid, type, tag, chromasAppend };
			});
		}

		data.value.patches = datasPatch;

		compNowPrepare.value = 'PatchTable';
	});

	watch(compNowPrepare, async now => {
		await B.app.loadComp(now);

		compNow.value = now;
	});
</script>

<style scoped>
	.TabButton._now {
		border-color: snow;
		@apply border-b-2;
	}

	.CompNow {
		position: relative;
		height: calc(100% - 2.25rem);
	}
</style>