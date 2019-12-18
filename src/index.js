document.addEventListener("DOMContentLoaded", (evt) => {


    const sideUl = document.querySelector("#list-group")
    const mainDiv = document.querySelector("#beer-detail")
    loadSidebar()


    function getBeers(){
        return fetch("http://localhost:3000/beers")
        .then(r => r.json())
    }

    function updateDescription(beer, description){
        beer.description = description
        fetch(`http://localhost:3000/beers/${beer.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                 
            },
            body: JSON.stringify({
                description: description
            })
        })
    }

    function loadSidebar(){
        getBeers()
        .then((r) => {
            r.forEach((beer) => {
                let newLi = document.createElement("li")
                newLi.classList.add("list-group-item")
                newLi.innerText = beer.name
                newLi.dataset.id = beer.id
                newLi.addEventListener("click", (evt) => {
                    renderInMain(beer)
                })
                sideUl.append(newLi)
            })
        })
    }

    function renderInMain(beer){
        //removes all children of mainDiv currently rendered
        let child = mainDiv.lastElementChild;  
        while (child) { 
            mainDiv.removeChild(child); 
            child = mainDiv.lastElementChild; 
        }

        //creates all new child elements to be added to the page
        let newH1 = document.createElement("h1")
        let newSubtit = document.createElement("h4")
        let newImg = document.createElement("img")
        let newH3 = document.createElement("h3")
        let newTextarea = document.createElement("textarea")
        let newButton = document.createElement("button")
        let ulTitle = document.createElement("h3")
        let newUl = document.createElement("ul")
        let brewingTitle = document.createElement("h3")
        let brewTips = document.createElement("p")

        //iterates through food pairing array from api and adds li element for each to newUl
        beer.food_pairing.forEach((pair) => {
            let newLi = document.createElement("li")
            newLi.innerText = pair
            newUl.append(newLi)
        })

        //edits classes, ids, srcs and inner texts for all new elements
        newH1.innerText = beer.name
        newSubtit.innerText = `First Brewed: ${beer.first_brewed}`
        newImg.src = beer.image_url
        newH3.innerText = beer.tagline
        newTextarea.value = beer.description
        newButton.id = "edit-beer"
        newButton.classList.add("btn", "btn-info")
        newButton.innerText = "Save"
        ulTitle.innerText = "Food Pairings:"
        brewingTitle.innerText = "Brewing Tips:"
        brewTips.innerText = beer.brewers_tips

        //appends all new elements to DOM in proper order
        mainDiv.append(newH1)
        mainDiv.append(newSubtit)
        mainDiv.append(newImg)
        mainDiv.append(newH3)
        mainDiv.append(newTextarea)
        mainDiv.append(newButton)
        mainDiv.append(ulTitle)
        mainDiv.append(newUl)
        mainDiv.append(brewingTitle)
        mainDiv.append(brewTips)

        //adds event listener to new button
        newButton.addEventListener("click", (evt) => {
            updateDescription(beer, newTextarea.value)
        })
    }
})