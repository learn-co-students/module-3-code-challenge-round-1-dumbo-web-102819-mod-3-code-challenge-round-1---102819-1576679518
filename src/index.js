const ulGroupTag = document.querySelector('#list-group');
const divTagDetail = document.querySelector('#beer-detail');
const createBeerLi = (beer) => {
   return `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
}

fetch('http://localhost:3000/beers')
   .then(resp => resp.json())
   .then(everyBeers => {
      everyBeers.forEach(beer => {
         ulGroupTag.innerHTML += createBeerLi(beer)
      })
   })



   ulGroupTag.addEventListener('click', (event) => {
    if (event.target.className === 'list-group-item') {
       
       return fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
          .then(resp => resp.json())
          .then(beer => {
             divTagDetail.innerHTML = turnJSONintoHTML(beer)
             
          })
    }
 })

const turnJSONintoHTML = (beer) => {
   return `
      <h1>${beer.name}</h1>
      <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea>${beer.description}</textarea>
      <button id="edit-beer" class="btn btn-info">
      Save
      </button>
   `
}









