// global objects
var gameStage;
var loginContainer;

window.addEventListener('resize', resize, false);

function init() {
    $("#CreateGame").hide();
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
    container.x = window.innerWidth - 250;
    container.y = 5;
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
    loginContainer = container;
    gameStage.addChild(container);

    var content = new createjs.DOMElement("LoginSection");
    content.visible = true;

    container.addChild(content);
    container.x = window.innerWidth - 250;
    container.y = 5;

    update = true;

    gameStage.update();

    createjs.Ticker.addEventListener("tick", tick);
}