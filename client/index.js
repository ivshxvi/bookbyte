const key = '41828339-4484571af3c8494d167e1d483'

const displayForm = document.querySelector("#displaySection")
const startButton = document.querySelector("#gameplaySection button")


const displayCapitalName = () => {
    const capitalName = document.querySelector("#capitalName")
    const userInput = document.querySelector("#userInput")
    const message = document.querySelector("#message")
    
    fetch("http://localhost:3000/random")
    .then((data) => data.json())
    .then((item) => {
        console.log(typeof item.name)
        console.log(typeof userInput)
        console.log(userInput.value)
        capitalName.textContent = item.capital
        getPicture(item.capital)

        // THE LOGIC BELOW SHOULD BE IN AN ASYNC FUNCTION

        // if(userInput.value.toLowerCase() === item.name.toLowerCase()) {
        //     message.textContent = `You guessed right, this is ${item.name}`
        // } else {
        //     message.textContent = "You are wrong!"
        // }
    })
}

startButton.addEventListener('click', displayCapitalName)

const getPicture = async (capital) => {
    try{
        const resp = await fetch(`https://pixabay.com/api/?key=${key}&q=${capital}`)
        const data = await resp.json()
        placePicture(data.hits[0].previewURL)
    } catch(err){
        console.error(err)
    }   
}

const placePicture = (picUrl) => {
    const pic = document.createElement("img")
    pic.src = picUrl
    pic.addEventListener("click", (f) => f.target.remove(),{once:true})
    gameplaySection.appendChild(pic)
    
}