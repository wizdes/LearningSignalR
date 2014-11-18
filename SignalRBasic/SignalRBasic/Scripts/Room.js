$(function () {
    var hub;
    $.connection.hub.start().done(function () { alert("Connected!"); hub = $.connection.roomHub; });
    hub = $.connection.roomHub;

    function addUser(name) {
        var hub = $.connection.roomHub;
        hub.server.setName(hub.connection.id, name);
    }

    function listUsers() {
        hub.server.listUsers().done(function(result) { result.forEach(addToParagraph); });
    }

    function addToParagraph(value, index, ar) {
        $("#listInfo").append("<p>" + value + "</p>");
    }

    $("#Submit").click(function () {
        var value2 = $("#nickname");
        addUser(value2.val());
    });

    $("#Submit2").click(function () {
        listUsers();
    });
});