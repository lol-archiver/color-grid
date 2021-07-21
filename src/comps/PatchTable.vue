<template>
	<div class="overflow-auto">
		<div class="relative w-full h-14 leading-14 overflow-hidden">
			<div class="inline-block align-top relative w-24 text-center bg-gray-600 cursor-pointer select-none filter hover:contrast-125">版本</div>
			<div ref="Header" class="Header _hideBar inline-block align-top relative whitespace-nowrap h-14 leading-14 overflow-auto" style="width: calc(100% - 6rem - 7px)">
				<div class="Item _lineFirst inline-block relative text-center bg-gray-600 cursor-pointer select-none filter hover:contrast-125" :style="{ width: `100%` }">更新内容</div>
			</div>
		</div>
		<div ref="Patcher" class="Patcher _hideBar relative w-24 overflow-auto" @mouseenter.self="atOver" @touchstart="atTouch" @scroll="atScroll">
			<div v-for="(patch, pid, index) in patchesParsed" class="relative w-full text-center cursor-pointer select-none filter hover:contrast-125"
				:class="{
					'bg-gray-500': (index % 2),
					'bg-gray-600': !(index % 2),
				}"
				:style="{
					height: `${0.25*14*(countsType[pid]|| 1)}rem`,
					lineHeight: `${0.25*14*(countsType[pid]|| 1)}rem`,
				}"
			>
				{{pid}}
			</div>
		</div>
		<div ref="Table" class="Table relative overflow-auto" @mouseenter.self="atOver" @touchstart="atTouch" @scroll="atScroll">
			<table ref="TableItem">
				<template v-for="(patch, pid) in patchesParsed">
					<template v-for="(patchType, type) of patch">
						<tr v-if="patchType.length" class="relative">
							<td v-for="(item, idItem) of patchType"
								class="Item relative h-14 px-4 py-0 leading-7 text-sm whitespace-pre text-center overflow-ellipsis filter hover:contrast-125 cursor-pointer"
								:class="{
									_split: item.isSplit && idItem != 0,
									_lineFirst: idItem == 0
								}"
								:style="{ backgroundColor: item.colors.back, color: item.colors.font }"
							>
								{{item.name}}
							</td>
							<div v-if="type != 'main'" class="absolute block -top-2 left-1 text-xs text-gray-500">{{namesType[type]}}</div>
						</tr>
					</template>
					<tr v-if="countsType[pid] == 0" class="Item _lineFirst relative h-14" />
				</template>
			</table>
		</div>
	</div>
</template>

<script>
	import { computed, toRefs, ref } from 'vue';
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

			const parseColor = item => {
				let back = '#ffffff';
				let font = '#000000';

				// 英雄
				if(item.sid == 0) { back = '#C6E0B4'; }
				// 终极
				else if(item.isUltimate) { back = '#FFE699'; }
				// 至臻
				else if(item.isPrestige) { back = '#F8CBAD'; }
				// 神秘
				else if(item.isMythic) { back = '#AE88FF'; }
				// 传说
				else if(item.isLegendary) { back = '#FF8383'; }
				// 破旧
				else if(item.isTimeworn) { back = '#4EB1CC'; }
				// 史诗限定
				else if(item.isLimit) { back = '#BDD7EE'; }
				// 史诗
				else { back = '#DAC2EC'; }


				// 重做的传说
				if(item.isUpdate && item.isLegendary) { font = '#3f51b5'; }
				// 重做
				else if(item.isUpdate) { font = '#C00000'; }
				// 非史诗的限定
				else if(back != '#BDD7EE' && item.isLimit) { font = '#396c9a'; }


				item.colors.back = back;
				item.colors.font = font;
			};

			const patchesParsed = computed(() =>
				Object.entries(patches.value).reduce((r, entry) => {
					const [version, patch] = entry;

					// 版本过滤
					// const versionNumber = Number(version.replace('.', ''));
					// if(910 > versionNumber || versionNumber > 919) { return r; }

					r[version] = patch.reduce((rr, item) => {
						const [cid, sid] = item.csid.split(/(?<=^(?:.{3})+)(?!$)/).map(id => Number(id));

						const championCN = championsCN.value[cid];
						const skinCN = championCN.skins[sid];
						const championEN = championsEN.value[cid];
						const skinEN = championEN.skins[sid];

						const tags = (item.tag ?? '').split('|');

						const result = {
							csid: item.csid,
							cid,
							sid,
							type: item.type,

							isUltimate: Boolean(tags.includes('ut')),
							isPrestige: Boolean(tags.includes('pt')),
							isMythic: Boolean(tags.includes('my')),
							isLegendary: Boolean(tags.includes('lg')),
							isTimeworn: Boolean(tags.includes('tw')),

							isLimit: Boolean(tags.includes('lm')),
							isUpdate: Boolean(tags.includes('up')),

							isSplit: Boolean(tags.includes('sp')),

							colors: {},

							name: `${skinEN.name}\n${skinCN.name}`,
						};

						if(sid == 0) {
							result.name = `${championEN.name}, ${championEN.title}\n${championCN.title} ${championCN.name}`;
						}

						parseColor(result);

						if(result.type == 'ns' || result.type == 'nh') { rr.main.push(result); }
						else if(result.type == 'up') { rr.skin.push(result); }
						else if(result.type == 'uh') { rr.skill.push(result); }
						else if(result.type == 'uv') { rr.voice.push(result); }
						else if(result.type == 'uc') { rr.chromas.push(result); }

						return rr;
					}, { main: [], skin: [], skill: [], voice: [], chromas: [] });

					return r;
				}, {})
			);

			// 1 ns 新皮肤
			// 2 nh 新英雄、完整重做英雄
			// 3 up 技能特效升级的英雄（系列，包括其皮肤的批量升级），皮肤（单独升级）
			// 4 uh 技能更新英雄（重做、更新技能，技能重新带来的个别新特效不单独列出）
			// 5 uv 语音更新英雄或皮肤
			// 6 uc 炫彩追加英雄或皮肤
			const countsType = computed(() => Object.entries(patchesParsed.value).reduce((r, [pid, patch]) => {
				r[pid] = (patch.main.length > 0) + (patch.skin.length > 0) + (patch.skill.length > 0) + (patch.voice.length > 0) + (patch.chromas.length > 0);

				return r;
			}, {}));

			return {
				patchesParsed,
				scrollNow: 1,
				countsType,
				namesType: ref({ main: '▼ 全新推出', skin: '▼ 品质更新', skill: '▼ 技能更新', voice: '▼ 语音更新', chromas: '▼ 炫彩追加' })
			};
		},
		mounted() {
		},
		methods: {
			atOver(event) {
				this.scrollNow = event.target;
			},
			atTouch(event) {
				const Patcher = this.$refs.Patcher;
				const Table = this.$refs.Table;

				let nodeNow = event.target;

				while(nodeNow.parentNode) {
					nodeNow = nodeNow.parentNode;

					if(nodeNow == Patcher || nodeNow == Table) {
						this.scrollNow = nodeNow;
					}
				}
			},
			atScroll(event) {
				if(this.scrollNow !== event.target) { return; }

				const Patcher = this.$refs.Patcher;
				const Table = this.$refs.Table;
				const Header = this.$refs.Header;

				const target = event.target;
				const binder = event.target === Table ? Patcher : Table;

				const scaleHeight = (target.scrollHeight - target.clientHeight) / (binder.scrollHeight - binder.clientHeight);

				binder.scrollTop = target.scrollTop / scaleHeight;

				const scaleHeader = (Header.scrollWidth - Header.clientWidth) / (Table.scrollWidth - Table.clientWidth);

				Header.scrollLeft = Table.scrollLeft / scaleHeader;
			},
		}
	};
</script>

<style scoped>
._lineFirst::before {
	content: "";
	position: absolute;
	border-left: 1px solid lightgray;
	height: 100%;
	top: 0px;
	left: 0px;
}

.Patcher {
	float: left;
	height: calc(100% - 7px - 3.5rem);
}

.Table {
	height: calc(100% - 3.5rem);
	width: auto;
}

.Item {
	min-width: 6rem;
}
.Item._split::before {
	content: "";
	position: absolute;
	border-left: 1px solid #3536376b;
	height: 40%;
	top: 0px;
	left: 0px;
}

._hideBar {
	scrollbar-width: none;
}
._hideBar::-webkit-scrollbar {
	width: 0px;
	height: 0px;
}
</style>