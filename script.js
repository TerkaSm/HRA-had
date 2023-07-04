//listeners

document.addEventListener('keydown', keyPush);

//canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


//player
const snakeSize = 50;

let snakeSpeed = snakeSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 1;
let velocityY = 0;

const tileCountX = canvas.width / snakeSize;
const tileCountY = canvas.height / snakeSize;


//loop

function gameLoop() {
    drawStuff();
    //moveStuff();        // !!!!!!!!!!!! start/ stop  !!!!!!!!!!!!!!
    setTimeout(gameLoop, 1000 / 15);   //spusť se při kreslení
}

gameLoop();


// MOVE everythig ------------

function moveStuff() {
    snakePosX += snakeSpeed * velocityX;       //spouští pohyb
    snakePosY += snakeSpeed * velocityY;       //spouští pohyb

    if (snakePosX > canvas.width - snakeSize ) {
        snakePosX = 0;
    }

    if (snakePosX < - 0) {
        snakePosX = canvas.width;
    }

    if (snakePosY > canvas.height - snakeSize) {
        snakePosY = 0;
    }

    if (snakePosY < -snakeSize) {
        snakePosY = canvas.height;
    }
}

// DRAW everything -------------

    // background
function drawStuff() {
    rectangle('#1e6b52', 0, 0, canvas.width, canvas.height);

    // grid
drawGrid()

    // snake

    rectangle('#333', snakePosX, snakePosY, snakeSize, snakeSize);
}

    // draw rectangle

function rectangle (color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// KEYBOARD

function keyPush(event) {
    switch(event.key) {
        case '4':                       //ArrowLeft
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;

        case '8':                       //ArrowUp
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;

        case '6':                       //ArrowRight
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;

        case '2':                       //ArrowDown
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
    }
}

function drawGrid() {
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            rectangle('beige', 
            snakeSize * i, 
            snakeSize * j, 
            snakeSize - 1, 
            snakeSize - 1)
        }
    }
}


// 48'