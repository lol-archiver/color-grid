<template>
	<div class="overflow-hidden whitespace-nowrap w-full">
		<textarea v-model="raw" class="h-1/2 w-1/2 text-gray-700" /><br />
		<textarea v-model="result" class="h-1/2 w-1/2 text-gray-700" />
	</div>
</template>

<script>
	import { computed, ref, toRefs } from 'vue';
	export default {
		props: {
			data: {
				type: Object,
				default: () => ({ champion: { cn: {}, en: {} }, patches: {} })
			},
		},
		setup(props) {
			const { champion } = toRefs(props.data);
			const { cn: championsCN } = toRefs(champion.value);

			const raw = ref('');
			const conds = computed(() => raw.value.split('\n'));

			const result = computed(() => {
				const names = [];

				Object.values(championsCN.value).forEach(({ id: cid, skins }) => {
					Object.values(skins).forEach(skin => {
						if(typeof skin != 'object') { return; }

						const { id: sid, name } = skin;

						for(const cond of conds.value) {
							if(name.includes(cond)) {
								names.push(`${String(cid).padStart(3, 0)}${String(sid).padStart(3, 0)} ${name}`);
							}
						}
					});
				});

				return names.join('\n');
			});

			return {
				raw,
				result,
			};
		},
	};
</script>

<style scoped>
.Header {
	float: left;
	height: calc(100% - 7px);
}
.Table {
	width: auto;
}

.Header {
	scrollbar-width: none;
}
.Header::-webkit-scrollbar {
	width: 0px;
}
</style>