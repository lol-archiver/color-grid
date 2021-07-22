<template>
	<div class="overflow-auto">
		<template v-for="(item, idItem) of examples">
			<div v-if="item.title" class="px-4">{{item.title}}</div>
			<div
				class="Item inline-block relative m-4 px-4 py-0 w-56 h-14 leading-14 text-sm whitespace-pre text-center overflow-ellipsis filter hover:contrast-125 cursor-pointer"
				:class="{
					_split: item.isSplit && idItem != 0,
					_lineFirst: idItem == 0
				}"
				:style="{ backgroundColor: item.colors.back, color: item.colors.font }"
			>
				{{item.name}}
			</div>
		</template>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import parseColor from '../lib/parseColor';


	export default {
		props: {
			data: {
				type: Object,
				default: () => ({ champion: { cn: {}, en: {} }, patches: {} })
			},
		},
		setup() {
			const examplesRaw = [
				{ name: '全新英雄', tag: '', sid: 0, title: '英雄' },
				{ name: '神秘皮肤', tag: 'my', sid: 1, title: '皮肤等级' },
				{ name: '至臻皮肤', tag: 'pt', sid: 1, },
				{ name: '终极皮肤', tag: 'ut', sid: 1, },
				{ name: '传说皮肤', tag: 'lg', sid: 1, },
				{ name: '史诗皮肤', tag: '', sid: 1, },
				{ name: '史诗以下皮肤', tag: 'tw', sid: 1, },
				{ name: '重做英雄', tag: 'up', sid: 0, title: '重做（字体颜色）' },
				{ name: '重做皮肤', tag: 'up', sid: 1, },
				{ name: '重做传说皮肤', tag: 'lg|up', sid: 1, },
				{ name: '限定史诗皮肤', tag: 'lm', sid: 1, title: '限定（字体颜色）'},
				{ name: '限定非史诗皮肤', tag: 'lg|lm', sid: 1, },
				{ name: '限定非史诗皮肤', tag: 'tw|lm', sid: 1, },
			];

			const examples = computed(() =>
				examplesRaw.map(item => {
					const tags = (item.tag ?? '').split('|');

					return parseColor({
						name: item.name,
						title: item.title,
						sid: item.sid,

						isUltimate: Boolean(tags.includes('ut')),
						isPrestige: Boolean(tags.includes('pt')),
						isMythic: Boolean(tags.includes('my')),
						isLegendary: Boolean(tags.includes('lg')),
						isTimeworn: Boolean(tags.includes('tw')),

						isLimit: Boolean(tags.includes('lm')),
						isUpdate: Boolean(tags.includes('up')),

						colors: {},
					});
				})
			);

			return {
				examples,
			};
		},
		mounted() {
		},
		methods: {
		}
	};
</script>

<style scoped>
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
</style>