const displayForm = document.querySelector("#displaySection")
const startButton = document.querySelector("#gameplaySection button")
const submitButton = document.querySelector("#userInputSection")
const scoreBoard = document.querySelector("#score")
const timerElement = document.querySelector("#timer")
const timesUpSection = document.querySelector("#timesUp")
const timesUpMessage = timesUpSection.querySelector("#timesUpMessage")
const finalScoreElement = timesUpSection.querySelector("#finalScore")
const scoreDisplayElement = timesUpSection.querySelector("#scoreDisplay")

const countUnique = (iter) => {
    return new Set(iter).size
}

const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show")
}

window.onclick = (e) => {
    if (!e.target.matches('.dropbtn')) {
        const myDropdown = document.getElementById("myDropdown")
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show')
        }
    }
}

window.addEventListener('beforeunload', (e) => {
    if (timer != 0) {
        const confirmationMessage = 'Are you sure you want to leave? Your score will be lost!'
        e.returnValue = confirmationMessage || undefined
        return confirmationMessage
    }
})

document.querySelector("#userInputSection").style.display = "none"

let countryData
let score = 0
let displayHistory = []

const getCountry = async () => {
    if (score === 27) {
        alert("MAX SCORE, well done!")
        window.location.href = "./learn.html"
    }
    try {
        let data
        do {
            const response = await fetch('https://ivans-bookbyte-api.onrender.com/random')
            data = await response.json()
        } while (displayHistory.includes(data.capital))


        countryData = data
        displayHistory.push(data.capital)
        return data
    } catch (e) {
        console.error(e)
    }
}

const updateTimer = () => {
    timerElement.textContent = `Time Left: ${timer}`
    if (timer === 0) {
        timesUpSection.style.display = "block"
        finalScoreElement.style.display = "block"
        scoreDisplayElement.textContent = score
        submitButton.removeEventListener("submit", onSubmit)
        alert("Times Up! Final Score: " + score)
        window.location.href = "./learn.html"
    } else {
        timer--
        setTimeout(updateTimer, 1000)
    }
}

const onSubmit = async (e) => {
    e.preventDefault()
    const userInput = document.getElementById('userInput').value
    const message = document.querySelector("#message")

    if (countryData.name.includes(userInput)) {
        score += 1
        scoreBoard.textContent = `Score: ${score}`
        scoreBoard.classList.add('spin')
        setTimeout(() => {
            scoreBoard.classList.remove('spin')
        }, 500)
        getCountry().then((data) => {
            removePicture()
            placePicture(data.flag)
            message.textContent = ""
        })
        e.target.userInput.value = ""
    }
    else if (countryData.name.some(name => name.includes(userInput) && userInput.length >= 4)) {
        message.textContent = "Nearly there!"
        message.classList.add('flash-orange')
    }
    else {
        message.textContent = "You are wrong!"
        message.classList.add('flash-red')
        e.target.userInput.value = ""
    }
    setTimeout(() => {
        message.classList.remove('flash-red', 'flash-orange')
    }, 500)
};

const placePicture = (picUrl) => {
    const pic = document.createElement("img")
    pic.src = picUrl
    pic.classList.add("img")
    gameplaySection.appendChild(pic)
};

const removePicture = () => {
    const pic = document.querySelector(".img")
    if (pic) {
        pic.remove()
    }
}

let timerOn
startButton.addEventListener('click', (e) => {
    const randomiseTag = document.querySelector("#randomise")
    e.preventDefault()
    document.querySelector("#userInputSection").style.display = "block"
    getCountry().then((data) => {
        if (displayHistory.length > 1) {
            displayHistory.pop()
        }
        removePicture()
        placePicture(data.flag)
        message.textContent = ""
        randomiseTag.textContent = "Next"
        timerOn = 1
    })
    if (timerOn != 1) {
        timer = 150
        updateTimer()
    }
    submitButton.addEventListener("submit", onSubmit)
})



