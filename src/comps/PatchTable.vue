<template>
	<div class="overflow-auto">
		<div ref="Header" class="Header relative w-24 h-full overflow-auto" @mouseenter.self="atOver" @touchstart="atTouch" @scroll="atScroll">
			<div v-for="(patch, pid) in patchesParsed" class="relative w-full h-14 leading-14 text-center bg-gray-600 cursor-pointer select-none filter hover:contrast-125">
				{{pid}}
			</div>
		</div>
		<div ref="Table" border="1" class="Table relative h-full overflow-auto" @mouseenter.self="atOver" @touchstart="atTouch" @scroll="atScroll">
			<table>
				<tr v-for="patch in patchesParsed" class="">
					<td v-for="item of patch"
						class="h-14 px-4 py-0 leading-7 text-sm whitespace-pre text-center overflow-ellipsis filter hover:contrast-125 cursor-pointer select-none"
						:style="{ backgroundColor: item.colors.back, color: item.colors.font }"
					>
						{{item.name}}
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import { computed, toRefs } from 'vue';
	export default {
		props: {
			data: {
				type: Object,
				default: () => ({ champion: { cn: {}, en: {} }, patches: {} })
			},
		},
		setup(props) {
			const { champion, patches } = toRefs(props.data);
			const { cn: championsCN, en: championsEN } = toRefs(champion.value);
			// 1 skinsNew
			// 2 championsNew
			// 3 skinsUpdate
			// 4 championsUpdate
			// 5 voicesUpdate
			// 6 chromasAppend

			const parseColor = item => {
				let back = '#ffffff';
				let font = '#000000';

				if(item.isLegendary) { back = '#FFE699'; }
				else if(item.isPrestige) { back = '#F8CBAD'; }
				else if(item.isSolo) { back = '#BDD7EE'; }
				else if(item.sid == 0) { back = '#C6E0B4'; }
				else { back = '#DAC2EC'; }

				if(item.isUpdate) { font = '#C00000'; }
				else if(item.isLimit) { font = '#548235'; }


				item.colors.back = back;
				item.colors.font = font;
			};

			const patchesParsed = computed(() =>
				Object.entries(patches.value).reduce((r, entry) => {
					const [version, patch] = entry;

					r[version] = !patch.length ? [{ name: '', colors: {} }] : patch.map(item => {
						const [cid, sid] = item.csid.split(/(?<=^(?:.{3})+)(?!$)/).map(id => Number(id));
						const championCN = championsCN.value[cid];
						const skinCN = championCN.skins[sid];
						const championEN = championsEN.value[cid];
						const skinEN = championEN.skins[sid];

						const result = {
							csid: item.csid,
							cid,
							sid,
							type: item.type,

							isLegendary: Boolean(item.isLegendary),
							isPrestige: Boolean(item.isPrestige),
							isSolo: Boolean(item.isSolo),

							isUpdate: Boolean(item.isUpdate),
							isLimit: Boolean(item.isLimit),

							colors: {},

							name: `${skinEN.name}\n${skinCN.name}`,
						};

						if(sid == 0) {
							result.name = `${championEN.name}\n${championCN.name}`;
						}

						parseColor(result);

						return result;
					});

					return r;
				}, {})
			);

			return {
				patchesParsed,
				scrollNow: 1
			};
		},
		methods: {
			atOver(event) {
				this.scrollNow = event.target;
			},
			atTouch(event) {
				const Header = this.$refs.Header;
				const Table = this.$refs.Table;

				let nodeNow = event.target;

				while(nodeNow.parentNode) {
					nodeNow = nodeNow.parentNode;

					if(nodeNow == Header || nodeNow == Table) {
						this.scrollNow = nodeNow;
					}
				}
			},
			atScroll(event) {
				if(this.scrollNow !== event.target) { return; }

				const Header = this.$refs.Header;
				const Table = this.$refs.Table;

				const target = event.target;
				const binder = event.target === Table ? Header : Table;

				const scale = (target.scrollHeight - target.clientHeight) / (binder.scrollHeight - binder.clientHeight);

				binder.scrollTop = target.scrollTop / scale;
			},
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