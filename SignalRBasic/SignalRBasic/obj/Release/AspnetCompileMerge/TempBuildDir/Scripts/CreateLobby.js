var groupLobbyContainer;

function initLobbyPage() {
    //graphics part
    groupLobbyContainer = new createjs.Container();
    gameStage.addChild(groupLobbyContainer);

    $("#TitleText").html("Euchre With Friends - Lobby\n" + " Player: " + playerNum);

    groupLobbyContent = new createjs.DOMElement("GroupLobbyInfo");
    groupLobbyContent.visible = true;

    groupLobbyContainer.addChild(groupLobbyContent);
    groupLobbyContainer.x = window.innerWidth / 2 - 50;
    groupLobbyContainer.y = 105;

    $("#GroupLobbyInfo").show();

    gameStage.update();

    //server side part
    // call a 'get users in group' from server
    // populate the GroupLobbyContent
}

function cleanupLobbyPage() {
    groupLobbyContainer.visible = false;
    update = true;
}