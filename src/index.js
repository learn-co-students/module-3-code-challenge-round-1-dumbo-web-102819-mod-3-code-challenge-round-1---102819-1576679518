const beerUl = document.querySelector("#list-group")
const beerDetail = document.querySelector("#beer-detail")
document.addEventListener("DOMContentLoaded", () => {
    
    fetch("http://localhost:3000/beers")
    .then(r => r.json())
    .then((beerArr) => beerArr.forEach(turnJsonToHTML))
    
    
})

function turnJsonToHTML(beerObj) {
    let beerLi = document.createElement("li")
    
    beerLi.innerText = beerObj.name
    beerLi.className = "list-group-item"
    
    beerUl.append(beerLi)
    
    beerLi.addEventListener("click", () => {
        
        fetch(`http://localhost:3000/beers/${beerObj.id}`)
        .then(r => r.json())
        .then((beerObj) => displayBeerOBJ(beerObj))
        
    })
    
    // console.log(beerLi)
}

function displayBeerOBJ (beerObj) {
    let saveBtn = document.createElement("button")
    saveBtn.classList = "btn btn-info"
    saveBtn.id = "edit-beer"
    saveBtn.innerText = "Save"
    console.log(saveBtn)
    beerDetail.innerHTML = `<h1>${beerObj.name}</h1>
    <img src="${beerObj["image_url"]}">
    <h3>${beerObj.tagline}</h3>
    <textarea data-id= ${beerObj.id}>${beerObj.description}</textarea>
   `
   beerDetail.append(saveBtn)

    saveBtn.addEventListener("click", (e) => {
        e.preventDefault()
        // console.log()
        
        fetch(`http://localhost:3000/beers/${beerObj.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: {
                description: "your new description"
                // event
            }
        })
        .then(r => r.json())
        .then(turnJsonToHTML)
        
    })
    
}