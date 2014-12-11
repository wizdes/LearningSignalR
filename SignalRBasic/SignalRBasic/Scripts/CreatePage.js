var gameStage;

window.addEventListener('resize', resize, false);

function init() {
    initPage();
}

function tick(event) {
    if (update) {
        update = true;
        gameStage.update(event);
    }
}

function resize() {
    gameStage.canvas.width = window.innerWidth;
    gameStage.canvas.height = window.innerHeight;
}

function initPage() {
    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }

    var canvas = document.getElementById("testCanvas");
    gameStage = new createjs.Stage(canvas);

    gameStage.canvas.width = window.innerWidth;
    gameStage.canvas.height = window.innerHeight;

    container = new createjs.Container();
    gameStage.addChild(container);

    var content = new createjs.DOMElement("LoginSection");
    content.regX = 0;
    content.regY = 135;
    content.visible = true;


    container.addChild( content);
    container.x = 0; container.y = 200;

    update = true;

    gameStage.update();

    createjs.Ticker.addEventListener("tick", tick);
}