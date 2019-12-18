// Module 3 JS Code Challenge

document.addEventListener('DOMContentLoaded', dom => {

// HTML Objects
  const beerListUl = document.querySelector('#list-group');
  const beerInfoDiv = document.querySelector('#beer-detail');

// Functionality
  // -- As a user, when the page loads, I should see a list of beer names retrieved from an API on the left hand side of the screen.
  loadBeerList();


// Helpers
  // Fetches - possibly consolidate??
  function getBeers () {
    return fetch (`http://localhost:3000/beers`)
      .then(a => a.json())
    }


  function getBeerInfo(beerName) {
    let beerId = beerName.dataset.id

    return fetch (`http://localhost:3000/beers/${beerId}`)
      .then(r => r.json())
    }


  function patchBeerDescription (beerId, description) {
    return fetch (`http://localhost:3000/beers/${beerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({description})
    })
    .then(r => r.json())
  }

  // DOM Manipulation
  function loadBeerList () {
    let beerList = getBeers();

    beerList.then((beers) => {
      beers.forEach((beer) => {
        let beerLi = document.createElement('li')
        let beerName = beer.name

        beerLi.innerText = beerName;
        beerLi.classList.add("list-group-item");
        beerLi.dataset.id = beer.id;

        infoEvent(beerLi)

        beerListUl.appendChild(beerLi);
      });
    })
  };

  // Event Listeners
  // -- As a user, when I click a beer name, the application should reveal more information about that particular beer.
  function infoEvent (beerListItem) {
    let beerDetails;

    beerListItem.addEventListener('click', (clicked) => {
      getBeerInfo(beerListItem)
      .then(beerInfo => {
        let beerName = beerInfo.name;
        let beerTagline = beerInfo.tagline;
        let beerDescription = beerInfo.description;
        let beerImage = beerInfo.image_url;

        beerDetails = `<h1>${beerName}</h1>
        <img src=${beerImage}>
        <h3>${beerTagline}</h3>
        <textarea>${beerDescription}</textarea>
        <button id="edit-beer" class="btn btn-info">
          Save
        </button>`

        beerInfoDiv.innerHTML = beerDetails;
        beerInfoDiv.dataset.id = beerListItem.dataset.id;

        let editButton = beerInfoDiv.querySelector('#edit-beer');
        editBeerEvent(editButton);
      })

    })
  }


  // -- As a user, when looking at the details of a beer, I can edit the current description of a beer. Clicking the 'Save' button will save any changes added to the description in the database
  function editBeerEvent (editButton) {
    editButton.addEventListener('click', event => {

      let descriptionField = event.target.parentElement.querySelector('textarea');
      let newDescription = descriptionField.value;

      let beerId = event.target.parentElement.dataset.id;
      patchBeerDescription(beerId, newDescription)
      .then(updatedDescription => {

      })
    })
  }







})
