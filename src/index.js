const BeerList = document.querySelector(".list-group")
const BeerDetails = document.querySelector("#beer-detail")
const saveButton = querySelector("#edit-beer")
let allBeers;

document.addEventListener("DOMContentLoaded", () => {
    
    fetch("http://localhost:3000/beers")
    .then(r => r.json())
    .then((beerArray) => {
        allBeers = beerArray
        beerArray.forEach(turnJsonToHtml)   
    }) 
    
    
})



function turnJsonToHtml(BeerObject){
    const BeerLi = document.createElement("li")
    BeerLi.className = "list-group-item"
    BeerLi.innerText = BeerObject.name
    BeerLi.setAttribute("id", `${BeerObject.id}`)

    BeerList.addEventListener("click", (evt) => {
    revealBeerDetails(evt)    
    })

    BeerList.append(BeerLi)

    saveButton.addEventListener("click", (evt) => {
        updateChanges(evt)
    })
}

function revealBeerDetails(evt)
{
   
    found = allBeers.find(function(beer) { return beer.id == evt.target.id})

    BeerDetails.innerHTML = 
        `<h1>${found.name}</h1>
        <img src=${found.image_url}>
        <h3>Beer Tagline: ${found.tagline}</h3>
        <textarea>Beer Description: ${found.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
        Save
        </button>`  
      
}

// function updateChanges(evt)
// {
//     id = evt.target.id 
//     fetch(`http://localhost:3000/beers/${id}`{
//      method: "PATCH",
//      headers: 'Content-type': "application/json"
//     })
    

// }