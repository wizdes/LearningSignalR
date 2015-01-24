/*!
 * ASP.NET SignalR JavaScript Library v2.1.2
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies['roomHub'] = this.createHubProxy('roomHub'); 
        proxies['roomHub'].client = { };
        proxies['roomHub'].server = {
            broadcastAddUser: function (username) {
            /// <summary>Calls the BroadcastAddUser method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
            /// <param name=\"username\" type=\"String\">Server side type is System.String</param>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["BroadcastAddUser"], $.makeArray(arguments)));
             },

            broadcastAddUserToGroup: function (username) {
            /// <summary>Calls the BroadcastAddUserToGroup method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
            /// <param name=\"username\" type=\"String\">Server side type is System.String</param>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["BroadcastAddUserToGroup"], $.makeArray(arguments)));
             },

            createChat: function (userId) {
            /// <summary>Calls the CreateChat method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
            /// <param name=\"userId\" type=\"String\">Server side type is System.String</param>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["CreateChat"], $.makeArray(arguments)));
             },

            joinRoom: function (groupname) {
            /// <summary>Calls the JoinRoom method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
            /// <param name=\"groupname\" type=\"String\">Server side type is System.String</param>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["JoinRoom"], $.makeArray(arguments)));
             },

            leaveRoom: function (groupname) {
            /// <summary>Calls the LeaveRoom method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
            /// <param name=\"groupname\" type=\"String\">Server side type is System.String</param>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["LeaveRoom"], $.makeArray(arguments)));
             },

            listGroup: function () {
            /// <summary>Calls the ListGroup method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["ListGroup"], $.makeArray(arguments)));
             },

            listPeopleInGroup: function () {
            /// <summary>Calls the ListPeopleInGroup method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["ListPeopleInGroup"], $.makeArray(arguments)));
             },

            listUsers: function () {
            /// <summary>Calls the ListUsers method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["ListUsers"], $.makeArray(arguments)));
             },

            sendGameMessage: function (message) {
            /// <summary>Calls the SendGameMessage method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
            /// <param name=\"message\" type=\"String\">Server side type is System.String</param>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["SendGameMessage"], $.makeArray(arguments)));
             },

            sendMessage: function (message) {
            /// <summary>Calls the sendMessage method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
            /// <param name=\"message\" type=\"String\">Server side type is System.String</param>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["sendMessage"], $.makeArray(arguments)));
             },

            setName: function (connectionID, name) {
            /// <summary>Calls the SetName method on the server-side RoomHub hub.&#10;Returns a jQuery.Deferred() promise.</summary>
            /// <param name=\"connectionID\" type=\"String\">Server side type is System.String</param>
            /// <param name=\"name\" type=\"String\">Server side type is System.String</param>
                return proxies['roomHub'].invoke.apply(proxies['roomHub'], $.merge(["SetName"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));