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
player2.onload = function () {
    ctx.drawImage(player2, hero2.x, hero2.y);
};

var rumput = new Image();
rumput.src = "images/rumput1.png";
rumput.onload = function () {
    ctx.drawImage(rumput, 121, 347);
};


var rumput2 = new Image();
rumput2.src = "images/rumput2.png";
rumput2.onload = function () {
    ctx.drawImage(rumput2, 547, 0);
};


var tembok = new Image();
tembok.src = "images/tembok.png";
player2.onload = function () {
    obstacle.x = (Math.random() * 200) + 1;
    obstacle.y = (Math.random() * 450) + 1;
    ctx.drawImage(tembok, obstacle.x, obstacle.y);
};

var ghost = new Image();
ghost.src = "images/ghost.png";
ghost.onload = function () {
    ctx.drawImage(ghost, wanderGhost.x, wanderGhost.y)
};

var obstacle = {
    x: 0,
    y: 0,
    width: 400,
    height: 50
};
var oldX2;
var oldY2;
var hero2 = {
    x: (canvas.width / 2) + 0,
    y: (canvas.height / 2) - 0,
    speed: 256,
    width: 57,
    height: 100
};
var oldX;
var oldY;
var hero = {
    x: (canvas.width / 2) - 26.5,
    y: (canvas.height / 2) - 50,
    speed: 256,
    width: 57,
    height: 100
};

var xawal = Math.floor(Math.random() * 700);
var yawal = Math.floor(Math.random() * 500);
var wanderGhost = {
    x: 100,
    y: 100,
    xTujuan: xawal,
    yTujuan: yawal,
    speed: 1,
    width: 40,
    height: 40
};

var mouse = {
    x: 0,
    y: 0
};
var isMouseDown = false;
var keysDown = {};

window.addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
});

canvas.addEventListener("mousedown", function (e) {
    isMouseDown = true;

}, false);

canvas.addEventListener("mouseup", function () {
    isMouseDown = false;
}, false);

canvas.addEventListener("mousemove", function (event) {
    var rec = canvas.getBoundingClientRect();
    mouse.x = event.pageX - rec.left;
    mouse.y = event.pageY - rec.top;

});



function update(modifier) {
    oldX = hero.x;
    oldY = hero.y;
    if (37 in keysDown) {
        hero.x -= hero.speed * modifier;
    }
    if (38 in keysDown) {
        hero.y -= hero.speed * modifier;
    }
    if (39 in keysDown) {
        hero.x += hero.speed * modifier;
    }
    if (40 in keysDown) {
        hero.y += hero.speed * modifier;
    }
    collisionCheckHero();
};

function updateMouse() {
    if (mouse.x >= hero2.x && mouse.x <= hero2.x + 57 && mouse.y >= hero2.y && mouse.y <= hero2.y + 99 && isMouseDown) {
        oldX2 = hero2.x;
        oldY2 = hero2.y;
        hero2.x = mouse.x - 26.5;
        hero2.y = mouse.y - 50;
        collisionCheckHero();

    }
};

function ghostWalk() {
    if (wanderGhost.x == wanderGhost.xTujuan && wanderGhost.y == wanderGhost.yTujuan) {
        wanderGhost.xTujuan = 20 + Math.floor(Math.random() * (canvas.width - 20));
        wanderGhost.yTujuan = 20 + Math.floor(Math.random() * (canvas.height - 20));
    }
    if (wanderGhost.x > wanderGhost.xTujuan) {
        wanderGhost.x = wanderGhost.x - wanderGhost.speed;
    }
    if (wanderGhost.x < wanderGhost.xTujuan) {
        wanderGhost.x = wanderGhost.x + wanderGhost.speed;
    }
    if (wanderGhost.y > wanderGhost.yTujuan) {
        wanderGhost.y = wanderGhost.y - wanderGhost.speed;
    }
    if (wanderGhost.y < wanderGhost.yTujuan) {
        wanderGhost.y = wanderGhost.y + wanderGhost.speed;
    }
    if (((wanderGhost.x + wanderGhost.width >= obstacle.x) && (wanderGhost.x <= obstacle.x + obstacle.width)) && ((wanderGhost.y + wanderGhost.height >= obstacle.y) && (wanderGhost.y <= obstacle.y + obstacle.height))) {
        wanderGhost.xTujuan = 20 + Math.floor(Math.random() * (canvas.width - 20));
        wanderGhost.yTujuan = 20 + Math.floor(Math.random() * (canvas.height - 20));
    }
};

function render() {
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(ghost, wanderGhost.x, wanderGhost.y)
    ctx.drawImage(player, hero.x, hero.y);
    ctx.drawImage(player2, hero2.x, hero2.y);
    ctx.drawImage(rumput2, 547, 0);
    ctx.drawImage(rumput, 121, 347)
    ctx.drawImage(tembok, obstacle.x, obstacle.y);;
    ctx.fillText(obstacle.x + " " + obstacle.y, 10, 30);
    ctx.fillText(mouse.x + " " + mouse.y, 10, 50);
    ctx.fillText(isMouseDown, 10, 70);
};


function runTheGame() {
    updateMouse((Date.now() - time) / 1000);
    update((Date.now() - time) / 1000);
    ghostWalk();
    render();
    time = Date.now();
};


function collisionCheckHero() {
    if ((((hero.x + hero.width >= obstacle.x) && (hero.x <= obstacle.x + obstacle.width)) && ((hero.y + hero.height >= obstacle.y) && (hero.y <= obstacle.y + obstacle.height))) || (hero.x <= 0) || (hero.y <= 0) || (hero.x + hero.width >= 700) || (hero.y + hero.height >= 500)) {
        hero.x = oldX;
        hero.y = oldY;
    }

    if ((((hero2.x + hero2.width >= obstacle.x) && (hero2.x <= obstacle.x + obstacle.width)) && ((hero2.y + hero2.height >= obstacle.y) && (hero2.y <= obstacle.y + obstacle.height))) || (hero2.x <= 0) || (hero2.y <= 0) || (hero2.x + hero2.width >= 700) || (hero2.y + hero2.height >= 500)) {
        hero2.x = oldX2;
        hero2.y = oldY2;
    }
};

runTheGame();
var time = Date.now();
setInterval(runTheGame, 10);
