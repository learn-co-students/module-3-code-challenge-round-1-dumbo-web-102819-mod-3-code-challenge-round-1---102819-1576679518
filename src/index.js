const ul = document.querySelector("#list-group");
const beerDiv = document.querySelector("#beer-detail");

fetch("http://localhost:3000/beers")
    .then(res => res.json())
    .then(data => {
        data.forEach((obj) => {
           turnObjToHtml(obj) 
        });
    });

function turnObjToHtml(beer) {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerText = beer.name;
    
    ul.append(li);

    li.addEventListener('click', () => {
       showOneBeer(beer); 
    });
}

function showOneBeer(beer) {
    
    beerDiv.innerHTML = `
        <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <form id="update-form">
            <textarea id="textarea" data-id="${beer.id}" name="description">${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">
                Save
            </button>
        </form>
    `;

    let form = document.getElementById("update-form");
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let description = e.target.description.value;
        
        beer.description = description;
        
        fetch(`http://localhost:3000/beers/${beer.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify(beer)
        })
        .then(res => res.json())
        .then(newObj => {
            turnObjToHtml(newObj);
        });
    })
   
}

