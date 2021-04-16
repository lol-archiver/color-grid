<template>
	<div class="mb-4">
		<div class="TabButton inline-block box-border h-8 w-32 mx-4 text-center leading-8 cursor-pointer" :class="{ _now: compNow == 'PatchTable' }" @click="compNowPrepare = 'PatchTable'">主美更新表</div>
		<div class="TabButton inline-block box-border h-8 w-32 mx-4 text-center leading-8 cursor-pointer" :class="{ _now: compNow == 'ChromasPatchTable' }" @click="compNowPrepare = 'ChromasPatchTable'">炫彩更新表</div>
	</div>
	<component :is="compNow" class="CompNow" :data="data" />
</template>

<script>
	import { ref, watch, onBeforeMount, } from 'vue';
	import A from './lib/Aegis';

	export default {
		setup() {
			const data = ref({ champion: { cn: {}, en: {} }, patches: {} });
			const compNow = ref('');
			const compNowPrepare = ref('');

			onBeforeMount(async () => {
				data.value.champion.cn = (await A.fetch('data/champion/zh_cn.json')).data;
				data.value.champion.en = (await A.fetch('data/champion/en_us.json')).data;
				data.value.patches = (await A.fetch('data/patch.json')).data;

				compNowPrepare.value = 'PatchTable';
			});
			watch(compNowPrepare, async now => {
				await app.loadComp(now);

				compNow.value = now;
			});

			return {
				data,
				compNow,
				compNowPrepare
			};
		},
	};
</script>

<style scoped>
.TabButton._now {
	border-color: snow;
	@apply border-b-2;
}

.CompNow {
	position: relative;
	height: calc(100% - 3rem);
}
</style>