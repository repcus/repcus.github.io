class Platform{
    speedX = 0;
    speedY = 0;
    constructor(width, height, color, x, y, speed, textureSrc){
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.texture = new Image(this.width, this.height);
        this.texture.src = textureSrc;
    }
    update(){
        let gameContext = myGameArea.context;
        gameContext.beginPath();
        gameContext.drawImage(this.texture, this.x, this.y, this.width, this.height);
    }
    newPos(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    moveLeft(){
        if (this.x > 0){
            this.speedX = -this.speed;
        }
    }
    moveRight(){
        if(this.x + this.width < myGameArea.canvas.width){
            this.speedX = this.speed;
        }
    }
    moveUp(){
        if (this.y > 0){
            this.speedY = -this.speed;
        }
    }
    moveDown(){
        if (this.y + this.height < myGameArea.canvas.height){
            this.speedY = this.speed;
        }
    }
    stopPlatform(){
        this.speedX = 0;
        this.speedY = 0;
    }
}

class Ball{
    isMovingRight = Math.random() < 0.5;
    constructor(radius, speed, x, y){
        this.radius = radius;
        this.position = new Vector(x, y);
        this.velocity = new Vector(speed, speed);
        this.texture = new Image(16, 16);
        this.texture.src = "images/ball.png";
    }

    update(){
        let gameContext = myGameArea.context;
        gameContext.beginPath();
        gameContext.drawImage(this.texture, this.position.x - 8, this.position.y - 8)
        gameContext.closePath();
    }
    newPos(){
        let gameContext = myGameArea.context;
        if(this.velocity.x > 0 && this.position.x + this.radius >= gameContext.canvas.width){
                this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        }
        if(this.velocity.x < 0 && this.position.x - this.radius <= 0){
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        }
        if (this.position.y + this.radius + this.velocity.y <= 0){
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        }
        this.position = this.position.add(this.velocity);
    }
}

class Block{
    isColWPlatform = false;
    constructor(x, y, width, height, textureSrc, isB){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.blockTimer = 0;
        this.texture = new Image(50, 20);
        this.texture.src = textureSrc;
        this.isB = isB;
    }
    update(){
        let gameContext = myGameArea.context;
        gameContext.beginPath();
        gameContext.drawImage(this.texture, this.x, this.y);
        this.blockTimer++;
    }
    newPos(){
        if(Math.floor(this.blockTimer) === 500){
            this.y += this.height;
            this.blockTimer = 0;
        }
    }
}

class Bonus{
    constructor(bonusType, originX, originY){
        this.x = originX;
        this.y = originY;
        this.texture = new Image();
        this.isCaugth = false;
        this.isActive = false;
        this.bonusTimer = 0;
        this.bonusType = bonusType;
        switch(this.bonusType){
            case "x2":
                this.texture.src = "images/x2.png";
                break;
            case "x5":
                this.texture.src = "images/x5.png";
                break;
            case "short":
                this.texture.src = "images/short.png";
                break;
            case "long":
                this.texture.src = "images/long.png";
                break;
            case "change":
                this.texture.src = "images/change.png";
                break;
            default:
                break;
        }
    }
    update(){
        let gameContext = myGameArea.context;
        if(!this.isCaugth && !this.isActive && this.y <= gameContext.canvas.height){
            gameContext.beginPath();
            gameContext.drawImage(this.texture, this.x, this.y);
        }
        this.bonusTimer++;
        this.isActive = this.bonusTimer < 500;
    }
    newPos(){
        this.y++;
    }
}

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(vector){
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector){
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    multiply(scalar){
        return new Vector(this.x * scalar, this.y * scalar);
    }

    dotProduct(vector){
        return this.x * vector.x + this.y * vector.y;
    }

    get magnitude(){
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    get direction(){
        return Math.atan2(this.x, this.y);
    }
}
