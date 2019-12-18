document.addEventListener("DOMContentLoaded", () => {
    // createNewButton()
    getBeers()
})
const createNewButton = () => {
    let newButton = document.createElement('button')
    newButton.addEventListener('click', () => {
        clearShowPage()
        displayNewBeerForm()
    })
    document.querySelector('.row').append(newButton)
}

const clearShowPage = () => {
    let showPage = document.getElementById('beer-detail')
    while(showPage.firstChild) {
        showPage.removeChild(showPage.firstChild)
    }
}

const displayNewBeerForm = () => {
    let form = document.createElement('form')
    form.id = 'new-beer'
    form.innerHTML = `Beer Name:<input type='text' id='name'><br>
                        Tagline:<input type='text' id='tagline'><br>
                        First Brewed (ex.MM/YYYY):<input type='text'><br>
                        Beer Description:<textarea id='description'></textarea>
                        Image Url: <input type='text' id='image'><br>
                        Food Pairing 1: <input type='text' id='fp1'><br>
                        Food Pairing 2: <input type='text' id='fp2'><br>
                        Food Pairing 3: <input type='text' id='fp3'><br>
                        Brewers Tips: <input type='text' id='tips'><br>
                        Contributed By:<input type='text' id='contributed'><br>
                        <input type='submit' value='Create New Beer'>`
    document.getElementById('beer-detail').append(form)
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        let submittedform = event.target
        let newBeer = {
            
            name: submittedform['name'].value,
            tagline: submittedform['tagline'].value,
            first_brewed: submittedform[''],
            description: "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
            image_url: "https://images.punkapi.com/v2/keg.png",
            food_pairing: [
            "Spicy chicken tikka masala",
            "Grilled chicken quesadilla",
            "Caramel toffee cake"
            ],
            brewers_tips: "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
            contributed_by: "Sam Mason <samjbmason>"
            }
     
    })
}

const getBeers = () => {
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beerArr => {
        beerArr.forEach(beerObj => {
            createBeerLi(beerObj)
        });
    })
}

const createBeerLi = (beerObj) => {
    let beerLi = document.createElement('li')
    beerLi.className = "list-group-item"
    beerLi.innerText = beerObj.name
    document.getElementById('list-group').append(beerLi)
    addBeerLiListener(beerLi,beerObj)
}

const addBeerLiListener = (li, beerObj) => {
    li.addEventListener('click', () => {
        fetch(`http://localhost:3000/beers/${beerObj.id}`)
        .then(resp => resp.json())
        .then(beer => showBeer(beer))
    })
}

const showBeer = (beer) => {
    document.getElementById('beer-detail').innerHTML = `<h1>${beer.name}</h1>
                                                        <img src="${beer.image_url}">
                                                        <h3>${beer.tagline}</h3>
                                                        <textarea id="beer-description">${beer.description}</textarea>
                                                        <button id="edit-beer" class="btn btn-info">Save</button>`
    let button = document.getElementById('edit-beer')
    addSaveListener(button,beer.id)
}

const addSaveListener = (button, beerId) => {
    button.addEventListener("click", () => {
        let editedText = document.getElementById('beer-description').value
        saveBeer(editedText,beerId)
    })
}

const saveBeer = (newText,id) => {
    console.log(newText)
    fetch(`http://localhost:3000/beers/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type':'application/json',
            'accept':'application/json'
        },
        body: JSON.stringify({
            description: newText
        })
    })
    .then(resp => resp.json())
    .then(beer => {
        showBeer(beer)
    })
}