var GAME_WIDTH = 375;
var GAME_HEIGHT = 500;
var DOT_SIZE = 66; // pixels
var DOT_DELAY = 1000;
var MAX_DOTS = 10;
var BG_DELAY = 5000;
var NUM_COLORS = 6;
var COLORS = ["red", "green", "blue", "cyan", "magenta", "yellow"];
var LIGHT = ["red", "green", "blue"];
var PIGMENT = ["cyan", "magenta", "yellow"];

var canvas = document.createElement("canvas");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
canvas.addEventListener("click", userInput);
document.body.appendChild(canvas);
var context = canvas.getContext("2d");

var dots = [];
var images = {};
var points = 0;
var background = {
	color: "white",
	delay: BG_DELAY
};

function Dot(color) {
	this.color = color;
	this.delay = DOT_DELAY;
	this.ready = false;

	this.newLocation = function(allow_overlap) {
		var location = randomLocation(DOT_SIZE);
		this.x = location.x;
		this.y = location.y;
	};

	this.newColor = function () {
		this.color = randomColor();
		this.img = images[this.color];
	};

	var valid_location = true;

	this.reset = function() {
		this.newColor();

		do {
			this.newLocation();
			valid_location = true;

			for (var d in dots) {
				var dot = dots[d];
				var left = dot.x;
				var right = left + DOT_SIZE;
				var top = dot.y;
				var bottom = top + DOT_SIZE;

				p1 = {x: this.x, y: this.y};
				p2 = {x: this.x + DOT_SIZE, y: this.y + DOT_SIZE};

				if (dot == this)
					continue;

				if ((p1.x >= left && p1.x <= right || p2.x >= left && p2.x <= right) && 
					(p1.y >= top && p1.y <= bottom || p2.y >= top && p2.y <= bottom)) {
						valid_location = false;
				}
			}
		} while (!valid_location);
	}

	this.reset();
	if (!(typeof color === "undefined"))
		this.img = images[color];
}


function setup() {
	//for (var c in COLORS) {
	for (var c = 0; c < NUM_COLORS; c++) {
		var color = COLORS[c];
		console.log(color);
		var img = new Image();
		img.src = "assets/" + color + ".png";
		images[color] = img;
	}

	for (var i = 0; i < MAX_DOTS; i++) {
		dots.push(new Dot());
	}
}

function draw() {
	context.fillStyle = background.color; // "white";
	context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	for (color in dots) {
		var dot = dots[color];
		if (dot.ready)
			context.drawImage(dot.img, dot.x, dot.y);
	}

	if (background.color == "white")
		context.fillStyle = "black";
	else
		context.fillStyle = "white";

	context.font = "16px Helvetica";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("Points: " + points, 5, 5);
}

/*
function updateDots(delta) {
	for (var d in dots) {
		var dot = dots[d];

		if (dot.ready)
			dot.delay = DOT_DELAY;
		else {
			dot.delay -= delta;
			if (dot.delay <= 0)
				dot.ready = true;

			break;
		}
	}
}
*/

var next_dot = 0;

function updateDots(delta) {
	next_dot -= delta;
	if (next_dot <= 0) {
		for (var d = 0; d < MAX_DOTS; d++) {
			var dot = dots[d];
			if (!dot.ready) {
				dot.ready = true;
				console.log(dots);
				break;
			}
		}
		next_dot = DOT_DELAY;
	}
}

function updateBackground(delta) {
	background.delay -= delta;
	if (background.delay <= 0) {
		if (background.color == "white")
			background.color = "black";
		else
			background.color = "white";

		background.delay = BG_DELAY;
	}
}

function updatePoints(dot) {
	if (background.color == "white" && PIGMENT.contains(dot.color) ||
		background.color == "black" && LIGHT.contains(dot.color))
		points++;
}

function userInput(event) {
	var x = event.clientX - 10; // temp deal with page margin
	var y = event.clientY - 10;

	for (var d in dots) {
		var dot = dots[d];
		var left = dot.x;
		var right = left + DOT_SIZE;
		var top = dot.y;
		var bottom = top + DOT_SIZE;

		if (x >= left && x <= right && y >= top && y <= bottom) {
			dot.ready = false; // delete dot on click
			updatePoints(dot);
			dot.reset();
		}
	}
}


function randomLocation(size) {
	var hori = GAME_WIDTH - size;
	var vert = GAME_HEIGHT - size;
	var location = {
		x: Math.floor(Math.random() * hori),
		y: Math.floor(Math.random() * vert)
	};
	return location;
}

function randomColor() {
	var r = Math.floor(Math.random() * (NUM_COLORS));
	return COLORS[r];
}

Array.prototype.contains = function(key) {
	return (this.indexOf(key) > -1)
}


function main() {
	var now = Date.now();
	var delta = now - then;
	updateDots(delta);
	updateBackground(delta);
	draw();
	then = now;
	requestAnimationFrame(main)
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame 
|| w.webkitRequestAnimationFrame 
|| w.msRequestAnimationFrame 
|| w.mozRequestAnimationFrame;

var then = Date.now();
setup();
main();