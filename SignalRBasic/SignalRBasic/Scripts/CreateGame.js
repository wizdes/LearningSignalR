var img;
var stage;
var imgArray;

function initGamePage() {
    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }

    var canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas);


    imgArray = [];

    // enable touch interactions if supported on the current device:
    createjs.Touch.enable(stage);

    // enabled mouse over / out events
    stage.enableMouseOver(10);
    //stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

    for (i = 0; i < 52; i++) {
        imgLoader = new Image();
        fileStringName = "Resources/";
        fileStringName = fileStringName + GetCardName(i) + ".png";
        imgLoader.src = fileStringName;
        imgArray[i] = imgLoader;
    }

    for (i = 0; i < 52; i++) {
        bmp = new createjs.Bitmap(imgArray[i]);
        bmp.x = 5 + canvas.width / 13 * (i % 13);
        bmp.y = 5 + canvas.height / 5 * Math.floor(i / 13);
        bmp.scaleX = bmp.scaleY = 0.18;

        // using "on" binds the listener to the scope of the currentTarget by default
        // in this case that means it executes in the scope of the button.
        bmp.on("mousedown", function (evt) {
            this.parent.addChild(this);
            this.x = 5;
            this.y = 620;
            this.visible = true;
            update = true;
        });

        stage.addChild(bmp);
    }

    update = true;
}