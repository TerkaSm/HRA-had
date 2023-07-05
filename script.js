//listeners

document.addEventListener('keydown', keyPush);

//canvas

const canvas = document.querySelector('canvas');
const title = document.querySelector('h1');
const ctx = canvas.getContext('2d');

//game

let gameIsRunning = true;

const fps = 5;
const tileSize = 60;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let score = 0;


//player

let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 1;
let velocityY = 0;

let tail = [];
let snakeLength = 4;


//food
let foodPosX = 0;
let foodPosY = 0;


//loop

function gameLoop() {
    if (gameIsRunning) {
        drawStuff();
        moveStuff();        // !!!!!!!!!!!! start/ stop  !!!!!!!!!!!!!!
        setTimeout(gameLoop, 1000 / fps);   //spusť se při kreslení/rychlost
    }
}

gameLoop();


// MOVE everythig ------------

function moveStuff() {
    snakePosX += snakeSpeed * velocityX;       //spouští pohyb
    snakePosY += snakeSpeed * velocityY;       //spouští pohyb
        //kontroluje kolizi se stěnou
    if (snakePosX > canvas.width - tileSize ) {
        snakePosX = 0;
    }

    if (snakePosX < - 0) {
        snakePosX = canvas.width;
    }

    if (snakePosY > canvas.height - tileSize) {
        snakePosY = 0;
    }

    if (snakePosY < - tileSize) {
        snakePosY = canvas.height;
    }
        // konec hry (naražení do sebe)
        tail.forEach(snakePart => {
            if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
                gameOver();
            }
        })

        //tail

        tail.push({x: snakePosX, y: snakePosY});

        // zapomenutí částí hada
        tail = tail.slice(-1 * snakeLength);

        // kolize s jídlem 
    if (snakePosX === foodPosX && snakePosY === foodPosY) {
        title.textContent = ++score;
        snakeLength++;
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
    rectangle('orangered', foodPosX, foodPosY, tileSize, tileSize)

    //tail
    tail.forEach(snakePart =>
        rectangle('#333', snakePart.x, snakePart.y, tileSize, tileSize)
    )
    // snake

    rectangle('#666', snakePosX, snakePosY, tileSize, tileSize);
}

    // draw rectangle

function rectangle (color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

    // náhodná pozice jídla
function resetFood() {

    // umísti jídlo jen pokud je kam (had není všude)
    if ( snakeLength === tileCountX * tileCountY) {
        gameOver()
    }

    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;

    // neukládej jídlo na hlavu hada
    if (foodPosX === snakePosX && foodPosY === snakePosY) {
        resetFood();
    }
    // neukládej jídlo ani na tělo hada
    if (tail.some(snakePart => snakePart.x === foodPosX && snakePart.y === foodPosY)) {
        resetFood();
    }
}

    // game over
function gameOver() {
    title.innerHTML = `Game Over !!! ${score}`;
    gameIsRunning = false;
}

// KEYBOARD

function keyPush(event) {
    switch(event.key) {
        case '4':
        case 'ArrowLeft':
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;

        case '8':
            case 'ArrowUp':
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;

        case '6':
        case 'ArrowRight':
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;

        case '2':
        case 'ArrowDown':
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        default:
            //reset game
            if (! gameIsRunning) location.reload();
            break
    }
}

function drawGrid() {
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            rectangle('beige', 
            tileSize * i, 
            tileSize * j, 
            tileSize - 1, 
            tileSize - 1)
        }
    }
}
