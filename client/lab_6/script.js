
 
let listContainer = document.querySelector('#resto-list')

 
function dataHandler(inputArray){
  
  //based on stack overflow link that was provided in lab 6 instructions
  let restaurantList = Array.from(new Array(15), () => inputArray[Math.floor(Math.random() * 1000)])

  //clear ul contents
  listContainer.textContent = '';

  //code cited from https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
  //make unique list entries
  restaurantList = restaurantList.map(restr => restr).filter((restrName, index, self) => self.indexOf(restrName) === index)

  //add entries to webpage
  restaurantList.map((restr) => listContainer.innerHTML += `<li>${restr.name}</li>`)

}
 
async function mainEvent() { // the async keyword means we can make API requests
  
    const form = document.querySelector('.form');
    const submitButton = document.querySelector('.form-button');
    submitButton.style.setProperty('--display-value', 'none')

    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); // This accesses some data from our API
    const arrayFromJson = await results.json(); // This changes it into data we can use - an object
    console.log('response received')
    dataHandler(arrayFromJson)

    if(arrayFromJson.length > 0){

      submitButton.style.setProperty('--display-value', 'block')
      form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
        submitEvent.preventDefault(); // This prevents your page from refreshing!
        console.log('form submission'); // this is substituting for a "breakpoint"
        dataHandler(arrayFromJson)
      });
      
    }
  
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  