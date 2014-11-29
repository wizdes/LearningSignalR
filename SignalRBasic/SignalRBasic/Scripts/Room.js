$(function () {
    var hub;
    $.connection.hub.start().done(function() {
        hub = $.connection.roomHub;
        listUsers();
    });
    hub = $.connection.roomHub;

    hub.client.broadcastMessage = function(name) {
        $("#listInfo").append("<div class=\"" + name + "\"><p>" + name + "</p></div>");
    };

    function addUser(name) {
        var hub = $.connection.roomHub;
        hub.server.setName(hub.connection.id, name);
    };

    function listUsers() {
        hub.server.listUsers().done(function(result) { result.forEach(addToParagraph); });
    };

    hub.client.deleteUser = function (name) {
        $("." + name).remove();
    };

    function addToParagraph(value, index, ar) {
        $("#listInfo").append("<div class=\""+value+"\"><p>" + value + "</p></div>");
    };

    $("#AddName").click(function () {
        var value2 = $("#nickname");
        addUser(value2.val());
        $("#nickname").val('');
    });

    $("#StartChat").click(function () {
        hub.server.createChat("");
    });

    $("#JoinChat").click(function () {
        var value2 = $("#chatName").val();
        hub.server.joinRoom(value2);
    });

    $("#LeaveChat").click(function () {
        var value2 = $("#chatName").val();
        hub.server.leaveRoom(value2);
    });
});