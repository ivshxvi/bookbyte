const key = '41828339-4484571af3c8494d167e1d483'

const displayForm = document.querySelector("#displaySection")
const startButton = document.querySelector("#startGame button")



const displayCapitalName = () => {
    const capitalName = document.querySelector("#capitalName")
    const userInput = document.querySelector("#userInput")
    const message = document.querySelector("#message")
    
    fetch("http://localhost:3000/random")
    .then((data) => data.json())
    .then((item) => {
        capitalName.textContent = item.capital
        if(userInput.toLowerCase() == item.name.toLowerCase()) {
            message.textContent = `You guessed right, this is ${item.name}`
        } else {
            message.textContent = "You are wrong!"
        }
    })
}

startButton.addEventListener('click', displayCapitalName)