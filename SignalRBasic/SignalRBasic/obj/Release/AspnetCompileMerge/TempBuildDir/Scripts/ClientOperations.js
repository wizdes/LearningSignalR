﻿$(function() {
    // these are handlers that are set up when the page initializes
    $("#StartChat").click(function() {
        hub.server.createChat("");
        chatWith("chatbox");
    });

    $("#sendMessage").click(function() {
        hub.server.sendMessage($("#messageText").val());
    });

    $("#JoinChat").click(function() {
        var value2 = $("#chatName").val();
        hub.server.joinRoom(value2);
        hub.server.broadcastAddUserToGroup(value2);
        chatWith("chatbox");
    });

    $("#CreateGame").click(function () {
        hub.server.createChat("");
        playerNum = 1;
        setupLobby();
    });

    $("#PlayGame").click(function () {
        hub.server.sendGameMessage("Play");
    });

    $("#LeaveChat").click(function() {
        var value2 = $("#chatName").val();
        hub.server.leaveRoom(value2);
    });

    $("#scrollbox1").scrollbar({
        height: 355,
        axis: 'y'
    });
});

function sendCard(cardnum) {
    hub.server.sendGameMessage("Card:" + playerNum + ":" + cardnum);
}

function listUsersForMyGroup() {
    hub.server.listPeopleInGroup().done(function (result) {
        result.forEach(function (entry) {
            $('#playersInGroup').append("<li>" + entry + "</li>");
        });
    });
}

function setupLobby() {
    cleanMainPage();
    initLobbyPage();
    listUsersForMyGroup();
}

function addToParagraph(value, index, ar) {
    $("#onlineUsers").append("<li class=\"" + value + "\"><a href=\"#\">" + value + "</a></li>");
    $("." + value).click(value, clickUserHandler);
};

function clickUserHandler() {
    // create a function here to "give an option to join"
    // maybe create a balloon with a button to create a game
}

function clickGroupHandler() {
    // join a group
    var val = $(this);
    var valName = val[0].innerText.trim();
    hub.server.joinRoom(valName).done(function(result) {
        playerNum = result;
        setupLobby();
        hub.server.broadcastAddUserToGroup($("#LoggedInName").val());
    });
}

