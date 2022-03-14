
 
let listContainer = document.querySelector('#resto-list');
let restaurantInput = document.querySelector('.restr-input');
let categoryInput = document.querySelector('.category-input'); 

listContainer.innerHTML = '<li class = "list-header">Restaurant List</li>';

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
        }
      
      })

      // event listener for category input
      categoryInput.addEventListener('input', (e) => {
        
        if (typeof currentArray === 'undefined'){
          return
        } else if(enableFiltering){
          let restrName = e.target.value;
          filteredHtmlInjection(currentArray, restrName, 'category');
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
  
