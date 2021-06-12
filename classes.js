class Platform{
    speedX = 0;
    speedY = 0;
    constructor(width, height, color, x, y, speed){
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.color = color;
    }
    update(){
        let gameContext = myGameArea.context;
        gameContext.fillStyle = this.color;
        gameContext.fillRect(this.x, this.y, this.width, this.height);
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
    constructor(radius, color, speed, x, y){
        this.radius = radius;
        this.position = new Vector(x, y);
        this.velocity = new Vector(speed, speed);
        this.color = color;
    }
    update(){
        let gameContext = myGameArea.context;
        gameContext.beginPath();
        gameContext.fillStyle = this.color;
        gameContext.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        gameContext.fill();
        gameContext.closePath();
    }
    newPos(){
        let gameContext = myGameArea.context;
        if (this.position.x + this.radius >= gameContext.canvas.width || this.position.x - this.radius <= 0){
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        }

        if (this.position.y + this.radius <= 0){
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        }
        this.position = this.position.add(this.velocity);
    }
    ballBallCollision(ball){
        const distance =this.position.add(this.velocity)
            .subtract(ball.position.add(ball.velocity))
            .magnitude;

        function collisionVector(b1, b2){
            return b1.velocity.subtract(b1.position.subtract(b2.position).multiply(b1.velocity.subtract(b2.velocity).dotProduct(b1.position.subtract(b2.position))/ b1.position.subtract(b2.position).magnitude ** 2).multiply((2 * b2.sphereArea)  / (b1.sphereArea + b2.sphereArea)));
        }

        if (distance <= this.radius + ball.radius) {
            const v1 = collisionVector(this, ball);
            const v2 = collisionVector(ball, this);
            this.velocity = v1;
            return v2;
        }
    }
    get sphereArea() {
        return 4 * Math.PI * this.radius ** 2;
    }
}

class Block{
    isColWPlatform = false;
    color = colorArr[Math.floor(Math.random() * 2)];
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.blockTimer = 0;
    }
    update(){
        let gameContext = myGameArea.context;
        gameContext.fillStyle = this.color;
        gameContext.fillRect(this.x, this.y, this.width, this.height);
        this.blockTimer++;
    }
    newPos(){
        console.log(this.blockTimer)
        if(Math.floor(this.blockTimer ) === 500){
            this.y += this.height;
            this.blockTimer = 0;
        }
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
