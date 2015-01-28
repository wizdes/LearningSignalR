var img;
var imgArray;
var bmpPlayerLeft = [];
var bmpPlayerUp = [];
var bmpPlayerRight = [];
var euchreGameStage;

function setupOtherUsers() {
    cardBackImage = new Image();
    cardBackImage.src = "Resources/cardBack.jpg";

    for (i = 0; i < 5; i++) {
        bmp = new createjs.Bitmap(cardBackImage);
        // this assumes hand count of 5
        bmp.x = gameStage.canvas.width / 4 + gameStage.canvas.width / 10 * i;
        bmp.y = 140;
        bmp.scaleX = bmp.scaleY = 0.32;
        gameStage.addChild(bmp);
        bmpPlayerUp[i] = bmp;
    }

    for (i = 0; i < 5; i++) {
        bmp = new createjs.Bitmap(cardBackImage);
        // this assumes hand count of 5
        bmp.x = 50;
        bmp.y = gameStage.canvas.height / 6 + 2 * gameStage.canvas.height / 15 * i;
        bmp.scaleX = bmp.scaleY = 0.32;
        gameStage.addChild(bmp);
        bmpPlayerLeft[i] = bmp;
    }

    for (i = 0; i < 5; i++) {
        bmp = new createjs.Bitmap(cardBackImage);
        // this assumes hand count of 5
        bmp.x = gameStage.canvas.width - 50 - 130;
        bmp.y = gameStage.canvas.height / 6 + 2* gameStage.canvas.height / 15 * i;
        bmp.scaleX = bmp.scaleY = 0.32;
        gameStage.addChild(bmp);
        bmpPlayerRight[i] = bmp;
    }
}

indexToBMP = [];

function playCard(otherPlayerNum, playerCard) {
    // remove the card from the player
    var diff = otherPlayerNum - playerNum;
    if (diff < 0) diff = 4 + diff;
    if (diff == 1) {
        bmpPlayerLeft[bmpPlayerLeft.length - 1].visible = false;
        bmpPlayerLeft.pop();
    }
    if (diff == 2) {
        bmpPlayerUp[bmpPlayerUp.length - 1].visible = false;
        bmpPlayerUp.pop();
    }
    if (diff == 3) {
        bmpPlayerRight[bmpPlayerRight.length - 1].visible = false;
        bmpPlayerRight.pop();
    }
    if (diff == 0) {
        return;
    }

    // place that card in the middle
    indexToBMP[playerCard].visible = true;
    var val = -1;
    if (diff >= 2) {
        val = 1;
    }
    indexToBMP[playerCard].x = gameStage.canvas.width / 2 + (diff % 2) * 100 * val;
    indexToBMP[playerCard].y = gameStage.canvas.height / 2 - ((diff + 1) % 2) * 130 * val;

    gameStage.addChild(indexToBMP[playerCard]);

    update = true;
}

function enterPickState() {
    // clear existing buttons (should be none)
    euchreGameStage = "drawStage";

    drawButton(gameStage, "Resources/pickUpButton.png", 300, 350, cardPickedUp);
    drawButton(gameStage, "Resources/passButton.png", 300, 420, cardPassed);

    // display the middle card 2
}

function enterTrumpState() {
    euchreGameStage = "trumpStage";
    // clear buttons (from pick state) 1

    // create an input field for the suit 7

    drawButton(gameStage, "Resources/pickSuitButton.png", 310, 350, suitChosen);
    drawButton(gameStage, "Resources/passButton.png", 300, 420, cardPassed);
}

function enterPlayCardState() {
    // clear buttons (from either pick or trump state) 1
}

function cardPickedUp() {
    // update cards 3

    // do a switch with one in the hand 3

    // update the cards in hand 3

    // send the server request to make everyone go to play state 4

    enterPlayCardState();
}

function cardPassed() {
    if (euchreGameStage == "drawStage") {
        if (lastUser) {
            // send the server request to go to trump state 6
            enterTrumpState();
        } else {
            // send the server request to go to pass state for next user 5
        }
    }
    else if (euchreGameStage == "trumpStage") {
        if (lastUser) {
            //do not accept the last user 9
            // essentially, do nothing
        } else {
            // send the server request to go to pass state for next user 8
        }
    }
}

function suitChosen() {
    euchreGameStage = "playStage";
    enterPlayCardState();
}

function initGamePage(cardList) {
    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }

    imgArray = [];

    euchreGameStage = "drawStage";

    $("#TitleText").html("Euchre With Friends - Game");

    // enable touch interactions if supported on the current device:
    createjs.Touch.enable(gameStage);

    // enabled mouse over / out events
    gameStage.enableMouseOver(10);
    //stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

    for (i = 0; i < 52; i++) {
        imgLoader = new Image();
        fileStringName = "Resources/";
        fileStringName = fileStringName + GetCardName(i) + ".png";
        imgLoader.src = fileStringName;
        imgArray[i] = imgLoader;
    }

    handiter = 0;

    setupOtherUsers();

    for (i = 0; i < 52; i++) {
        var shouldShow = false;
        for (j = 0; j < cardList.length; j++) {
            if (cardList[j].num == i) {
                shouldShow = true;
            }
        }

        bmp = new createjs.Bitmap(imgArray[i]);
        // this assumes hand count of 5
        bmp.x = gameStage.canvas.width/4 + gameStage.canvas.width /10 * handiter;
        bmp.y = gameStage.canvas.height - 175;
        bmp.scaleX = bmp.scaleY = 0.18;
        //130 - 70  

        indexToBMP[i] = bmp;

        if (!shouldShow) {
            bmp.visible = false;
            continue;
        }

        handiter = handiter + 1;

        // using "on" binds the listener to the scope of the currentTarget by default
        // in this case that means it executes in the scope of the button

        //evt.target is how to reference the event's target
        // update the sendCard call to do this

        bmp.on("mousedown", function (evt) {
            if (euchreGameStage == "drawStage") {

            }else if (euchreGameStage == "trumpStage") {
                // do nothing.
            }else {
                this.parent.addChild(this);
                this.x = gameStage.canvas.width / 2;
                this.y = gameStage.canvas.height / 2;
                this.visible = true;
                update = true;
                sendCard(indexToBMP.indexOf(this));
            }
        });

        gameStage.addChild(bmp);

    }

    enterPickState();

    update = true;
}

//draws buttons (200x50, 3 frames)
function drawButton(gameStage, imageSrc, xLocation, yLocation, handler) {
    var image = new Image();
    image.src = imageSrc;

    //passButton.png
    //pickSuitButton.png
    var spriteSheet = new createjs.SpriteSheet({
        images: [image],
        frames: { width: 200, height: 50, count: 3 },
        animations: { out: 0, over: 1, down: 2 }
    });
    var bitmapButton = new createjs.Sprite(spriteSheet, "up");
    gameStage.addChild(bitmapButton).set({ x: xLocation, y: yLocation });
    var bitmapHelper = new createjs.ButtonHelper(bitmapButton);
    // make the buttons clickable

    // maybe pass the button helper too
    //bitmapHelper is used to make actions with the click

    if(handler != null)
    {
        bitmapHelper.on("click", handler);
    }
}