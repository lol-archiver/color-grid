function i(i){let s="#ffffff",e="#000000";return s=0==i.sid?"#C6E0B4":i.isMythic?"#AE88FF":i.isPrestige?"#F8CBAD":i.isUltimate?"#FFE699":i.isLegendary?"#FF8383":i.isTimeworn?"#4EB1CC":i.isLimit?"#BDD7EE":"#DAC2EC",i.isUpdate&&i.isLegendary?e="#3f51b5":i.isUpdate?e="#C00000":"#BDD7EE"!=s&&i.isLimit&&(e="#396c9a"),i.colors.back=s,i.colors.font=e,i}export{i as p};