let beerUL = document.querySelector("#list-group")
let beerDetail = document.getElementById("beer-detail")



fetch("http://localhost:3000/beers")
  .then(r => r.json())
  .then((beersArr) => {

    beersArr.forEach((beer) => {
      beerToHTML(beer)
    })

  })


  function beerToHTML(beerObj){

      let newLi = document.createElement("li")
        newLi.classList.add("beer-card")
        newLi.className = "beer-card"
    
      newLi.innerHTML = `<ul class="list-group">
      <li class="list-group-item">${beerObj.name}</li>
          </ul>`
      
      beerUL.append(newLi)

  }
// ^^^^^^^^WORKS ^^^^^^^


// newLi.addEventListener("click", function(){ 
//     fetch(`http://localhost:3000/beers/:id`);
// });
// .then (let newLi = document.createElement("li")
// newLi.classList.add("beer-card")
// newLi.className = "beer-card"

// beerDetail.innerHTML = `<h1>${beerObj.name}</h1>
// <img src="${beerObj.image_url}">
// <h3>${beerObj.tagline}</h3>
// <textarea>${beerObj.tagline}</textarea>
// <button id="edit-beer" class="btn btn-info">
//   Save
// </button>`

// beerDetail.append(beer-detail)





