//listeners

document.addEventListener('keydown', keyPush);

//canvas

const canvas = document.querySelector('canvas');
const title = document.querySelector('h1');
const ctx = canvas.getContext('2d');

//game

const fps = 5;
const snakeSize = 60;
const tileCountX = canvas.width / snakeSize;
const tileCountY = canvas.height / snakeSize;

let score = 0;


//player

let snakeSpeed = snakeSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 1;
let velocityY = 0;


//food
let foodPosX = 0;
let foodPosY = 0;


//loop

function gameLoop() {
    drawStuff();
    moveStuff();        // !!!!!!!!!!!! start/ stop  !!!!!!!!!!!!!!
    setTimeout(gameLoop, 1000 / fps);   //spusť se při kreslení/rychlost
}

gameLoop();


// MOVE everythig ------------

function moveStuff() {
    snakePosX += snakeSpeed * velocityX;       //spouští pohyb
    snakePosY += snakeSpeed * velocityY;       //spouští pohyb
        //kontroluje kolizi se stěnou
    if (snakePosX > canvas.width - snakeSize ) {
        snakePosX = 0;
    }

    if (snakePosX < - 0) {
        snakePosX = canvas.width;
    }

    if (snakePosY > canvas.height - snakeSize) {
        snakePosY = 0;
    }

    if (snakePosY < - snakeSize) {
        snakePosY = canvas.height;
    }

        // kolize s jídlem 
    if (snakePosX === foodPosX && snakePosY === foodPosY) {
        title.textContent = ++score;
        resetFood();
    }
}

// DRAW everything -------------

    // background
function drawStuff() {
    rectangle('#1e6b52', 0, 0, canvas.width, canvas.height);

    // grid
    drawGrid()

    //food
    rectangle('orangered', foodPosX, foodPosY, snakeSize, snakeSize)

    // snake

    rectangle('#333', snakePosX, snakePosY, snakeSize, snakeSize);
}

    // draw rectangle

function rectangle (color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

    // náhodná pozice jídla
function resetFood() {
    foodPosX = Math.floor(Math.random() * tileCountX) * snakeSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * snakeSize;
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


// 1h1'