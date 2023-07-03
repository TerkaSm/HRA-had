//canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


//player
const snakeSize = 50;
let snakeSpeed = 5;
let snakePosX = 0;
let snakePosY = canvas.height / 2 - snakeSize / 2;


//loop

function gameLoop() {
    moveStuff()
    drawStuff()
    requestAnimationFrame(gameLoop);   //spusť se při kreslení
}

gameLoop()


// MOVE everythig ------------

function moveStuff() {
    //snakePosX += snakeSpeed;        //spouští pohyb

    if (snakePosX > canvas.width) {
        snakePosX = 0;
    }
}

// DRAW everything -------------

function drawStuff() {
    ctx.fillStyle = 'beige';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(snakePosX, snakePosY, snakeSize, snakeSize)
}

// 16'