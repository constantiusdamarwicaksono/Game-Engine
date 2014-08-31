var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font ="25px Arial";
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

var hero = {
    x: (canvas.width / 2)-50.5,
    y: (canvas.height / 2) -45.5 ,
    speed: 256

};

var keysDown = {};

window.addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
});

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

function render() {
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(player, hero.x, hero.y);
    ctx.fillText(hero.x+" "+hero.y,10,30);
};


function runTheGame() {
    update((Date.now() - time) / 1000);
    render();
    time = Date.now();
};


runTheGame();
var time = Date.now();
setInterval(runTheGame, 1);
