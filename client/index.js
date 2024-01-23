

const displayForm = document.querySelector("#displaySection")
const startButton = document.querySelector("#gameplaySection button")
const submitButton = document.querySelector("#userInputSection")
const scoreBoard = document.querySelector("#score")


window.addEventListener('beforeunload', function (e) {
    var confirmationMessage = 'Are you sure you want to leave? Your score will be lost!'
    e.returnValue = confirmationMessage || undefined
    return confirmationMessage
})

document.querySelector("#userInputSection").style.display = "none"



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
    document.querySelector("#userInputSection").style.display = "block"
    getCountry().then((data) => {
        removePicture()
        console.log(data.name)
        capitalName.textContent = data.capital
        placePicture(data.capital_picture)
        message.textContent = ""
        randomiseTag.textContent = "Next"
    })

})

let score = 0
let successHistory = []

submitButton.addEventListener("submit", async (e) => {
    e.preventDefault()
    const userInput = document.getElementById('userInput').value;
    const message = document.querySelector("#message")

    if (countryData.name.includes(userInput)){
        message.textContent = `You guessed right, this is ${countryData.name}`
        message.classList.add('flash-green')
        score += 1
        scoreBoard.textContent = `Score: ${score}`
        successHistory.push(countryData)
        console.log(successHistory)

    } else {
        message.textContent = "You are wrong!"

        message.classList.add('flash-red')

    }
    setTimeout(() => {
        message.classList.remove('flash-red', 'flash-green')
    }, 500)
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

