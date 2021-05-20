const parseColor = function(strColor) {
	const bitsString = (strColor.match(/^#?([0-9a-f]{8}|[0-9a-f]{6}||[0-9a-f]{3,4})$/i) || [])[1];
	const width = ~~(bitsString.length / 3);

	return bitsString
		.padEnd(width * 4, 'F')
		.match(RegExp(`[0-9a-f]{${width}}`, 'ig'))
		.map(b => Number(`0x${b}`));
};

const colorBlack = parseColor('#000000');
const colorWhite = parseColor('#FFFFFF');


const factorsLuminance = [.2126, .7152, .0722, 0];
const luminance = function(color) {
	return color
		.map(space => space / 255)
		.map(spaceStand => spaceStand < .03928 ? spaceStand / 12.92 : Math.pow((spaceStand + .055) / 1.055, 2.4))
		.reduce((acc, spaceStand, i) => acc + factorsLuminance[i] * spaceStand, 0);
};
const overlayOn = function(colorA, colorB) {
	const [rA, gA, bA, aA] = colorA;
	const [rB, gB, bB, aB] = colorB;

	if(aA >= 255) { return colorA; }

	const alphaA = aA / 255;
	const alphaB = aB / 255;

	const factor = alphaB * (1 - alphaA);

	return [
		rA * alphaA + rB * factor,
		gA * alphaA + gB * factor,
		bA * alphaA + bB * factor,
		(alphaA + factor) * 255
	];
};

const contrastRatio = function(colorA, colorB) {
	const [, , , aA] = colorA;
	let [, , , aB] = colorB;

	if(aA >= 255) {
		if(aB < 255) {
			colorB = overlayOn(colorB, colorA);
		}

		const luminanceA = luminance(colorA) + .05;
		const luminanceB = luminance(colorB) + .05;

		let ratio = luminanceA / luminanceB;
		if(luminanceB > luminanceA) {
			ratio = 1 / ratio;
		}

		return ratio;
	}
	else {
		const onBlack = overlayOn(colorA, colorBlack);
		const onWhite = overlayOn(colorA, colorWhite);

		const contrastOnBlack = contrastRatio(onBlack, colorB);
		const contrastOnWhite = contrastRatio(onWhite, colorB);

		const max = Math.max(contrastOnBlack, contrastOnWhite);

		let min = 1;
		if(luminance(onBlack) > luminance(colorB)) {
			min = contrastOnBlack;
		}
		else if(luminance(onWhite) < luminance(colorB)) {
			min = contrastOnWhite;
		}

		return (min + max) / 2;
	}
};


const dict = {};

export default function detectColorWhite(strColor) {
	if(dict[strColor]) { return strColor; }

	const color = parseColor(strColor);

	const contrastBlack = contrastRatio(color, colorBlack);
	const contrastWhite = contrastRatio(color, colorWhite);

	return dict[strColor] = contrastBlack < contrastWhite;
}