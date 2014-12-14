$("#StartChat").click(function () {
    hub.server.createChat("");
    chatWith("chatbox");
});

$("#sendMessage").click(function () {
    hub.server.sendMessage($("#messageText").val());
});

$("#JoinChat").click(function () {
    var value2 = $("#chatName").val();
    hub.server.joinRoom(value2);
    chatWith("chatbox");
});

$("#LeaveChat").click(function () {
    var value2 = $("#chatName").val();
    hub.server.leaveRoom(value2);
});

function addToParagraph(value, index, ar) {
    $("#onlineUsers").append("<li class=\"" + value + "\"><a href=\"#\">" + value + "</a></li>");
    $("." + value).click(value, handler);
};

function handler() {
    // create a function here to "give an option to join"
    // maybe create a balloon with a button to create a game
}

