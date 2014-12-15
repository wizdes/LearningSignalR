function initLobbyPage() {
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

function cleanupLobbyPage() {
    
}