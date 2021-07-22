<template>
	<div class="overflow-hidden whitespace-nowrap w-full text-center">
		<textarea ref="ra" v-model="raw" class="h-1/3 w-1/3 bg-transparent text-white resize-none outline-none border-b border-white" @mouseover="mora" />
		<br />
		<textarea ref="re" v-model="result" class="h-1/3 w-1/3 bg-transparent text-white resize-none outline-none" readonly="readonly" @mouseover="more" />
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
				if(raw.value.trim() == '') { return ''; }

				const names = new Set();

				Object.values(championsCN.value).forEach(({ id: cid, skins }) => {
					Object.values(skins).forEach(skin => {
						if(typeof skin != 'object') { return; }

						const { id: sid, name } = skin;

						for(const cond of conds.value) {
							if(cond && name.includes(cond)) {
								names.add(`${name}^"${String(cid).padStart(3, 0)}${String(sid).padStart(3, 0)}.ns",`);
							}
						}
					});
				});

				return [...names].join('\n');
			});

			return {
				raw,
				result,
			};
		},
		methods: {
			more() { this.$refs.re.focus(); this.$refs.re.select(); },
			mora() { this.$refs.ra.focus(); this.$refs.ra.select(); },
		}
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