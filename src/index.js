document.addEventListener("DOMContentLoaded", () => {
    getBeers()
})

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