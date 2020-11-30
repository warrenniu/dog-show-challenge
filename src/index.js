document.addEventListener('DOMContentLoaded', () => {

})

/* On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).*/

/********* DOM Elements *************/
const dogContainer = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')
let updatedName = ""
let updatedBreed = ""
let updatedSex = ""
// let currentDog = ''


/********* Render Functions *************/
function initialize() {
fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(dogArray => renderAllDogs(dogArray));
}


  function renderAllDogs(dogArray) {
      dogArray.forEach((dog) => {
          renderOneDog(dog)
      })
  }

  function renderOneDog(dogObj) {
   
    dogForm.dataset.id = dogObj.id
    const row = document.createElement('tr')
    row.dataset.id = dogObj.id
    const name = document.createElement('td')
    name.className = "dog-name"
    name.textContent = `${dogObj.name}`
    const breed = document.createElement('td')
    breed.className = "dog-breed"
    breed.textContent = `${dogObj.breed}`
    const sex = document.createElement('td')
    sex.className = "dog-sex"
    sex.textContent = `${dogObj.sex}`
    const button = document.createElement('button')
    button.className = "edit-button"
    button.textContent = "Edit Dog"
    
      
    row.append(name)
    row.append(breed)
    row.append(sex)
    row.append(button)
    dogContainer.append(row)

  }

/********* Event Listeners *************/
dogContainer.addEventListener('click', handleDogEditBtn)
dogForm.addEventListener('submit', handleDogForm)

/********* Event Handlers *************/
function handleDogEditBtn(event) {
    if (event.target.matches('.edit-button')) {
        const tr = event.target.closest('tr')
        const dogName = tr.querySelector('.dog-name')
        const dogBreed = tr.querySelector('.dog-breed')
        const dogSex = tr.querySelector('.dog-sex')
        const id = tr.dataset.id 
        dogForm.dataset.id = id
        dogForm.name.value = dogName.textContent
        dogForm.breed.value = dogBreed.textContent
        dogForm.sex.value = dogSex.textContent
       
    }
}

function handleDogForm(event) {
    event.preventDefault()
        const id = dogForm.dataset.id
       
       updatedName = dogForm.name.value 
       updatedBreed = dogForm.breed.value 
       updatedSex = dogForm.sex.value 
       
       
       const updatedDog = {
           name: updatedName,
           breed: updatedBreed,
           sex: updatedSex
       }
       

        
fetch(`http://localhost:3000/dogs/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedDog),
})
.then(response => response.json())
.then(data => {
    dogContainer.innerHTML = ""
    initialize()


})
}
/********* Initialize *************/
initialize()
        