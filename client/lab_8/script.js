
 
let listContainer = document.querySelector('#resto-list');
let restaurantInput = document.querySelector('.restr-input');
let categoryInput = document.querySelector('.category-input'); 

listContainer.innerHTML = '<li class = "list-header">Restaurant List</li>';

 
let  map = L.map('map', {
  center: [38.9897, -76.9378],
  zoom: 12
});


function initMap(){
    // according to google, College Park's coordinates are 38.9897, -76.9378
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYnJ5YW5waGFtMTI0IiwiYSI6ImNsMTlva2hrODJiODQza24xNmd4NHcyeXcifQ.erPlOGZJMorQ1Mw3gxPtWg'
    }).addTo(map);

    return map;
}

initMap();

// from given js hints document
function removeLatLonMarkers(){
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });
}

function addMarkers(inputArray, inputValue, inputField){
  
   //filter through array to find matching entries and get first 5
   inputArray = inputArray.filter(restr => restr[inputField].toLowerCase().includes(inputValue.toLowerCase()));
   inputArray = inputArray.filter(restr => restr.hasOwnProperty('geocoded_column_1'))

   if(inputArray.length > 5){
     inputArray = inputArray.slice(0, 5)
   }

   inputArray.map(elm => {    
 
     try {
       let restr_coords = elm['geocoded_column_1']['coordinates'];
       L.marker([restr_coords[1], restr_coords[0]]).addTo(map);
     } catch(e) {
        console.log("Restaurant coords not found")
     }
    
   })

  // Pan to first result
   try {
      let firstRestr = inputArray[0]['geocoded_column_1']['coordinates'] 
      map.panTo([firstRestr[1], firstRestr[0]]); 
   } catch(e){
      console.log('Location not found')
   }

}


function dataHandler(inputArray){
  
  //based on stack overflow link that was provided in lab 6 instructions
  let restaurantList = Array.from(new Array(15), () => inputArray[Math.floor(Math.random() * 1000)])

   //code cited from https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
  //make unique list entries
  return restaurantList.map(restr => restr).filter((restrName, index, self) => self.indexOf(restrName) === index)

}

function htmlInjection(inputArray){

  //clear ul contents
  listContainer.innerHTML = '<li class = "list-header" >Restaurant List</li>';
  
  let restaurantList = inputArray;

  //add entries to webpage
  restaurantList.map((restr) => listContainer.innerHTML += `<li>${restr.name}</li>`);
}

function filteredHtmlInjection(inputArray, inputValue, inputField){

    //clear restr list
    listContainer.innerHTML = '<li class = "list-header" >Restaurant List</li>';

    //filter through array to find matching entries
    inputArray = inputArray.filter(restr => restr[inputField].toLowerCase().includes(inputValue.toLowerCase()));

    // html injection
    inputArray.map((restr) => listContainer.innerHTML += `<li>${restr.name}</li>`);
}

async function mainEvent() { // the async keyword means we can make API requests
  
    const form = document.querySelector('.form');
    const submitButton = document.querySelector('.form-button');
    submitButton.style.setProperty('--display-value', 'none')

    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); // This accesses some data from our API
    const arrayFromJson = await results.json(); // This changes it into data we can use - an object
    console.log('response received')
    let enableFiltering = false;

    let currentArray = dataHandler(arrayFromJson);
    //htmlInjection(currentArray)
   
    if(arrayFromJson.length > 0){
       

      submitButton.style.setProperty('--display-value', 'block');
      let listChildrenCount =  listContainer.children.length;

      // event listener for restaurant name input
      restaurantInput.addEventListener('input', (e) => {
        
        if (typeof currentArray === 'undefined'){
          return
        } else if(enableFiltering){
          let restrName = e.target.value;
          filteredHtmlInjection(currentArray, restrName, 'name');
         
          removeLatLonMarkers();
          addMarkers(currentArray, restrName, 'name');
        }
      
      })

      // event listener for category input
      categoryInput.addEventListener('input', (e) => {
        
        if (typeof currentArray === 'undefined'){
          return
        } else if(enableFiltering){
          let restrName = e.target.value.toLowerCase();
          filteredHtmlInjection(currentArray, restrName, 'category');

          removeLatLonMarkers();
          addMarkers(currentArray, restrName, 'category');
        }
       
      })


      form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
        submitEvent.preventDefault(); // This prevents your page from refreshing!
        restaurantInput.value = '';
        categoryInput.value = '';
        console.log('form submission'); // this is substituting for a "breakpoint"
        enableFiltering = true;
        currentArray = dataHandler(arrayFromJson)
        htmlInjection(currentArray )
        console.log(currentArray)
      });
      
    }
  
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  
