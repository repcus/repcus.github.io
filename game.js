    let canvasWidth = 640;
    let controlCanvasWidth = canvasWidth/5;
    let canvasHeight = 480;
    let ballRadius = 8;
    let score = 0;
    let scoreB = 0;
    let platformHorizontal;
    let platformVertical = null;
    let speed = 4;
    let ballSpeed = speed - 2;
    let isGamePaused = true;
    let isGameEnded = false;
    const rows = 3;
    const columns = 10;
    const blockCount = rows * columns;
    let blockArr = new Array(blockCount);
    const blockWidth = 50;
    const blockHeight = 20;
    let ballX = randomNum(canvasWidth * 0.2, canvasWidth * 0.8);
    let ballY = randomNum(blockHeight * rows + rows, canvasHeight * 0.5);
    let platformHorW = 128;
    let platformHorH = 23;
    let platformHorY = canvasHeight - platformHorH;
    let platformHorX = canvasWidth / 2 - platformHorW / 2;
    let platformVerX = 0;
    let platformVerY = canvasHeight / 2;
    let platformVerW = 23;
    let platformVerH = 128;
    let scoreMultiplier = 1;
    let time = 0;
    let poppedBlocks;
    let balls = [];
    let ballsCount = 1;
    let gameMode;
    let bonusRand = ["x2", "x5", "long", "short", "change"];
    let bonusWidth = 20;
    let flyingBonuses = [];
    let flyingBonusCounter = 0;
    let activeBonuses = [];
    let activeBonusesCounter = 0;
    let areKeysReversed = false;
    function startGame() {
        gameMode = "falling";
        time = 0;
        flyingBonuses = [];
        flyingBonusCounter = 0;
        activeBonuses = [];
        activeBonusesCounter = 0;
        areKeysReversed = false;

        //mobile checker source http://detectmobilebrowsers.com/
        window.mobileCheck = function() {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series([46])0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br([ev])w|bumb|bw-([nu])|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do([cp])o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly([-_])|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-\/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja([tv])a|jbro|jemu|jigs|kddi|keji|kgt([ \/])|klon|kpt |kwc-|kyo([ck])|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30([02])|n50([025])|n7(0([01])|10)|ne(([cm])-|on|tf|wf|wg|wt)|nok([6i])|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([-01])|47|mc|nd|ri)|sgh-|shar|sie([-m])|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel([im])|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c([- ])|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };
        platformHorizontal = null;
        platformVertical = null;
        poppedBlocks = null;
        poppedBlocks= [];
        platformHorizontal = new Platform(platformHorW, platformHorH, "magenta",
            platformHorX, platformHorY, speed, "images/platformh.png");
        if(askIfVertical()){
            platformVertical = new Platform(platformVerW, platformVerH, "cyan",
                platformVerX, platformVerY, speed, "images/platformv.png");
        }
        if(checkGameMode()){
            gameMode = "endless";
        }
        balls.push(new Ball(ballRadius, ballSpeed, ballX, ballY));
        if(ballsCount !== 1){
            ballsCount = 1;
        }
        let blockCounter = 0;
        let tempBlockColChecker = blockWidth;
        let blockColChecker = blockWidth;
        if(platformVertical){
            do{
                tempBlockColChecker -= blockWidth;
                blockColChecker += blockWidth;
            }while(platformVertical.width > blockColChecker);
        }

        // for(let i = 1; i < rows * (blockHeight + 1); i += blockHeight + 1){
        //     for(let j = 1; j < columns * (blockWidth + 10); j += blockWidth + 1){
        //         blockArr[blockCounter++] = new Block(j, i, blockWidth, blockHeight);
        //         if(j === 1){
        //             //nie sprawdza block.width < platform.width
        //             blockArr[blockCounter - 1].isColWPlatform = true;
        //         }
        //     }
        // }

        for(let i = 12; i < 96; i += blockHeight){
            for(let j = 70; j <= 560; j += blockWidth){
                if(blockCounter === 30){
                    break;
                }
                if(Math.random() > 0.5){
                    blockArr[blockCounter++] = new Block(j, i, blockWidth, blockHeight,
                        "images/block.png", false);
                }else{
                    blockArr[blockCounter++] = new Block(j, i, blockWidth, blockHeight,
                        "images/blockB.png", true);
                }
            }
        }
        myGameArea.start();
        if(window.mobileCheck()){
            myControlArea.start();
        }
    }

    myGameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;
            this.canvas.x = 0;
            this.canvas.y = 0;
            this.context = this.canvas.getContext("2d");
            this.bg = new Image(canvasWidth, canvasHeight);
            this.bg.src = "images/bg.png";

            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);

            window.addEventListener('keydown', function (e) {
                myGameArea.key = e.code;
            });
            window.addEventListener('keyup', function () {
                myGameArea.key = false;
            });
        },
        clear: function () {
            //this.context.globalAlpha = 0.4;
            this.context.drawImage(this.bg, 0, 0);
            this.context.globalAlpha = 1;
        }
    }
    myControlArea = {
        canvas: document.createElement("canvas"),
        start: function (){
            this.canvas.width = controlCanvasWidth;
            this.canvas.height = controlCanvasWidth;
            this.canvas.x = 0;
            this.canvas.y = 0;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[1]);
            this.interval = setInterval(updateControlArena, 20);
            this.canvas.addEventListener('touchstart', function(e) {
                myControlArea.touchOriginX = e.touches[0].clientX;
                myControlArea.touchOriginY = e.touches[0].clientY;
            });
            this.canvas.addEventListener('touchmove', function(e) {
                myControlArea.touchX = e.touches[0].clientX;
                myControlArea.touchY = e.touches[0].clientY;
            }, false);
            this.canvas.addEventListener('touchend', function() {
                myControlArea.touchX = null;
                myControlArea.touchY = null;
                myControlArea.touchOriginX = null;
                myControlArea.touchOriginY = null;
            }, false);
            this.canvas.addEventListener('touchcancel', function() {
                myControlArea.touchX = null;
                myControlArea.touchY = null;
                myControlArea.touchOriginX = null;
                myControlArea.touchOriginY = null;
            }, false);
        },
        clear: function () {
            let r = 241;
            let g = 241;
            let b = 241;
            this.context.fillStyle = 'rgba(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ', 1)';
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        },
    }

    function updateGameArea() {
        if(scoreB === 5){
            balls.push(new Ball(ballRadius, ballSpeed, ballX, ballY));
            scoreB = 0;
            ballsCount++;
        }
        // for(let i = 0; i < ballsCount; i++){
        //     for(let j = i + 1; j < i; j++){
        //         balls[j].velocity = balls[i].ballBallCollision(balls[j]);
        //     }
        // }
        if(platformHorizontal.x + platformHorizontal.width > myGameArea.canvas.width){
            platformHorizontal.x = myGameArea.canvas.width - platformHorizontal.width;
        }
        if(platformHorizontal.x < 0){
            platformHorizontal.x = 0;
        }
        if(platformVertical && platformVertical.y + platformVertical.height > myGameArea.canvas.height){
            platformVertical.y = myGameArea.canvas.height - platformVertical.height;
        }
        if(platformVertical && platformVertical.y < 0){
            platformVertical.y = 0;
        }
        document.getElementById("score").innerHTML = score.toString();

        let gameContext = myGameArea.context;
        if (!isGamePaused) {
            if(gameMode === "endless"){
                spawnBlock(poppedBlocks, blockArr, time);
            }
            if(blockArr[0].y !== 12 && gameMode !== "endless"){
                let temp = [];
                for(let i = 70; i <= 560; i += blockWidth){
                    if(Math.random() > 0.5){
                        temp.push(new Block(i, 12, blockWidth, blockHeight, "images/block.png", false));
                    }else{
                        temp.push(new Block(i, 12, blockWidth, blockHeight, "images/blockB.png", true));
                    }
                }
                for(let i = 0; i < blockArr.length; i++){
                    temp.push(blockArr[i]);
                }
                blockArr = [];
                for(let i = 0; i < temp.length; i++){
                    blockArr.push(temp[i]);
                }
            }
            time++;
            document.getElementById("timer").innerHTML = Math.floor(time / 50) + " s";
            if (isGameEnded) {
                isGamePaused = true;
                isGameEnded = false;
                clearInterval(myGameArea.interval);
                startGame();
            }
            myGameArea.clear();
            if(platformVertical){
                platformVertical.newPos();
            }
            platformHorizontal.newPos();
            if(platformVertical && platformHorizontal.x < platformVertical.x + platformVertical.width &&
                platformVertical.y > gameContext.canvas.height - platformVertical.height){
                platformHorizontal.x += platformHorizontal.speed + 1;
            }
            for(let i = 0; i < ballsCount; i++){
                balls[i].newPos();
                //ball collisions here
            }
            if(platformVertical){
                platformVertical.stopPlatform();
            }
            platformHorizontal.stopPlatform();

            if (myGameArea && myGameArea.key === 'ArrowLeft') {
                if(!areKeysReversed){
                    platformHorizontal.moveLeft();
                }else{
                    platformHorizontal.moveRight();
                }
            }
            if (myGameArea && myGameArea.key === 'ArrowRight') {
                if(!areKeysReversed){
                    platformHorizontal.moveRight();
                }else{
                    platformHorizontal.moveLeft();
                }
            }
            if(platformVertical){
                if(myControlArea && myControlArea.touchY){
                    if(myControlArea.touchOriginY - myControlArea.touchY > 10){
                        platformVertical.y -= speed;
                    }else if(myControlArea.touchOriginY - myControlArea.touchY < -10){
                        platformVertical.y += speed;
                    }
                }
                if (myGameArea && myGameArea.key === 'ArrowDown') {
                    platformVertical.moveDown();
                }
                if (myGameArea && myGameArea.key === 'ArrowUp') {
                    platformVertical.moveUp();
                }
            }
            if(myControlArea && myControlArea.touchX){
                if(myControlArea.touchOriginX - myControlArea.touchX > 10){
                    platformHorizontal.x -= speed;
                }else if(myControlArea.touchOriginX - myControlArea.touchX < -10){
                    platformHorizontal.x += speed;
                }
            }
            if(platformVertical){
                platformVertical.update();
            }
            platformHorizontal.update();
            for(let i = 0; i < ballsCount; i++){
                balls[i].update();
            }
            for(let i = 0; i < blockArr.length; i++){
                blockArr[i].update();
                if(blockArr[i].y >= platformHorizontal.y){
                    isGameEnded = true;
                }
                if(gameMode === "falling"){
                    blockArr[i].newPos(time);
                }
                if(blockArr[i].isColWPlatform && platformVertical){
                    platformBlockCollision(platformVertical, blockArr[i]);
                }
                for(let z = 0; z < ballsCount; z++) {
                    if (bounceBlock(balls[z], blockArr[i])) {
                        score += scoreMultiplier;
                        if (blockArr[i].isB) {
                            scoreB++;
                        } else if (Math.random() < 0.2) {
                            let tex = bonusRand[randomNum(0, 4)];
                            let bonus = new Bonus(tex, blockArr[i].x + blockArr[i].width / 2 - bonusWidth / 2, blockArr[i].y, 0);
                            flyingBonuses.push(bonus);
                            flyingBonusCounter++;
                        }
                        poppedBlocks.push(blockArr[i]);
                        blockArr.splice(i, 1);
                        i--;
                    }
                }
            }
            for(let i = 0; i < flyingBonusCounter; i++){
                flyingBonuses[i].update();
                flyingBonuses[i].newPos();
                platformBonusCollision(platformHorizontal, flyingBonuses[i]);
                if(flyingBonuses[i].isCaugth){
                    activeBonuses.push(new Bonus(flyingBonuses[i].bonusType, -20, -20, time));
                    flyingBonuses.splice(i, 1);
                    flyingBonusCounter--;
                    activeBonusesCounter++;
                    i--;
                }
            }
            for(let i = 0; i < activeBonusesCounter; i++){
                if(activeBonuses[i]){
                    activeBonuses[i].update();
                    if (!activeBonuses[i].isActive) {
                        bonusReverse(activeBonuses[i]);
                        activeBonuses.splice(i, 1);
                        i--;
                    }else{
                        bonusEffect(activeBonuses[i]);
                    }
                }
            }
            for(let i = 0; i < ballsCount; i++){
                bouncePlatform(balls[i], platformHorizontal);
                if(platformVertical){
                    bouncePlatform(balls[i], platformVertical);
                }
            }
            for(let i = 0; i < ballsCount; i++){
                if(balls[i].position.y + balls[i].radius >= gameContext.canvas.height){
                    balls.splice(i, 1);
                    i--;
                    ballsCount--;
                    if(ballsCount === 0){
                        isGameEnded = true;
                        window.alert("You lost!\nYour score: " + score.toString());
                        score = 0;
                    }
                    scoreB = 0;
                }
            }
        }else{
            myGameArea.context.font = "50px Helvetica";
            myGameArea.context.textAlign = "center";
            myGameArea.context.fillStyle = "#3df550";
            myGameArea.context.fillText("To play, press start!", 320, 240);
        }
    }

    function updateControlArena(){
        let gameContext = myControlArea.context;
        gameContext.clear();
    }

    function randomNum(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function askIfVertical(){
        return confirm("Click OK if you want to have a second, vertical platform!");
    }

    function checkGameMode(){
        return confirm("Click OK -> endless, cancel -> falling blocks");
    }

    function pause(){
        if (!isGamePaused) {
            isGamePaused = true;
        }
    }

    function spawnBlock(poppedBlocks, blockArr, time){
        let sec = time / 50;
        let cond = Math.random() > 0.75;
        if(poppedBlocks.length >= 25){
            cond = true;
        }else if(poppedBlocks.length <= 5){
            cond = false;
        }
        if(cond){
            if(sec % 5){
                blockArr.push(poppedBlocks[randomNum(0, poppedBlocks.length - 1)]);
                poppedBlocks.splice(randomNum(0, poppedBlocks.length - 1) ,1);
                poppedBlocks.length--;
            }
        }
    }

    function start() {
        if (isGamePaused) {
            isGamePaused = false;
        }
    }

    function bonusEffect(bonus){
        switch(bonus.bonusType){
            case "x2":
                scoreMultiplier = 2;
                break;
            case "x5":
                scoreMultiplier = 5;
                break;
            case "short":
                platformHorizontal.width =  128  * 0.8;
                break;
            case "long":
                platformHorizontal.width = 128 * 1.2;
                break;
            case "change":
                areKeysReversed = true;
                break;
        }
    }

    function bonusReverse(bonus){
        switch(bonus.bonusType){
            case "x2":
            case "x5":
                scoreMultiplier = 1;
                break;
            case "short":
            case "long":
                platformHorizontal.width = 128;
                break;
            case "change":
                areKeysReversed = false;
                break;
        }
    }
