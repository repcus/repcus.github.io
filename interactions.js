
function bouncePlatform(ball, platform) {
    if (ball.velocity.y > 0) {
        if (ball.position.y + ball.radius >= platform.y && ball.position.y - ball.radius <= platform.y + platform.height) {
            if (ball.position.x < platform.x + platform.width && ball.position.x > platform.x && ball.position.y + ball.radius <= platform.y + ball.velocity.y) {
                changeXSpeed(ball, platform);
                ball.velocity.y = -ball.velocity.y;
            } else if (ball.position.x + ball.radius >= platform.x && ball.position.x - ball.radius <= platform.x + platform.width) {
                changeYSpeed(ball, platform);
                if (ball.isMovingRight) {
                    ball.position.x = platform.x - ball.radius;
                } else {
                    ball.position.x = platform.x + platform.width + ball.radius;
                }
                ball.velocity.x = -ball.velocity.x;
            }
        }
    }else{
        if (ball.position.y - ball.radius >= platform.y && ball.position.y + ball.radius <= platform.y + platform.height) { //to ok
            if (ball.position.x <= platform.x + platform.width) {
                changeXSpeed(ball, platform);
                ball.position.y = platform.y + platform.height + ball.radius;
                ball.velocity.y = -ball.velocity.y;
            } else if (ball.position.x + ball.radius >= platform.x && ball.position.x - ball.radius <= platform.x + platform.width) {
                changeYSpeed(ball, platform);
                ball.velocity.x = -ball.velocity.x;
            }
        }
    }
}

function bounceBlock(ball, block) {
    if (ball.velocity.y < 0) {
        if (ball.position.y - ball.radius <= block.y + block.height) {
            if (ball.position.x < block.x + block.width && ball.position.x > block.x && ball.position.y - ball.radius >= block.y - ball.velocity.y - 1) {
                ball.velocity.y = -ball.velocity.y;
                return true;
            }
        }
    }
    if(ball.position.y >= block.y && ball.position.y <= block.y + block.height){
        if((ball.position.x + ball.radius >= block.x && ball.position.x - ball.radius <= block.x + block.width)) {
            ball.velocity.x = -ball.velocity.x;
            return true;
        }
    }
}


function changeXSpeed(ball, line){
    if(ball.position.x > line.x && ball.position.x < line.x + line.width * 10/100  || ball.position.x > line.x + line.width * 90/100 && ball.position.x < line.x + line.width){
        if(ball.velocity.x > 0){
            ball.velocity.x = ballSpeed * 3;
        }else{
            ball.velocity.x = -ballSpeed * 3;
        }
    }else if(ball.position.x >= line.x + line.width * 10/100 && ball.position.x <= line.x + line.width * 30/100  || ball.position.x >= line.x + line.width * 70/100 && ball.position.x <= line.x + line.width * 90/100){
        if(ball.velocity.x > 0){
            ball.velocity.x = ballSpeed * 2;
        }else{
            ball.velocity.x = -ballSpeed * 2;
        }
    }else if(ball.position.x > line.x + line.width * 30/100 && ball.position.x < line.x + line.width * 40/100  || ball.position.x > line.x + line.width * 60/100 && ball.position.x < line.x + line.width * 70/100){
        if(ball.velocity.x > 0){
            ball.velocity.x = ballSpeed * 1.5;
        }else{
            ball.velocity.x = -ballSpeed * 1.5;
        }
    }else{
        if(ball.velocity.x > 0){
            ball.velocity.x = ballSpeed;
        }else{
            ball.velocity.x = -ballSpeed;
        }
    }
}

function changeYSpeed(ball, line){
    if(ball.position.y > line.y && ball.position.y < line.y + line.width * 10/100  || ball.position.y > line.y + line.width * 90/100 && ball.position.y < line.y + line.width){
        if(ball.velocity.y > 0){
            ball.velocity.y = ballSpeed * 3;
        }else{
            ball.velocity.y = -ballSpeed * 3;
        }
    }else if(ball.position.y >= line.y + line.width * 10/100 && ball.position.y <= line.y + line.width * 30/100  || ball.position.y >= line.y + line.width * 70/100 && ball.position.y <= line.y + line.width * 90/100){
        if(ball.velocity.y > 0){
            ball.velocity.y = ballSpeed * 2;
        }else{
            ball.velocity.y = -ballSpeed * 2;
        }
    }else if(ball.position.y > line.y + line.width * 30/100 && ball.position.y < line.y + line.width * 40/100  || ball.position.y > line.y + line.width * 60/100 && ball.position.y < line.y + line.width * 70/100){
        if(ball.velocity.y > 0){
            ball.velocity.y = ballSpeed * 1.5;
        }else{
            ball.velocity.y = -ballSpeed * 1.5;
        }
    }else{
        if(ball.velocity.y > 0){
            ball.velocity.y = ballSpeed;
        }else{
            ball.velocity.y = -ballSpeed;
        }
    }
}

function platformBlockCollision(platform, block){
    if(platform && block && block.y + block.height >= platform.y){
        platform.y = block.y + block.height;
    }
}

function platformBonusCollision(platform, bonus){
    if(bonus.y >= platform.y && bonus.x + 10 >= platform.x && bonus.x + 10 <= platform.x + platform.width){
        bonus.isCaugth = true;
    }else{
        bonus.isCaugth =  false;
    }
}
