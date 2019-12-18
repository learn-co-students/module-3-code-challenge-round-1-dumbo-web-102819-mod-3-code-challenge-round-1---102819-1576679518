
const beerList = document.querySelector("#list-group")
const beerDetail = document.querySelector("#beer-detail")






fetch(`http://localhost:3000/beers`)
.then(r => r.json())
.then(beerArray => {
    beerArray.forEach(beer => {
        renderEachBeer(beer) 
});
})

renderEachBeer = (beer) => {
    beerLi = document.createElement("li")
    beerLi.className = "list-group-item"
    beerLi.innerText = beer.name
    beerList.append(beerLi)

    beerLi.addEventListener(`click`, (event) => {
        fetch(`http://localhost:3000/beers/${beer.id}`)
        .then(r => r.json())
        .then(beer => 
            renderBeerDetail(beer))
            // renderBeerDeat(beerInfo))
            
    })
}




renderBeerDetail = (beer) => {

    beerDetail.innerHTML = ""




    let beerH1 = document.createElement("h1")
    beerH1.innerText = beer.name
    let beerImg = document.createElement("img")
    beerImg.src = beer.image_url
    let beerH3 = document.createElement("h3")
    beerH3.innerText = beer.tagline
    let beerTextArea = document.createElement("textarea")
    beerTextArea.innerText = beer.description
    let beerButton = document.createElement("button")
    beerButton.innerText = "Save"
    beerButton.id = "edit-beer"
    beerButton.className = "btn btn-info"

    beerDetail.append(beerH1, beerImg, beerH3, beerTextArea, beerButton)

    

    beerTextArea.addEventListener(`click`, (event) => {
        
        let newBeerDetail = event.target.value


        fetch(`http://localhost:3000/beers/${beer.id}`, {
        method:'PATCH',
        headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({
        description: newBeerDetail
        })
        })
        .then(r => r.json())
        .then(data => {
            beerTextArea.innerText = data

            //beerButton.addEventListener(`click`, beerTextArea.innerText = data)
            
        
        
        })

        
    })

    // beerButton.addEventListener(`click`, (event) => {
    //     let buttonClick = event.target

    //     fetch(`http://localhost:3000/beers/${beer.id}`, {
    //     method:'PATCH',
    //     headers: { 
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //     },
    //     body: JSON.stringify({
    //     description: buttonClick
    //     })
    //     })
    //     .then(r => r.json())
    //     .then(data => {
    //         beerTextArea.innerText = data

    //     })
        

    // })
}


