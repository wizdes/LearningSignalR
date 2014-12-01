var windowFocus = true;
var username;
var originalTitle;
var blinkOrder = 0;
var hub;

$(function () {
    $.connection.hub.start().done(function() {
        hub = $.connection.roomHub;
        listUsers();
    });
    hub = $.connection.roomHub;

    function handler(message) {
        var val = $(this);
        alert(val[0].innerText);
    }

    hub.client.broadcastMessage = function(message) {
        $("#onlineUsers").append("<li class=\"" + message + "\"><a href=\"#\">" + message + "</a></li>");
        $("." + message).click(JSON.stringify({name:message}),handler);
        if (message.indexOf("Joined group") == -1) {
            addToMessage("chatbox", "otherperson", message);
        }
    };

    function addUser(name) {
        var hub = $.connection.roomHub;
        hub.server.setName(hub.connection.id, name);
        username = name;
    };

    function listUsers() {
        hub.server.listUsers().done(function(result) { result.forEach(addToParagraph); });
    };

    hub.client.deleteUser = function (name) {
        $("." + name).remove();
    };

    function addToParagraph(value, index, ar) {
        $("#onlineUsers").append("<li class=\"" + value + "\"><a href=\"#\">" + value + "</a></li>");
        $("." + value).click(value, handler);
    };

    $("#AddName").click(function () {
        var value2 = $("#nickname");
        addUser(value2.val());
        $(this).prop("disabled", true);
        $(this).val("Logged in as " + value2.val());
        $("#nickname").hide();
    });

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


    function chatWith(chatuser) {
        createChatBox(chatuser);
        $("#chatbox_" + chatuser + " .chatboxtextarea").focus();
    }

    function createChatBox(chatboxtitle, minimizeChatBox) {
        if ($("#chatbox_" + chatboxtitle).length > 0) {
            if ($("#chatbox_" + chatboxtitle).css('display') == 'none') {
                $("#chatbox_" + chatboxtitle).css('display', 'block');
                restructureChatBoxes();
            }
            $("#chatbox_" + chatboxtitle + " .chatboxtextarea").focus();
            return;
        }

        $(" <div />").attr("id", "chatbox_" + chatboxtitle)
        .addClass("chatbox")
        .html('<div class="chatboxhead"><div class="chatboxtitle">' + chatboxtitle + '</div><div class="chatboxoptions"><a href="javascript:void(0)" onclick="javascript:toggleChatBoxGrowth(\'' + chatboxtitle + '\')">-</a> <a href="javascript:void(0)" onclick="javascript:closeChatBox(\'' + chatboxtitle + '\')">X</a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="chatboxinput"><textarea class="chatboxtextarea" onkeydown="javascript:return checkChatBoxInputKey(event,this,\'' + chatboxtitle + '\');"></textarea></div>')
        .appendTo($("body"));

        $("#chatbox_" + chatboxtitle).css('bottom', '0px');

        chatBoxeslength = 0;

        for (x in chatBoxes) {
            if ($("#chatbox_" + chatBoxes[x]).css('display') != 'none') {
                chatBoxeslength++;
            }
        }

        if (chatBoxeslength == 0) {
            $("#chatbox_" + chatboxtitle).css('right', '20px');
        } else {
            width = (chatBoxeslength) * (225 + 7) + 20;
            $("#chatbox_" + chatboxtitle).css('right', width + 'px');
        }

        chatBoxes.push(chatboxtitle);

        if (minimizeChatBox == 1) {
            minimizedChatBoxes = new Array();

            if ($.cookie('chatbox_minimized')) {
                minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
            }
            minimize = 0;
            for (j = 0; j < minimizedChatBoxes.length; j++) {
                if (minimizedChatBoxes[j] == chatboxtitle) {
                    minimize = 1;
                }
            }

            if (minimize == 1) {
                $('#chatbox_' + chatboxtitle + ' .chatboxcontent').css('display', 'none');
                $('#chatbox_' + chatboxtitle + ' .chatboxinput').css('display', 'none');
            }
        }

        chatboxFocus[chatboxtitle] = false;

        $("#chatbox_" + chatboxtitle + " .chatboxtextarea").blur(function () {
            chatboxFocus[chatboxtitle] = false;
            $("#chatbox_" + chatboxtitle + " .chatboxtextarea").removeClass('chatboxtextareaselected');
        }).focus(function () {
            chatboxFocus[chatboxtitle] = true;
            newMessages[chatboxtitle] = false;
            $('#chatbox_' + chatboxtitle + ' .chatboxhead').removeClass('chatboxblink');
            $("#chatbox_" + chatboxtitle + " .chatboxtextarea").addClass('chatboxtextareaselected');
        });

        $("#chatbox_" + chatboxtitle).click(function () {
            if ($('#chatbox_' + chatboxtitle + ' .chatboxcontent').css('display') != 'none') {
                $("#chatbox_" + chatboxtitle + " .chatboxtextarea").focus();
            }
        });

        $("#chatbox_" + chatboxtitle).show();
    }
});

function addToMessage(chatboxtitle, username, message) {
    $("#chatbox_" + chatboxtitle + " .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + username + ':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">' + message + '</span></div>');
}

function checkChatBoxInputKey(event, chatboxtextarea, chatboxtitle) {

    if (event.keyCode == 13 && event.shiftKey == 0) {
        message = $(chatboxtextarea).val();
        message = message.replace(/^\s+|\s+$/g, "");

        $(chatboxtextarea).val('');
        $(chatboxtextarea).focus();
        $(chatboxtextarea).css('height', '44px');
        if (message != '') {
            message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
            hub.server.sendMessage(message);
            $("#chatbox_" + chatboxtitle + " .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + username + ':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">' + message + '</span></div>');
            $("#chatbox_" + chatboxtitle + " .chatboxcontent").scrollTop($("#chatbox_" + chatboxtitle + " .chatboxcontent")[0].scrollHeight);
        }

        return false;
    }

    var adjustedHeight = chatboxtextarea.clientHeight;
    var maxHeight = 94;

    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > chatboxtextarea.clientHeight)
            $(chatboxtextarea).css('height', adjustedHeight + 8 + 'px');
    } else {
        $(chatboxtextarea).css('overflow', 'auto');
    }
}

function closeChatBox(chatboxtitle) {
    $('#chatbox_' + chatboxtitle).css('display', 'none');
    var value2 = $("#chatName").val();
    hub.server.leaveRoom(value2);
    restructureChatBoxes();
}
