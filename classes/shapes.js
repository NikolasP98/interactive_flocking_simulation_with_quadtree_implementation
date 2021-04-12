import { ctx } from '../main.js';

export const ellipse = (x, y, rad) => {
	ctx.beginPath();
	ctx.arc(x, y, rad, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
};

export const slider = (
	min,
	max,
	value,
	step = 0,
	id = undefined,
	parent = undefined
) => {
	let elt = document.createElement('input');
	elt.type = 'range';
	elt.min = min;
	elt.max = max;
	elt.step = step;
	if (step === 0) {
		elt.step = 0.000000000000000001; // smallest valid step
	}
	if (typeof value === 'number') elt.value = value;
	elt.style.position = 'relative';
	elt.style.zIndex = '10';
	let parentElement = document.body;
	if (parent) {
		parentElement = document.getElementById(parent);
	}

	return parentElement.appendChild(elt);
};

export const checkbox = (value, id = undefined, parent = undefined) => {
	let elt = document.createElement('input');
	elt.type = 'checkbox';

	if (typeof value === 'boolean') elt.checked = value;
	elt.style.position = 'relative';
	elt.style.display = 'block';
	elt.style.zIndex = '10';
	let parentElement = document.body;
	if (parent) {
		parentElement = document.getElementById(parent);
	}

	return parentElement.appendChild(elt);
};