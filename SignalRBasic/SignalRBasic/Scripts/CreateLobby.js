var groupLobbyContainer;

function initLobbyPage() {
    groupLobbyContainer = new createjs.Container();
    gameStage.addChild(groupLobbyContainer);

    $("#TitleText").html("Euchre With Friends - Lobby");

    groupLobbyContent = new createjs.DOMElement("GroupLobbyInfo");
    groupLobbyContent.visible = true;

    groupLobbyContainer.addChild(groupLobbyContent);
    groupLobbyContainer.x = window.innerWidth / 2 - 50;
    groupLobbyContainer.y = 105;

    $("#GroupLobbyInfo").show();

    gameStage.update();
}

function cleanupLobbyPage() {
    groupLobbyContainer.visible = false;
    update = true;
}