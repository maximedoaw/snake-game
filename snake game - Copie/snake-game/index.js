const playboard = document.querySelector('.play-board')
const scoreElement = document.querySelector(".score")
const highscoreElement = document.querySelector(".high-score")
let gameOver = false
let foodX , foodY;
let snakeX = 5, snakeY = 10
let snakeBody = []
let velocityX = 0, velocityY = 0
let setIntervalId
let score = 0
let highscore = localStorage.setItem("high-score",score) 

const changeFoodPosition = () => {
    //passing a random 0 - 30 value as food position
    foodX =Math.floor(Math.random() * 20) + 1;
    foodY =Math.floor(Math.random() * 20) + 1;

}
const handleGameOver = () =>{
    //Clearing the timer and reloading the page on a game over
    clearInterval(setIntervalId)
    alert("Game Over! Press Ok to replay...")
    location.reload()
}
const changeDirection = (e) =>{
    //changed velocity value based on key press
    if (e.key === "ArrowUp") {
        velocityX = 0 
        velocityY = -1
    }else if(e.key === "ArrowDown"){
        velocityX = 0 
        velocityY = 1
    }else if(e.key === "ArrowLeft"){
        velocityX = -1 
        velocityY = 0
    }else if(e.key === "ArrowRight"){
        velocityX = 1 
        velocityY = 0
    }
    initGame()
}
const initGame = () =>{
    if(gameOver) return  handleGameOver()
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        snakeBody.push([foodX,foodY])//pushing food position to snake body array
        score++
        
       // highscore = score >= highscore ?  score : highscore
       if (score >= highscore) {
        highscore = score
       }else{
        //highscore = localStorage.setItem("highscore")
       }
        //localStorage.setItem("highsocre",highscore)
        scoreElement.innerHTML =`Score : ${score}`
        highscoreElement.innerHTML = `High Score: ${score}`
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        //shiftiing forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i-1]
        
    }
    snakeBody[0] = [snakeX,snakeY] // setting first element of snake body to current snake position
    // Updating the snake's  head position on the current velocity
    snakeX += velocityX
    snakeY += velocityY
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true
    }
    for (let i = 0; i < snakeBody.length; i++) {
     // Adding a div for each part of snake's body
     htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`
     if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
        gameOver = true
     }
    }
    playboard.innerHTML = htmlMarkup
}
changeFoodPosition()
setIntervalId=setInterval(initGame,125);
document.addEventListener("keydown",changeDirection)