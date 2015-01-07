using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRBasic
{
    [Serializable]
    public class GameCard
    {
        public int num;

        public GameCard(int num)
        {
            this.num = num;
        }

        public int getSuit()
        {
            return num%13;
        }

        public int getValue()
        {
            return num/13 + 1;
        }
    }
}