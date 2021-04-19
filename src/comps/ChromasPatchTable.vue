<template>
	<div class="overflow-hidden whitespace-nowrap w-full">
		<div ref="Header" class="Header relative overflow-auto" @mouseenter.self="atOver" @touchstart="atTouch" @scroll="atScroll">
			<template v-for="(patch, pid) in patchesParsed">
				<div v-for="(item, iid) of patch"
					class="Item relative bg-gray-600 h-14 px-4 leading-7 text-center whitespace-pre cursor-pointer select-none filter hover:contrast-125"
					:class="iid == 0 ? '_first' : ''"
					:style="{ backgroundColor: item.colors.back, color: item.colors.font }"
				>
					<div v-if="iid == 0" class="absolute block top-0 left-0 text-sm text-gray-500" :rowspan="patch.length" @click="showHex = !showHex">{{pid}}</div>
					{{item.name}}
				</div>
			</template>
		</div>
		<div ref="Table" class="Table relative h-full overflow-auto" @mouseenter.self="atOver" @touchstart="atTouch" @scroll="atScroll">
			<table>
				<template v-for="patch in patchesParsed">
					<tr v-for="(item, iid) of patch">
						<td v-for="chroma of item.chromas"
							:colspan="chroma.isColspan ? 14 : 1"
							class="Item h-14 px-4 py-0 leading-7 text-sm text-center whitespace-pre overflow-ellipsis cursor-pointer filter hover:contrast-125"
							:class="iid == 0 ? '_first' : ''"
							style="background: rgb(255,255,255)"
							:style="{
								background: `linear-gradient(180deg, ${chroma.colors[0]} 0%, ${chroma.colors[0]} 50%, ${chroma.colors[1]} 50%, ${chroma.colors[1]} 100%)`,
								selectNone: !showHex
							}"
							v-html="chroma.name"
						/>
					</tr>
				</template>
			</table>
		</div>
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
			const { champion, patches } = toRefs(props.data);
			const { cn: championsCN, en: championsEN } = toRefs(champion.value);

			const colorsNameEN = {
				'#27211C#27211C': 'Obsidian',
				'#2756CE#2756CE': 'Sapphire',
				'#2DA130#2DA130': 'Emerald',
				'#54209B#54209B': 'Tanzanite',
				'#5F432B#5F432B': 'Meteorite',
				'#6ABBEE#6ABBEE': 'Aquamarine',
				'#73BFBE#73BFBE': 'Turquoise',
				'#85827F#85827F': 'Granite',
				'#9C68D7#9C68D7': 'Amethyst',
				'#9F4A25#9F4A25': 'Jasper',
				'#B6E084#B6E084': 'Peridot',
				'#C1F2FF#C1F2FF': 'Rainbow',
				'#D33528#D33528': 'Ruby',
				'#DED6B0#DED6B0': 'Sandstone',
				'#DF9117#DF9117': 'Citrine',
				'#E58BA5#E58BA5': 'Rose Quartz',
				'#ECF9F8#ECF9F8': 'Pearl',
				'#FFEE59#FFEE59': 'Catseye',
				'#FF2C25#FF2C25': 'Amber',

				'#88FF00#00B170': 'Jadeclaw',
				'#B2D1E4#3CABFF': 'Hunter'
			};

			const colorsWhite = [
				'#27211C', '#2756CE', '#54209B', '#5F432B', '#9F4A25', '#D33528',
				'#0C0C0F', '#162D57', '#A50031', '#9B1520', '#000000', '#0C0E15',
				'#611B9E', '#C33C3E', '#BD1357', '#19182A', '#C50041', '#162B30',
			];

			// 1 skinsNew
			// 2 championsNew
			// 3 championsUpdate
			// 4 voicesUpdate
			// 5 vfxUpdate
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

			const showHex = ref(false);
			const patchesParsed = computed(() =>
				Object.entries(patches.value).reduce((r, entry) => {
					const [version, patch] = entry;

					r[version] = !patch.length ?
						[{ name: '', colors: {}, chromas: [{ name: '', colors: ['transparent', 'transparent'] }] }] :
						patch.map(item => {
							const [cid, sid] = item.csid.split(/(?<=^(?:.{3})+)(?!$)/).map(id => Number(id));
							const championCN = championsCN.value[cid];
							const skinCN = championCN.skins[sid];
							const championEN = championsEN.value[cid];
							const skinEN = championEN.skins[sid];

							if(!skinCN.chromas) { console.log(cid, sid, skinCN); }
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

								chromas: Object.values(skinCN.chromas || {}).map(chCN => {
									const colors = chCN.colors;


									let nameEN;
									let nameCN;
									if(showHex.value) {
										nameEN = colors[0];
										nameCN = colors[1];
									}
									else {
										nameEN = colorsNameEN[colors[0] + colors[1]] || '';
										nameCN = chCN.name.replace(skinCN.name, '').trim();
									}

									nameEN = `<span style="${colorsWhite.includes(colors[0]) ? '' : 'color: #353637;'}">${nameEN}</span>`;
									nameCN = `<span style="${colorsWhite.includes(colors[1]) ? '' : 'color: #353637;'}">${nameCN}</span>`;


									return {
										name: `${nameEN}\n${nameCN}`,
										colors
									};
								}),

								name: `${skinEN.name}\n${skinCN.name}`,
							};

							parseColor(result);

							if(!result.chromas.length) {
								if(result.isPrestige) {
									result.chromas.push({ isColspan: true, name: '<span style="color: #353637;">至臻</span>', colors: ['#FFFF66', '#FFFF66'] });
								}
								else {
									result.chromas.push({ isColspan: true, name: '<span style="color: #353637;">无</span>', colors: ['snow', 'snow'] });
								}
							}

							return result;
						});

					return r;
				}, {})
			);



			return {
				showHex,
				patchesParsed,
				scrollNow: 1,
				widthTable: '100% - 100px'
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

				// const scale = (target.scrollHeight - target.clientHeight) / (binder.scrollHeight - binder.clientHeight);
				// console.log(target.scrollHeight, target.clientHeight, binder.scrollHeight, binder.clientHeight, scale);
				binder.scrollTop = target.scrollTop / 1;
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