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
								'--tw-contrast': chroma.isDark ? 'contrast(0.25)' : null,
								background: `linear-gradient(180deg, ${chroma.colors[0]} 0%, ${chroma.colors[0]} 50%, ${chroma.colors[1]} 50%, ${chroma.colors[1]} 100%)`,
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

	import detectColorWhite from '../lib/ContrastRatio';
	import parseColor from '../lib/parseColor';


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
				'#B2D1E4#3CABFF': 'Hunter',
				'#0C0C0F#B2D1E4': 'Night',
				'#162D57#A50031': 'Chrono',
				'#0C0C0F#9B1520': 'Elite',
				'#000000#A50031': 'Antimatter',
				'#0C0E15#611B9E': 'Peacekeeper',
				'#6FFDFF#2377FF': 'Paragon',
				'#C33C3E#0C0E15': 'Pariah',
				'#E58BA5#6FFDFF': 'Sweet Tooth',
				'#BD1357#19182A': 'Freestyle',
				'#95ECFF#C33C3E': 'Nomad',
				'#E0FFFF#C50041': 'Heavenly Crane',
				'#FF5500#162B30': 'Reckoning',
				'#611B9E#19E888': 'Neon Noir',
				'#A5FFF8#D87BFF': 'K.O.',
				'#D33528#2756CE': 'Fan Pass',
				'#DF6C0E#0DCADB': 'LEC',
				'#6ABBEE#FFEE59': 'LCS',
				'#D33528#ECF9F8': 'LPL',
				'#050B19#ECC124': 'Cursed',
				'#080808#8E0A38': 'Resolute',
				'#050B19#0055FF': 'Elite',
				'#9DFFEF#AA55FF': 'Disco',
				'#88FF00#9B1520': 'Vitality',
				'#0C0C0F#272A3F': 'BADDEST',
			};

			const chromasAppendAll = {};

			const showHex = ref(false);
			const patchesParsed = computed(() =>
				Object.entries(patches.value).reduce((r, entry) => {
					const [version, patch] = entry;

					r[version] = !patch.length ?
						[{ name: '', colors: {}, chromas: [{ name: '', colors: ['transparent', 'transparent'] }] }] :
						patch.map(item => {
							if(!['ns', 'nh', 'uc'].includes(item.type)) { return; }

							const [cid, sid] = item.csid.split(/(?<=^(?:.{3})+)(?!$)/).map(id => Number(id));
							const championCN = championsCN.value[cid];
							const skinCN = championCN.skins[sid];
							const championEN = championsEN.value[cid];
							const skinEN = championEN.skins[sid];

							const tags = item.tag ? item.tag.split('|') : [];
							const chromasAppend = item.chromasAppend ? item.chromasAppend.split('|') : [];

							chromasAppend.forEach(colorFull => (chromasAppendAll[item.csid] ?? (chromasAppendAll[item.csid] = [])).push(colorFull));

							const result = {
								csid: item.csid,
								cid,
								sid,
								type: item.type,
								chromasAppend,

								isUltimate: Boolean(tags.includes('ut')),
								isPrestige: Boolean(tags.includes('pt')),
								isMythic: Boolean(tags.includes('my')),
								isLegendary: Boolean(tags.includes('lg')),
								isTimeworn: Boolean(tags.includes('tw')),

								isLimit: Boolean(tags.includes('lm')),
								isUpdate: Boolean(tags.includes('up')),

								isSplit: Boolean(tags.includes('sp')),

								colors: {},

								chromas: Object.values(skinCN.chromas || {}).map(chCN => {
									const [color0, color1] = chCN.colors ?? ['', ''];
									const colorFull = color0 + color1;


									let nameEN;
									let nameCN;
									if(showHex.value) {
										nameEN = color0;
										nameCN = color1;
									}
									else {
										nameEN = (chCN.stage ?
											skinEN.chromas[chCN.id]?.name.replace(skinEN.nameStage ?? skinEN.name, '').trim() :
											colorsNameEN[colorFull]
										) ?? '';
										nameCN = chCN.name.replace(skinCN.nameStage ?? skinCN.name, '').trim();
									}

									nameEN = `<span style="${detectColorWhite(color0) ? '' : 'color: #353637;'}">${nameEN}</span>`;
									nameCN = `<span style="${detectColorWhite(color1) ? '' : 'color: #353637;'}">${nameCN}</span>`;


									const isDark =
										(chromasAppend.length && !chromasAppend.includes(colorFull)) ||
										(!chromasAppend.length && (chromasAppendAll[item.csid] ?? []).includes(colorFull));

									return {
										name: `${nameEN}\n${nameCN}`,
										colorText: `${color0}\n${color1}`,
										colors: chCN.colors ?? ['', ''],
										isDark
									};
								}).sort((a, b) => a.isDark - b.isDark),

								name: `${skinEN.nameStage ?? skinEN.name}\n${skinCN.nameStage ?? skinCN.name}`,
							};

							if(sid == 0) {
								result.name = `${championEN.name}, ${championEN.title}\n${championCN.title} ${championCN.name}`;
							}

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
						}).filter(i => i);

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