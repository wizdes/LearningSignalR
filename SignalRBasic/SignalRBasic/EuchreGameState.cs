using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRBasic
{
    [Serializable]
    public class EuchreGameState
    {
        static List<int> listOfCards = new List<int>()
            {
                0, 8, 9, 10, 11, 12,
                13, 21, 22, 23, 24, 25,
                26, 34, 35, 36, 37, 38,
                39, 47, 48, 49, 50, 51
            };

        //player cards (list of a of list of ints)
        public ArrayList playerCards;

        //cards in the middle (list of ints)

        //cards that were discarded (list of ints)

        //card to potentially pick up (int)
        public GameCard cardToPickup;

        //enum denoting game state (euchre-pickup, euchre-trump-pick, euchre-game)

        //int denoting the turns (int)

        //int denoting the number of rounds

        public EuchreGameState()
        {
            var listOfCardObjects = new List<GameCard>();
            foreach (int cardnum in listOfCards)
            {
                listOfCardObjects.Add(new GameCard(cardnum));
            }

            Shuffle(listOfCardObjects);

            playerCards = new ArrayList();

            for (int i = 0; i < 4; i++)
            {
                playerCards.Add(new ArrayList());

                for (int j = 0; j < 5; j++)
                {
                    ArrayList cardList = (ArrayList) playerCards[i];
                    cardList.Add(listOfCardObjects[5 * i + j]);
                }
            }
            cardToPickup = listOfCardObjects[20];
        }

        public void playCard(int playerNum, int cardNum)
        {
        }

        //utility functions
        public static void Shuffle<T>(List<T> list)
        {
            Random rng = new Random();
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                T swapValue = list[k];
                list[k] = list[n];
                list[n] = swapValue;
            }
        }
    }
}