var windowFocus = true;
var username;
var originalTitle;
var blinkOrder = 0;
var hub;
var openedConversations = [];

$(function () {
    $.connection.hub.start().done(function () {
        hub = $.connection.roomHub;
        listUsersAndGames();
    });
    hub = $.connection.roomHub;

    hub.client.broadcastMessage = function (message) {
        if (message.indexOf(":::NEW USER:::!") != -1) {
            var res = message.split(":::!");
            var newUserName = res[1];
            $("#onlineUsers").append("<li class=\"" + newUserName + "\"><a href=\"#\">" + newUserName + "</a></li>");
            $("." + newUserName).click(clickUserHandler);
            return;
        }
        if (message.indexOf("Joined group") == -1) {
            var res = message.split(":::!");
            var otherUsername = res[0];
            var messageGiven = res[1];

            if (openedConversations.length == 0) {
                chatWith(otherUsername);
            }
            addToMessage(otherUsername, otherUsername, messageGiven);
        }
    };

    hub.client.addGameToClients = function (name) {
        $('#onlineGames').append("<li class=\"" + name + "\"><a href=\"#\">" + name + "</a></li>");
        $("." + name).click(clickGroupHandler);
    }

    function addToGameParagraph(name) {
        $('#onlineGames').append("<li class=\"" + name + "\"><a href=\"#\">" + name + "</a></li>");
        $("." + name).click(clickGroupHandler);
    }

    hub.client.removeGameToClients = function (name) {
        $("." + name).remove();
    }

    hub.client.deleteUser = function (name) {
        $("." + name).remove();
    };

    hub.client.initAddCards = function (cardsAdded) {
        var jsonObject = JSON.parse(cardsAdded);
        cleanupLobbyPage();
        initGamePage(jsonObject.playerCards[playerNum - 1], jsonObject.cardToPickup);
    };

    hub.client.playCard = function(playerNum, cardNum) {
        playCard(playerNum, cardNum);
    };

    hub.client.changeState = function(cardString) {
        if (cardString == "trump") {
            if (playerNum == 1) {
                enterTrumpState(true);
            }
        } else if(cardString == "play") {
            enterPlayCardState(true);
        }
    };

    hub.client.changeTurn = function(cardString) {
        if (euchreGameStage == "drawStage") {
            if (cardString == playerNum) {
                enterPickState(true);
            }
        }
        else if (euchreGameStage == "trumpStage") {
            if (cardString == playerNum) {
                enterTrumpState(true);
            }
        }
    };

    hub.client.cardAction = function(cardActionString) {

    };

    hub.client.addUserToLobby = function(value) {
        $('#playersInGroup').append("<li>" + value + "</li>");
    }

    function addUser(name) {
        var hub = $.connection.roomHub;
        hub.server.setName(hub.connection.id, name);
        username = name;
    };

    function listUsersAndGames() {
        hub.server.listUsers().done(function (result) { result.forEach(addToParagraph); });
        hub.server.listGroup().done(function (result) { result.forEach(addToGameParagraph); });
    };

    $("#AddName").click(function () {
        var value2 = $("#LoggedInName");
        addUser(value2.val());
        playerName = value2.val();
        $(this).prop("disabled", true);
        $(this).val("Logged in as " + value2.val());
        $("#LoggedInName").hide();
        $("#CreateGame").show();
    });
});

function chatWith(chatuser) {
    openedConversations.push(chatuser);
    createChatBox(chatuser);
    $("#chatbox_" + chatuser + " .chatboxtextarea").focus();
}