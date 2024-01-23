const displayForm = document.querySelector("#displaySection")
const startButton = document.querySelector("#gameplaySection button")
const submitButton = document.querySelector("#userInputSection")

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
    e.preventDefault()
    getCountry().then((data) => {
        console.log(data.name)
        capitalName.textContent = data.name
        placePicture(data.flag)
    })

})

submitButton.addEventListener("submit", async (e) => {
    e.preventDefault()
    const userInput = document.getElementById('userInput').value;
    console.log(userInput === countryData.name);
})


const placePicture = (picUrl) => {
    const pic = document.createElement("img")
    pic.src = picUrl
    pic.classList.add("img")
    pic.addEventListener("click", (f) => f.target.remove(), { once: true })
    gameplaySection.appendChild(pic)

}