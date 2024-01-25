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


document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/geo')
        .then(response => response.json())
        .then(data => {
            displayCards(data)
        })
        .catch(e => {
            console.error("Couldn't fetch data")
        })
})

const displayCards = (data) => {
    const cardContainer = document.getElementById('cardContainer')
    cardContainer.innerHTML = ''
    data.forEach(obj => {
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `
            <div class="top-section">
                <h1 class="card-title">${obj.name}</h1>
            </div>
            <div class="middle-section">
                <div class="image-box left">
                    <img class="flag" src="${obj.flag}" alt="Flag">
                </div>
                <div class="info-box">
                    <p class="capital">Capital: ${obj.capital}</p>
                    <p class="phone-code">Phone Code: ${obj.phone_code}</p>
                    <p class="currency">Currency: ${obj.currency_name} (${obj.currency_symbol})</p>
                    <p class="language">Language: ${obj.language}</p>
                </div>
                <div class="image-box right">
                    <img class="capital-photo" src="${obj.capital_picture}" alt="Capital Photo">
                </div>
            </div>
            <div class="bottom-section">
                <p class="info">${obj.info}</p>
            </div>
        `
        cardContainer.appendChild(card)
    })
}


