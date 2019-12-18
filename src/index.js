const allBeersUl = document.querySelector("ul.list-group")
// console.log(allBeersUl)
const showBeerDiv = document.querySelector("#beer-detail")
// console.log(showBeerDiv)

// Show all the beer names on the left side inside allBeersUl as li 

fetch("http://localhost:3000/beers")
.then(r => r.json())
.then((arrayOfObjects) => {
    // console.log(arrayOfObjects)
    arrayOfObjects.forEach((beerObject) => {
        // console.log(beerObject)
        makeJSONtoHTML(beerObject)
    })
})

// the main helper, json->html

function makeJSONtoHTML(beerObject) {
    let newLi = document.createElement("li")
    newLi.className = "list-group-item"
    newLi.dataset.id = beerObject.id
    // console.log(newLi)
    // console.log(beerObject)
    newLi.innerText = `${beerObject.name}`
    newLi.addEventListener("click", () => {
        // console.log(e)
        showBeerDiv.innerHTML = 
        `<h1>${beerObject.name}</h1>
        <img src=${beerObject.image_url}>
        <h3>${beerObject.tagline}</h3>
        <textarea class="txt">${beerObject.description}</textarea>
        <button id="${beerObject.id}-edit-beer" class="btn btn-info">
          Save
        </button>`
        let saveButton = showBeerDiv.querySelector("button")
        // let textArea = showBeerDiv.querySelector("textarea")
        // console.log(textArea)
        // console.log(saveButton)
        saveButton.addEventListener("click", () => {
            let responseEdit = window.confirm(`Are you sure you want to edit ${beerObject.name}?`)
            if (responseEdit) {
                updateDescription(beerObject)
            } 
        })
    })
    allBeersUl.append(newLi)
}

///// maybe make some helpers if it won't mess it all up

function updateDescription(beerObject) {
    let textArea = document.querySelector("textarea")
     // console.log(textArea)
    let newText = textArea.value
    let tempId = beerObject.id
    // console.log(tempId)
    // console.log(newText)
    // Now we can change the description property by fetch - patch

    fetch(`http://localhost:3000/beers/${tempId}`, {
        method: 'PATCH', 
        body: JSON.stringify({
            description: newText
        }), 
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    })
    .then(r => r.json())
    .then((newObject) => {
        // console.log(newObject)
        // let oldLi = document.querySelector(`li[data-id="${newObject.id}"]`)
        // console.log(oldLi)
        // oldLi.
        // console.log(beerObject)
        beerObject.description = newObject.description
        // console.log(textArea)
        textArea.value = beerObject.description
        window.alert(`You Updated ${beerObject.name}!`);

    })
}