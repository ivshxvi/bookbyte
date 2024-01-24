const displayForm = document.querySelector("#displaySection");
const startButton = document.querySelector("#gameplaySection button");
const submitButton = document.querySelector("#userInputSection");
const scoreBoard = document.querySelector("#score");
const timerElement = document.querySelector("#timer");
const timesUpSection = document.querySelector("#timesUp");
const timesUpMessage = timesUpSection.querySelector("#timesUpMessage");
const finalScoreElement = timesUpSection.querySelector("#finalScore");
const scoreDisplayElement = timesUpSection.querySelector("#scoreDisplay");

const countUnique = (iter) => {
    return new Set(iter).size;
}

const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
};

window.onclick = (e) => {
    if (!e.target.matches('.dropbtn')) {
        const myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
};

window.addEventListener('beforeunload', (e) => {
    if (timer != 0) {
        const confirmationMessage = 'Are you sure you want to leave? Your score will be lost!';
        e.returnValue = confirmationMessage || undefined;
        return confirmationMessage;
    }
});

document.querySelector("#userInputSection").style.display = "none";

let countryData;
let score = 0;
let displayHistory = [];

const getCountry = async () => {
    try {
        let data;
        do {
            const response = await fetch('http://localhost:3000/random');
            data = await response.json();
        } while (displayHistory.includes(data.capital));


        countryData = data;
        displayHistory.push(data.capital)
        return data;
    } catch (e) {
        console.error(e);
    }
};

// Function to update and display the timer
const updateTimer = () => {
    timerElement.textContent = `Time Left: ${timer}`;
    if (timer === 0) {
        timesUpSection.style.display = "block"; // Show the entire section
        finalScoreElement.style.display = "block"; // Show the final score element
        scoreDisplayElement.textContent = score; // Update the final score display
        submitButton.removeEventListener("submit", onSubmit);
        alert("Times Up! Final Score: " + score);
        window.location.href = "./learn.html"
    } else {
        timer--;
        setTimeout(updateTimer, 1000); // Update timer every 1 second
    }
};

const onSubmit = async (e) => {
    e.preventDefault();
    const userInput = document.getElementById('userInput').value;
    const message = document.querySelector("#message");

    if (countryData.name.includes(userInput)) {
        score += 1;
        scoreBoard.textContent = `Score: ${score}`;
        getCountry().then((data) => {
            removePicture()
            console.log(data.name)
            capitalName.textContent = data.capital
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
        message.classList.remove('flash-red', 'flash-orange');
    }, 500);
};

const placePicture = (picUrl) => {
    const pic = document.createElement("img");
    pic.src = picUrl;
    pic.classList.add("img");
    gameplaySection.appendChild(pic);
};

const removePicture = () => {
    const pic = document.querySelector(".img");
    if (pic) {
        pic.remove();
    }
};

let timerOn
startButton.addEventListener('click', (e) => {
    const capitalName = document.querySelector("#capitalName");
    const randomiseTag = document.querySelector("#randomise");
    e.preventDefault();
    document.querySelector("#userInputSection").style.display = "block";
    getCountry().then((data) => {
        if(displayHistory.length > 1){
            displayHistory.pop()
        }
        removePicture();
        console.log(data.name);
        capitalName.textContent = data.capital;
        placePicture(data.capital_picture);
        message.textContent = "";
        randomiseTag.textContent = "Next";
        timerOn = 1;
    });
    if (timerOn != 1) {
        timer = 150;
        updateTimer();
    }

    submitButton.addEventListener("submit", onSubmit);
});