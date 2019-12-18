const beersUl = document.getElementById("list-group")
const beerDiv = document.getElementById("beer-detail")


fetch("http://localhost:3000/beers")
.then(r => r.json())
.then(beersArr => {
    beersArr.forEach(beerObj=> {
        turnJSONtoHTML(beerObj)
    });
})


function turnJSONtoHTML(beer) {
    let beerLi = document.createElement("li")
        beerLi.className = "list-group-item"
        beerLi.innerText = beer.name
        beersUl.append(beerLi)
        

        beerLi.addEventListener("click", (evt) => {
            
            fetch(`http://localhost:3000/beers/${beer.id}`)
            .then(r => r.json())
            .then(beerObj => {
                beerDiv.innerHTML = `<h1>${beerObj.name}</h1>
                <img src="${beerObj.image_url}" alt="${beerObj.name}">
                <h3>${beerObj.tagline}</h3>
                <textarea>${beerObj.description}</textarea>
                <button id="edit-beer" class="btn btn-info">Save</button>`


                let beerBtn = beerDiv.querySelector("button")
                let textArea = beerDiv.querySelector("textarea")

                beerBtn.addEventListener("click", (evt) => {
                   beerObj.description = textArea.value
                   fetch(`http://localhost:3000/beers/${beerObj.id}`, {
                       method: "PATCH",
                       headers: {
                           "Content-Type": "application/json",
                           "Accept": "application/json"
                       },
                       body: JSON.stringify({
                        description: beerObj.description
                       })
                   })
                   .then(r => r.json())
                   .then(newBeerObj => {
                       textArea.innerText = newBeerObj.description
                   })
                 
                    
                })



            }
                
            )
        
        })

        
}