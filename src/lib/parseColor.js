export default function parseColor(item) {
	let back = '#ffffff';
	let font = '#000000';

	// 英雄
	if(item.sid == 0) { back = '#C6E0B4'; }
	// 神秘
	else if(item.isMythic) { back = '#AE88FF'; }
	// 至臻
	else if(item.isPrestige) { back = '#F8CBAD'; }
	// 终极
	else if(item.isUltimate) { back = '#FFE699'; }
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

	return item;
}