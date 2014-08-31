var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

var background = new Image();
background.src ="images/background.png";
background.onload = function(){
    ctx.drawImage(background,0,0);
};

var player = new Image();
player.src ="images/player.png";
player.onload = function(){
    ctx.drawImage(player,350,350);
};

var hero = {
    x : canvas.width/2,
    y : canvas.height/2,
    speed : 256

};

var keysDown = {};

window.addEventListener("keydown", function(e){
   keysDown[e.keyCode] = true;
});

window.addEventListener("keyup",function(e){
   delete keysDown[e.keyCode];
});

function update(modifier){
     if (37 in keysDown) {
        hero.x -= hero.speed * mod;
    }
    if (38 in keysDown) {
        hero.y -= hero.speed * mod;
    }
    if (39 in keysDown) {
        hero.x += hero.speed * mod;
    }
    if (40 in keysDown) {
        hero.y += hero.speed * mod;
    }
};

function render(){
    ctx.drawImage(background,0,0);
    ctx.drawImage(player,hero.x,hero.y);
};


function runTheGame(){
    update((Date.now() - time)/1000);
    render();
    time = Date.now();
};


runTheGame();
var time = Date.now();
setInterval(runTheGame,1);
