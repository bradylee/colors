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

	var valid_location = true;

	do {
		var location = randomLocation(BALL_SIZE);
		this.x = location.x;
		this.y = location.y;

		valid_location = true;
		console.log(dots);
		for (var c in dots) {
			console.log(c);

			var dot = dots[c];
			var left = dot.x;
			var right = left + BALL_SIZE;
			var top = dot.y;
			var bottom = top + BALL_SIZE;

			p1 = {x: this.x, y: this.y};
			p2 = {x: this.x + BALL_SIZE, y: this.y + BALL_SIZE};

			//p2 = {x: this.x, y: this.y + BALL_SIZE};
			//p3 = {x: this.x + BALL_SIZE, y: this.y};
			//p4 = {x: this.x + BALL_SIZE, y: this.y + BALL_SIZE};

			if ((p1.x >= left && p1.x <= right || p2.x >= left && p2.x <= right) && 
				(p1.y >= top && p1.y <= bottom || p2.y >= top && p2.y <= bottom)) {
					valid_location = false;
				}
/*

			console.log(this.color, this.x, this.y, dot.color, dot.x, dot.y);
			if (this.x >= left && this.x <= right && this.y >= top && this.y <= bottom) {
				valid_location = false;
			}

			*/
		}
	} while (!valid_location);

	this.img = new Image();
	this.img.ready = false;
	this.img.src = "assets/" + color + ".png";
	this.img.onload = function() {
		this.ready = true;
		draw();
	};
}

var dots = { };

dots.red = new dot("red");
dots.green = new dot("green");
dots.blue = new dot("blue");
dots.cyan = new dot("cyan");
dots.magenta = new dot("magenta");
dots.yellow = new dot("yellow");

function draw() {
	context.fillStyle = "white";
	context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	for (color in dots) {
		var dot = dots[color];
		if (dot.img.ready)
		{
			console.log(dot.color, dot.img);
			context.drawImage(dot.img, dot.x, dot.y);
		}
	}
}

function userInput(event) {
	var x = event.clientX - 10;
	var y = event.clientY - 10;

	for (var c in dots) {
		var dot = dots[c];
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