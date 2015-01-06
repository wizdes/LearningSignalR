using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace SignalRBasic
{
    public class RoomHub : Hub
    {
        public static Dictionary<string, string> rooms = new Dictionary<string, string>();

        public static Dictionary<string, string> clientIdToName = new Dictionary<string, string>();

        public static Dictionary<string, string> nameToClientId = new Dictionary<string, string>(); 

        public void SetName(string connectionID, string name)
        {
            clientIdToName[connectionID] = name;
            nameToClientId[name] = connectionID;
            Clients.Others.BroadcastMessage(":::NEW USER:::!" + name);
        }

        public void sendMessage(string message)
        {
            var hubcontext = GlobalHost.ConnectionManager.GetHubContext<RoomHub>();
            hubcontext.Clients.Group(rooms[Context.ConnectionId]).BroadcastMessage(message);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            if (stopCalled)
            {
                string name = "";
                try
                {
                    name = clientIdToName[Context.ConnectionId];
                }
                catch (Exception)
                {
                    return base.OnDisconnected(stopCalled);
                }
                nameToClientId.Remove(clientIdToName[Context.ConnectionId]);
                clientIdToName.Remove(Context.ConnectionId);
                Clients.Others.DeleteUser(name);
            }

            return base.OnDisconnected(stopCalled);
        }

        public string CreateChat(string userId)
        {
            // the optional userId parameter denotes the 'chat with' user
            string groupname = Guid.NewGuid().ToString();
            Groups.Add(Context.ConnectionId, groupname);
            rooms.Add(Context.ConnectionId, groupname);
            if (!string.IsNullOrEmpty(userId))
            {
                Groups.Add(nameToClientId[userId], groupname);
                rooms.Add(nameToClientId[userId], groupname);
            }

            var hubcontext = GlobalHost.ConnectionManager.GetHubContext<RoomHub>();
            hubcontext.Clients.Group(groupname).BroadcastMessage("Joined group: " + groupname + ".");
            Clients.Others.AddGameToClients(groupname);
            return groupname;
        }

        public void JoinRoom(string groupname)
        {
            Groups.Add(Context.ConnectionId, groupname);
            rooms.Add(Context.ConnectionId, groupname);
            var hubcontext = GlobalHost.ConnectionManager.GetHubContext<RoomHub>();
            hubcontext.Clients.Group(groupname).BroadcastMessage("Joined group: " + groupname + ".");
        }

        public void LeaveRoom(string groupname)
        {
            Groups.Remove(Context.ConnectionId, groupname);
            rooms.Remove(Context.ConnectionId);
            var hubcontext = GlobalHost.ConnectionManager.GetHubContext<RoomHub>();
            hubcontext.Clients.Group(groupname).BroadcastMessage("Removed user from group: " + groupname + ".");
        }

        public IList<string> ListUsers()
        {
            return clientIdToName.Values.ToList();
        } 

        public IList<string> ListGroup()
        {
            return null;
        }

        public IList<string> ListPeopleInGroup()
        {
            //lists the people in my group
            string groupName = rooms[Context.ConnectionId];
            List<string> usersInGroup =
                rooms.Keys.ToList().Where(userConnectionId => rooms[userConnectionId] == groupName).ToList();

            return usersInGroup.Select(user => clientIdToName[user]).ToList();
        }

        public void BroadcastAddUserToGroup(string username)
        {
            // when a user joins a group, let the people in the group know he joined
            return;
        }

        public Task BroadcastAddUser(string username)
        {
            return Clients.Others.AddUser(username);
        }

        public void SendGameMessage(string message)
        {
            if (message.Equals("Play"))
            {
                string groupName = rooms[Context.ConnectionId];
                var hubcontext = GlobalHost.ConnectionManager.GetHubContext<RoomHub>();
                hubcontext.Clients.Group(groupName).initAddCards(null);
            }
            //let's make this comma delimited messages as well
        }
    }
}