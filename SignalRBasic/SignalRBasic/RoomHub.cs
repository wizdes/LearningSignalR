using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace SignalRBasic
{
    public class RoomHub : Hub
    {
        public static Dictionary<string, List<string>> roomData = new Dictionary<string, List<string>>();

        public static Dictionary<string, string> clientIdToName = new Dictionary<string, string>(); 

        public void SetName(string connectionID, string name)
        {
            clientIdToName[connectionID] = name;
        }

        public void JoinRoom(string connectionID, string group)
        {
            
        }

        public void LeaveRoom(string connectionID, string group)
        {
            
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
            return null;
        } 
    }
}