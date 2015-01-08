var windowFocus = true;
var username;
var originalTitle;
var blinkOrder = 0;
var hub;
var openedConversations = [];

$(function () {
    $.connection.hub.start().done(function () {
        hub = $.connection.roomHub;
        listUsers();
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

    hub.client.removeGameToClients = function (name) {
        $("." + name).remove();
    }

    hub.client.deleteUser = function (name) {
        $("." + name).remove();
    };

    hub.client.initAddCards = function (cardsAdded) {
        var jsonObject = JSON.parse(cardsAdded);
        cleanupLobbyPage();
        initGamePage();
    };

    hub.client.cardAction = function(cardActionString) {

    };

    function addUser(name) {
        var hub = $.connection.roomHub;
        hub.server.setName(hub.connection.id, name);
        username = name;
    };

    function listUsers() {
        hub.server.listUsers().done(function (result) { result.forEach(addToParagraph); });
    };

    $("#AddName").click(function () {
        var value2 = $("#LoggedInName");
        addUser(value2.val());
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