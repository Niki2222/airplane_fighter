let canvas;
let ctx;
let gameOn = true;
let intervalId;
let intervalIdCountSec;
let intervalIdAsteroids;
let timeRunning = true;
let countAteroids = 0;
let time = 0;
// asteroid info:
let asteroidXPos = 0;
let asteroidYPos = 0;
let asteroidWidth = 30;
let asteroidHeight = 20;
let asteroidSpeed = .5;
// airplane info:
let airplaneXPos = 150;
let airplaneYPos = 125;
let airplaneWidth = 25;
let airplaneHeight = 25;
let airplaneSpeed = 2;
// left and right arrows:
let leftKeyPress = false;
let rightKeyPress = false;
const LEFT_KEY = 37;
const RIGHT_KEY = 39;

document.getElementById("start").addEventListener("click", startGame);

function startGame() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    intervalId = setInterval(mainLoop, 1000 / 60);
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    countTime();
}

function mainLoop() {
    if (gameOn) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw("asteroid", asteroidXPos, asteroidYPos, asteroidWidth, asteroidHeight);
        draw("airplane", airplaneXPos, airplaneYPos, airplaneWidth, airplaneHeight);
        asteroidMove();
        airplaneMove();
    }
}

function draw(element, mainAx, secondAx, width, height) {
    ctx.drawImage(
    document.getElementById(`${element}`),
    mainAx,
    secondAx,
    width,
    height
    );
}

function increaseTime() {
    time += 10;
    let seconds = Math.floor(time / 1000);
    document.getElementById("scoreSeconds").innerText = seconds;
}

function countTime() {
    intervalIdCountSec = setInterval(function () {
        if (timeRunning) {
            increaseTime();
        }
    }, 20);
}

function keyPressed(event) {
    if (event.keyCode == LEFT_KEY) {
        leftKeyPress = true;
    }
    if (event.keyCode == RIGHT_KEY) {
        rightKeyPress = true;
    }
}

function keyReleased(event) {
    if (event.keyCode == LEFT_KEY) {
        leftKeyPress = false;
    }
    if (event.keyCode == RIGHT_KEY) {
        rightKeyPress = false;
    }
}

function airplaneMove() {
    if (leftKeyPress && airplaneXPos > 0) {
        airplaneXPos -= airplaneSpeed;
    }
    if (rightKeyPress && airplaneXPos < canvas.width - airplaneWidth) {
        airplaneXPos += airplaneSpeed;
    }
}

function asteroidMove() {
    asteroidYPos += asteroidSpeed;
    if (asteroidYPos > canvas.height) {
        asteroidYPos = 0 - asteroidHeight;
        asteroidXPos = Math.floor(Math.random() * canvas.width);
    }
    asteroidCount();
    collision();
}

function asteroidCount() {
    if (asteroidYPos === canvas.height) {
        ++countAteroids;
    }
    document.getElementById("scoreAsteroid").innerText = countAteroids;
}

function collision() {
    let separationMargin = 10;
    if (asteroidYPos + asteroidHeight - separationMargin >= airplaneYPos 
        && asteroidYPos <= airplaneYPos + airplaneHeight - separationMargin 
        && asteroidXPos + asteroidWidth - separationMargin >= airplaneXPos 
        && asteroidXPos <= airplaneXPos + airplaneWidth - separationMargin) {
        gameOver();
    }
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(intervalId);
    clearInterval(intervalIdCountSec);
    gameOn = false;
    timeRunning = false;
    drawText();
}

function drawText() {
    ctx.font = "bold 40px serif";
    ctx.strokeStyle = "orange";
    ctx.strokeText("Game Over!!!", 30, 85);
}
