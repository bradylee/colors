var GAME_WIDTH = 375;
var GAME_HEIGHT = 500;
var BALL_SIZE = 66; // pixels

var canvas = document.createElement("canvas");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
canvas.addEventListener("click", userInput);
document.body.appendChild(canvas);
var context = canvas.getContext("2d");

function randomLocation(size) {
	var hori = GAME_WIDTH - size;
	var vert = GAME_HEIGHT - size;
	var location = {
		x: Math.floor(Math.random() * hori),
		y: Math.floor(Math.random() * vert)
	};
	return location;
}

function dot(color) {
	this.color = color;

	var location = randomLocation(BALL_SIZE);
	this.x = location.x;
	this.y = location.y;

	this.img = new Image();
	this.img.ready = false;
	this.img.src = "assets/" + color + ".png";
	this.img.onload = function() {
		this.ready = true;
		draw();
	};
}

var dots = {
	red: new dot("red"),
	blue: new dot("blue"),
	green: new dot("green"),
	cyan: new dot("cyan"),
	magenta: new dot("magenta"),
	yellow: new dot("yellow")
	//*/
};

function draw() {
	context.fillStyle = "white";
	context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	for (color in dots) {
		var dot = dots[color];
		if (dot.img.ready)
		{
			context.drawImage(dot.img, dot.x, dot.y);

		}
	}
}

function userInput(event) {
	var x = event.clientX - 10;
	var y = event.clientY - 10;

	for (color in dots) {
		var dot = dots[color];
		var left = dot.x;
		var right = left + BALL_SIZE;
		var top = dot.y;
		var bottom = top + BALL_SIZE;

		if (x >= left && x <= right && y >= top && y <= bottom) {
			dot.img.ready = false;
		}
	}

	draw();
}

/*
var textbox = document.getElementById("text");
var rect = canvas.getBoundingClientRect();
canvas.onclick = function(event) {
	var x = event.clientX - canvas.offsetLeft;
	var y = event.clientY - canvas.offsetTop;
	textbox.innerHTML = x + ", " + y;
};
*/