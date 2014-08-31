var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "25px Arial";
document.body.appendChild(canvas);


var background = new Image();
background.src = "images/background.png";
background.onload = function () {
    ctx.drawImage(background, 0, 0);
};

var player = new Image();
player.src = "images/player.png";
player.onload = function () {
    ctx.drawImage(player, hero.x, hero.y);
};

var player2 = new Image();
player2.src = "images/player2.png";
player2.onload = function(){
  ctx.drawImage(player2,hero2.x,hero2.y);
};

var hero2 ={
    x: (canvas.width / 2)+20,
    y: (canvas.height / 2) - 50,
    speed: 256
};

var hero = {
    x: (canvas.width / 2) - 26.5,
    y: (canvas.height / 2) - 50,
    speed: 256

};

var mouse = {};
var isMouseDown = false;
var keysDown = {};

window.addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
});

canvas.addEventListener("mousedown", function(){
    isMouseDown = true;
});

canvas.addEventListener("mouseup", function(){
    isMouseDown = false;
});

canvas.addEventListener("mousemove", function (event) {
    mouse = getMousePosition(canvas, event);
});

function getMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};


function update(modifier) {
    if (37 in keysDown) {
        hero.x -= hero.speed * modifier;
    };
    if (38 in keysDown) {
        hero.y -= hero.speed * modifier;
    };
    if (39 in keysDown) {
        hero.x += hero.speed * modifier;
    };
    if (40 in keysDown) {
        hero.y += hero.speed * modifier;
    };
};

function updateMouse(){

};

function render() {
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(player, hero.x, hero.y);
    ctx.drawImage(player2, hero2.x, hero2.y);
    ctx.fillText(hero.x + " " + hero.y, 10, 30);
    ctx.fillText(mouse.x + " " + mouse.y, 10, 50);
    ctx.fillText(isMouseDown,10,70);
};




function runTheGame() {
    update((Date.now() - time) / 1000);
    render();
    time = Date.now();
};


runTheGame();
var time = Date.now();
setInterval(runTheGame, 1);
