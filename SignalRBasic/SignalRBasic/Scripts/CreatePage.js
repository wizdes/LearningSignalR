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

function setupPage() {
    var canvas = document.getElementById("testCanvas");
    gameStage = new createjs.Stage(canvas);

    gameStage.canvas.width = window.innerWidth;
    gameStage.canvas.height = window.innerHeight;

    container = new createjs.Container();
    loginContainer = container;
    gameStage.addChild(container);
}

function addLoginInfo() {
    content = new createjs.DOMElement("LoginSection");
    content.visible = true;

    container.addChild(content);
    container.x = window.innerWidth - 250;
    container.y = 5;
}

function addTitleInfo() {
    titleContainer = new createjs.Container();
    gameStage.addChild(titleContainer);

    titleContent = new createjs.DOMElement("SiteTitle");
    titleContent.visible = true;

    titleContainer.addChild(titleContent);
    titleContainer.x = window.innerWidth / 2 - 250;
    titleContainer.y = 5;
}

function initPage() {
    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }

    setupPage();
    addLoginInfo();
    addTitleInfo();

    update = true;

    gameStage.update();

    createjs.Ticker.addEventListener("tick", tick);
}

function cleanMainPage() {
    content.visible = false;
    update = true;
    $("#TitleText").html("Euchre With Friends - Lobby");

    groupLobbyContainer = new createjs.Container();
    gameStage.addChild(groupLobbyContainer);

    groupLobbyContent = new createjs.DOMElement("GroupLobbyInfo");
    groupLobbyContent.visible = true;

    groupLobbyContainer.addChild(groupLobbyContent);
    groupLobbyContainer.x = window.innerWidth / 2 - 50;
    groupLobbyContainer.y = 105;

    $("#GroupLobbyInfo").show();

    gameStage.update();
}