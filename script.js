//listeners

document.addEventListener('keydown', keyPush);

//canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


//player
const snakeSize = 50;
let snakeSpeed = 15;
let snakePosX = 0;
let snakePosY = canvas.height / 2 - snakeSize / 2;

let velocityX = 1;
let velocityY = 0;


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

    if (snakePosX > canvas.width) {
        snakePosX = 0;
    }

    if (snakePosX < -snakeSize) {
        snakePosX = canvas.width;
    }

    if (snakePosY > canvas.height) {
        snakePosY = 0;
    }

    if (snakePosY < -snakeSize) {
        snakePosY = canvas.height;
    }
}

// DRAW everything -------------

function drawStuff() {
    rectangle('#1e6b52', 0, 0, canvas.width, canvas.height);

    for (let i = 0; i < canvas.width / snakeSize; i++) {
        for (let j = 0; j < canvas.height / snakeSize; j++) {
            rectangle('beige', 
            snakeSize * i, 
            snakeSize * j, 
            snakeSize - 1, 
            snakeSize - 1)
        }
    }

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

// 42'