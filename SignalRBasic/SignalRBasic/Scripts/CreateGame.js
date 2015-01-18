var img;
var imgArray;

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
    }

    for (i = 0; i < 5; i++) {
        bmp = new createjs.Bitmap(cardBackImage);
        // this assumes hand count of 5
        bmp.x = 50;
        bmp.y = gameStage.canvas.height / 6 + 2 * gameStage.canvas.height / 15 * i;
        bmp.scaleX = bmp.scaleY = 0.32;
        gameStage.addChild(bmp);
    }

    for (i = 0; i < 5; i++) {
        bmp = new createjs.Bitmap(cardBackImage);
        // this assumes hand count of 5
        bmp.x = gameStage.canvas.width - 50 - 130;
        bmp.y = gameStage.canvas.height / 6 + 2* gameStage.canvas.height / 15 * i;
        bmp.scaleX = bmp.scaleY = 0.32;
        gameStage.addChild(bmp);
    }
}

indexToBMP = [];

function initGamePage(cardList) {
    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }

    imgArray = [];

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

        if (!shouldShow) {
            continue;
        }

        bmp = new createjs.Bitmap(imgArray[i]);
        // this assumes hand count of 5
        bmp.x = gameStage.canvas.width/4 + gameStage.canvas.width /10 * handiter;
        bmp.y = gameStage.canvas.height - 175;
        bmp.scaleX = bmp.scaleY = 0.18;
        //130 - 70  

        handiter = handiter + 1;

        // using "on" binds the listener to the scope of the currentTarget by default
        // in this case that means it executes in the scope of the button.
        bmp.on("mousedown", function (evt) {
            this.parent.addChild(this);
            this.x = gameStage.canvas.width/2;
            this.y = gameStage.canvas.height/2;
            this.visible = true;
            update = true;
            sendCard(indexToBMP.indexOf(this));
        });

        indexToBMP[i] = bmp;

        gameStage.addChild(bmp);
    }

    update = true;
}