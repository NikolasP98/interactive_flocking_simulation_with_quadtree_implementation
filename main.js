import GUI from 'lil-gui';

import Particle from './classes/particle.js';
import QuadTree from './classes/quadtree.js';

const locale = new URLSearchParams(window.location.search).get('lang') === 'es' ? 'es' : 'en';
window.pnLocale = locale;

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

let qtree, gui, frame;
let particlesArray = [];

const mouse = {
	x: null,
	y: null,
	radius: 10,
};

// setup function runs once before animation begins
const setup = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	particlesArray = [];
	for (let i = 0; i < 72; i++) {
		particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
	}

	qtree = new QuadTree({
		x: 0,
		y: 0,
		width: canvas.width,
		height: canvas.height,
	});

	QuadTree.debugger(gui);
	Particle.debugger(gui);
	cancelAnimationFrame(frame);
	frame = window.requestAnimationFrame(animate);
};

// animation loop runs indefinately
const animate = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	qtree.clear();

	for (let vec of particlesArray) {
		let p = {
			x: vec.position.x,
			y: vec.position.y,
			width: vec.radius * 2,
			height: vec.radius * 2,
		};

		qtree.insert({ bounds: p, data: vec });
	}

	for (let vec of particlesArray) {
		let p = {
			x: vec.position.x,
			y: vec.position.y,
			width: vec.largestRad * 2,
			height: vec.largestRad * 2,
		};
		let points = qtree.query(p);
		let others = points.map((x) => x.data);
		vec.update(others);
	}

	Particle.drawWalls();

	qtree.draw(ctx);

	frame = window.requestAnimationFrame(animate);
};

/* ---------------------------
   ----- EVENT LISTENERS -----
   --------------------------- */

// run setup function
window.onload = () => {
	gui = new GUI({ title: locale === 'es' ? 'Controles' : 'Controls' });

	// add particles to clicked coordinate
	canvas.addEventListener('click', (e) => {
		mouse.x = e.x;
		mouse.y = e.y;

		for (let i = 0; i < 5; i++) {
			particlesArray.push(
				new Particle(
					mouse.x + Math.random() * 50,
					mouse.y + Math.random() * 50
				)
			);
		}
	});

	setup();
};

// change canvas size as browser window resizes
window.addEventListener('resize', () => {
	setup();
});
