let start = true;
let level = 0;
let gameColors = [];
let userColors = [];
let btnColors = ["one", "two", "three", "four"];
let score = 0;
let highScore = 0;

document.addEventListener("keypress", () => {
    if (start == true) {
        start = false;
        // console.log(level);
        let body = document.querySelector("body");
        body.classList.add("gameStartFlash");
        setTimeout(() => {
            body.classList.remove("gameStartFlash")
        }, 50)
    }
    setTimeout(() => {
        levelUp();
    }, 400);
})

flash = function (button) {
    button.classList.add("flash");
    setTimeout(() => {
        button.classList.remove("flash")
    }, 100);
}

levelUp = function () {
    level++;
    let h2 = document.querySelector("h2");
    h2.innerText = `Level: ${level}`;
    // console.log(level);

    let num = Math.floor(Math.random() * 4);
    let button = document.querySelector(`#${btnColors[num]}`);
    // console.log(button);

    flash(button);

    let colorId = button.getAttribute("id");
    // console.log(colorId);
    gameColors.push(colorId);
    console.log(`gameColors: ${gameColors}`);

    userColors = [];
}

highScoreCheck = function () {
    if (highScore <= score) {
        highScore = score;
    }
    let h3 = document.querySelector("h3");
    h3.innerText = `Highest Score: ${highScore}`;
}


check = function () {
    let idx = userColors.length - 1;
    // console.log(idx);
    if (userColors[idx] == gameColors[idx]) {
        if (idx == gameColors.length - 1) {
            setTimeout(() => {
                levelUp();
                score++;
                highScoreCheck();
            }, 1000);
        }
    } else {
        let h2 = document.querySelector("h2");
        h2.innerText = `Gave Over. Your score is: ${score}. Press any key to restart.`;

        let body = document.querySelector("body");
        body.classList.add("gameEndFlash");
        setTimeout(() => {
            body.classList.remove("gameEndFlash")
        }, 50)

        gameColors = [];
        userColors = [];
        score = 0;
        level = 0;
        start = true;
    }
}

buttonPress = function () {
    let button = this;
    // console.log(this);
    flash(button);

    let colorId = this.getAttribute("id");
    // console.log(colorId);
    userColors.push(colorId);
    console.log(`userColors: ${userColors}`);
    check();
}

let allBtns = document.querySelectorAll(".box");
for (btn of allBtns) {
    btn.addEventListener("click", buttonPress);
}
