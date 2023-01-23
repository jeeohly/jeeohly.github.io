const stage = document.getElementById("canvas");

stage.width = window.innerWidth;
stage.height = window.innerHeight;

let then, fpsInterval, startTime;

// utilities
const randItem = (i) => i[Math.floor(Math.random() * i.length)];
const rand = (i) => Math.floor(Math.random() * i);
const randBetween = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min);

// config
const max = 500;
const ctx = stage.getContext("2d");
const w = stage.width;
const h = stage.height;
const pets = ["🐱", "🥚"];

// make an array of items
const items = new Array(max).fill().map((i) => {
	return {
		x: rand(w),
		y: rand(h),
		p: randItem(pets),
		xs: -4 + Math.random() * 4 + 2,
		ys: Math.random() * 10 + 10,
		fs: randBetween(12, 46)
	};
});

function draw() {
	ctx.clearRect(0, 0, w, h);
	items.forEach((p) => {
		ctx.font = `${p.fs}px sans-serif`;
		ctx.fillText(p.p, p.x, p.y);
	});

	requestAnimationFrame(draw);

	let now = Date.now();
	let elapsed = now - then;

	if (elapsed > fpsInterval) {
		then = now - (elapsed % fpsInterval);
	}

	move();
}

function move() {
	items.forEach((p) => {
		p.x += p.xs;
		p.y += p.ys;
		if (p.x > w || p.y > h) {
			p.x = rand(w);
			p.y = -10;
		}
	});
}

function animate(fps) {
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;

	draw();
}

animate(60);

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const firstDay = new Date(2022, 10, 06);
const today = new Date();
console.log(firstDay);
console.log(today);
const days = Math.round(Math.abs((today - firstDay) / oneDay));
window.onload = function() {
    document.getElementById("total_days").innerHTML = "Elva and Gio<br><center>" + days + " days</center>";
}
