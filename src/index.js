//Global Vars
const sideBar = document.getElementById("list-group");
const mainBeer = document.getElementById("beer-detail");
let allBeers, currentBeer;

//*********** Functions ***********
//Inputting a json to populate the sidebar
const addItemToBeerSideBar = (item) => {
	//Creating new Li and setting info
	const newBeerLi = document.createElement("li");
	newBeerLi.className = "list-group-item";
	newBeerLi.innerText = item.name;

	sideBar.append(newBeerLi);
}

//Changing the Main Beer by giving it a json
const changeMainBeer = (beer) => {
	currentBeer = beer;

	//Changing the entire inner html of the mainBeer Div, giving it information
	mainBeer.innerHTML = `
		<h1>${beer.name}</h1>
		<img src="${beer.image_url}">
		<h3>${beer.tagline}</h3>
		<textarea>${beer.description}</textarea>
		<button id="edit-beer" class="btn btn-info">
		  Save
		</button>`;

	//TODO adding event handler to button
	//Getting the 2 var I need, the button and the content
	const saveButton = mainBeer.querySelector("#edit-beer");
	const newBeerContent = mainBeer.querySelector("textarea");

	//Clicking on Save button updates the beer's content in the json database
	saveButton.addEventListener("click", () => {
		const description = newBeerContent.value
		console.log(description, currentBeer.id)
		// currentBeer.description = description

		//Making a patch request
		fetch(`http://localhost:3000/beers/${currentBeer.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				"description": description
				//description
			//current
			}),
			header: {
				'content-Type': 'application/json',
    			'accept': 'application/json'
			}
		})
		.then(respond => respond.json())
		.then(result => {
			console.log("respond", result)
			getAllBeersFromServer()
			//This should update all the data on the sidebar
		})

	})

}

//*********** Fetch/Populating the Screen ***********
//Getting all the data and populating the Side Bar
const getAllBeersFromServer = () => {
	fetch("http://localhost:3000/beers")
		.then(respond => respond.json())
		.then(json => {
			//Storing all the Beers json into a local varible
			allBeers = json;
			//Populating the Side bar
			json.forEach(beer => {
				addItemToBeerSideBar(beer);
			})
		})
}//Calling it immediently to get all the data and populating it
getAllBeersFromServer()

//Getting the first item in the Database and populating the screen
fetch("http://localhost:3000/beers/1")
	.then(respond => respond.json())
	.then(json => changeMainBeer(json))

//*********** Main/Run ***********
//Adding Event Listener to the side bar
sideBar.addEventListener("click", event => {
	target = event.target;
	
	//Making sure i'm clicking an li
	if (target.tagName === "LI")
    {
    	//Getting the corrent beer from the beer local database
    	const found = allBeers.find((beer) => target.innerText === beer.name);
    	
    	//Changing the main beer
    	changeMainBeer(found);
    }
})


// //TESTING to FORCEFULLY CHANGE SOMETHING
// fetch(`http://localhost:3000/beers/1`, {
// 			method: 'PATCH',
// 			header: {
// 				'content-Type': 'application/json',
//     			'accept': 'application/json'
// 			},
// 			body:{
//     "id": 1,
//     "name": "BBroked it",
//     "tagline": "Japanese Citrus Berliner Weisse.dasdas",
//     "first_brewed": "11/2015",
//     "description": "Japanese citrus fruit intensifies the sour nature of this German classic.",
//     "image_url": "https://images.punkapi.com/v2/keg.png",
//     "food_pairing": [
//       "Smoked chicken wings",
//       "Miso ramen",
//       "Yuzu cheesecake"
//     ],
//     "brewers_tips": "Clean everything twice. All you want is the clean sourness of lactobacillus.",
//     "contributed_by": "Sam Mason <samjbmason>"
//   }
// 		})
// 		.then(respond => respond.json())
// 		.then(result => {
// 			console.log("respond", result)
// 			getAllBeersFromServer()
// 			//This should update all the data on the sidebar
// 		})

