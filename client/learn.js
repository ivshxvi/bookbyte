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
        card.style.backgroundImage = `url('${obj.capital_picture}')`
        card.innerHTML = `
            <h1>${obj.name}</h1>
            <p>Capital: ${obj.capital}</p>
            <p><img src="${obj.flag}" alt="${obj.name} Flag"></p>
            <p>Phone Code: ${obj.phone_code}</p>
            <p>Currency: ${obj.currency_name} (${obj.currency_symbol})</p>
            <p>Language: ${obj.language}</p>
        `
        cardContainer.appendChild(card)
    })
}