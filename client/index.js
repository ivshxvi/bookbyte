const displayForm = document.querySelector("#displaySection")
const startButton = document.querySelector("#gameplaySection button")
const submitButton = document.querySelector("#userInputSection")
const scoreBoard = document.querySelector("#score")

// window.addEventListener('beforeunload', function (e) {
//     var confirmationMessage = 'Are you sure you want to leave? Your score will be lost!'
//     e.returnValue = confirmationMessage || undefined
//     return confirmationMessage
// })

let countryData


const getCountry = async () => {
    try {
        const response = await fetch('http://localhost:3000/random')
        const data = await response.json()
        countryData = data
        return data
    } catch (e) { console.error(e) }
}

startButton.addEventListener('click', (e) => {
    const capitalName = document.querySelector("#capitalName")
    const randomiseTag = document.querySelector("#randomise")
    e.preventDefault()
    getCountry().then((data) => {
        removePicture()
        console.log(data.name)
        capitalName.textContent = data.capital
        placePicture(data.flag)
        message.textContent = ""
        randomiseTag.textContent = "Next"
    })

})

let score = 0

submitButton.addEventListener("submit", async (e) => {
    e.preventDefault()
    const userInput = document.getElementById('userInput').value;
    const message = document.querySelector("#message")
    if (userInput === countryData.name) {
        message.textContent = `You guessed right, this is ${countryData.name}`
        score += 1
        scoreBoard.textContent = `Score: ${score}`
    } else {
        message.textContent = "You are wrong!"
    }
})


const placePicture = (picUrl) => {
    const pic = document.createElement("img")
    pic.src = picUrl
    pic.classList.add("img")
    pic.addEventListener("click", (f) => f.target.remove(), { once: true })
    gameplaySection.appendChild(pic)

}

const removePicture = () => {
    const pic = document.querySelector(".img")
    if (pic) {
        pic.remove()
    }
}

