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

    function handler() {
        var val = $(this);
        var valName = val[0].innerText;
        hub.server.createChat(valName);
        chatWith(valName);
    }

    hub.client.broadcastMessage = function (message) {
        if (message.indexOf(":::NEW USER:::!") != -1) {
            var res = message.split(":::!");
            var newUserName = res[1];
            $("#onlineUsers").append("<li class=\"" + newUserName + "\"><a href=\"#\">" + newUserName + "</a></li>");
            $("." + newUserName).click(handler);
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

    function addUser(name) {
        var hub = $.connection.roomHub;
        hub.server.setName(hub.connection.id, name);
        username = name;
    };

    function listUsers() {
        hub.server.listUsers().done(function (result) { result.forEach(addToParagraph); });
    };

    hub.client.deleteUser = function (name) {
        $("." + name).remove();
    };

    $("#AddName").click(function () {
        var value2 = $("#nickname");
        addUser(value2.val());
        $(this).prop("disabled", true);
        $(this).val("Logged in as " + value2.val());
        $("#nickname").hide();
    });
});


function chatWith(chatuser) {
    openedConversations.push(chatuser);
    createChatBox(chatuser);
    $("#chatbox_" + chatuser + " .chatboxtextarea").focus();
}