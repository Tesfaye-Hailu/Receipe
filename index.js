
// Arrays of Dish Object
let dishes = [
    {
        name: 'Chicken Soup',
        ingredients:['Chicken', 'Egg']
    },
    { name: 'Spaghetti',
    ingredients:['Pasta', 'Cheese', 'Egg']

    },
    { name: 'Cheese Burger',
    ingredients:['Cheese', 'Bread', 'Egg']

    },
    {
        name: 'Chicken Sandwich',
        ingredients:['Chicken']
    },
    {
        name: 'Chicken Salad',
        ingredients:['Chicken', "Salad"]
    },
    {
        name: 'Fish Salad',
        ingredients:['Fish', 'Salad', 'Tomatos']
    },
    { name: 'Macchiato OR Latte',
    ingredients:['Milk', 'Coffee']
  },
    
]

class IngredientList {
    constructor() {
      this.ingredients = ['Fish', 'Chicken', 'Beef', 'Egg', 'Cheese', 'Tomatos','pasta', 'Vegetables', 'Bread', 'Pizza', 'Coffee','Salad','Milk'];
      this.displayIngredients();
      this.bindAddIngredientButton();
      this.bindSelectIngredientButton();
    }
  
    addIngredient(name) {
      this.ingredients.push(name);
      this.displayIngredients();
    }
  
    // to display ingredients horizontally
    displayIngredients() {
      const availableIngredientsList = document.querySelector('#available-ingredients');
      availableIngredientsList.innerHTML = '';
    
      const ul = document.createElement('ul');
      
      
      for (const ingredient of this.ingredients) {
        const li = document.createElement('li');
        li.style.display = 'inline-block';
        li.style.marginRight = '10px';
        li.textContent = ingredient;
        ul.appendChild(li);
      }
    
      availableIngredientsList.appendChild(ul);
    }
    
     // to add additional ingredients in the website.
    bindAddIngredientButton() {
      const addIngredientButton = document.querySelector('#add-ingredient-button');
      addIngredientButton.addEventListener('click', () => {
        const newIngredientNames = prompt('Enter one or more new ingredients separated by commas:');
        if (newIngredientNames) {
          const ingredientNames = newIngredientNames.split(',').map(name => name.trim());
          ingredientNames.forEach(name => {
            if (!this.checkDuplicateIngredient(name)) {
              const capitalizedIngredientName = name.charAt(0).toUpperCase() + name.slice(1);
              this.addIngredient(capitalizedIngredientName);
            } else {
              alert(`"${name}" is already in the list of ingredients!`);
            }
          });
        }
      });
    }
      // to check duplicated ingredients
      checkDuplicateIngredient(name) {
        const availableIngredientsList = document.querySelector('#available-ingredients');
        const ingredientListItems = availableIngredientsList.querySelectorAll('li');
        for (let i = 0; i < ingredientListItems.length; i++) {
          if (ingredientListItems[i].textContent.toLowerCase() === name.toLowerCase()) {
            return true;
          }
        }
        return false;
      }

      // a method to select ingredients from the available list
    
    bindSelectIngredientButton() {
      const selectIngredientButton = document.querySelector('#select-ingredient-button');
    
      selectIngredientButton.addEventListener('click', () => {
        const availableIngredientsList = document.querySelector('#available-ingredients');
        const selectedIngredientsList = document.querySelector('#selected-ingredients');
        let selectedIngredientNamesInput = prompt('Enter the names of the ingredients you want to select (separated by commas):');
        selectedIngredientNamesInput = selectedIngredientNamesInput.split(',').map(name => name.trim().toLowerCase());
    
        selectedIngredientNamesInput.forEach(name => {
          const selectedIngredient = [...availableIngredientsList.querySelectorAll('li')].find(li => li.textContent.toLowerCase() === name);
          if (selectedIngredient) {
            if (!this.checkDuplicateIngredientInSelected(selectedIngredient.textContent)) {
              selectedIngredientsList.appendChild(selectedIngredient.cloneNode(true));
            } else {
              alert(`The ingredient "${selectedIngredient.textContent}" is already selected.`);
            }
          } else {
            alert(`Sorry, the ingredient "${name}" is not available.`);
          }
        });
    
        this.displaySelectedIngredients();
      });
    }
    
    checkDuplicateIngredientInSelected(name) {
      const selectedIngredientsList = document.querySelector('#selected-ingredients');
      const selectedIngredientListItems = selectedIngredientsList.querySelectorAll('li');
      for (let i = 0; i < selectedIngredientListItems.length; i++) {
        if (selectedIngredientListItems[i].textContent.toLowerCase() === name.toLowerCase()) {
          return true;
        }
      }
      return false;
    }
    
      
      // to reset or clear selected items for the next user.
      reset() {
        const availableIngredientsList = document.querySelector('#available-ingredients');
        const selectedIngredientsList = document.querySelector('#selected-ingredients');
        selectedIngredientsList.innerHTML = '';
    
        const optionsContainer = document.querySelector('#optionsContainer');
        optionsContainer.innerHTML = '';
    
        const selectIngredientButton = document.querySelector('#select-ingredient-button');
        selectIngredientButton.disabled = false;
    
        this.selectedIngredientNames = []; // Reset selectedIngredientNames to an empty array
      }

// to give an options to the user if the selected combination produces some product
    
displayRecipes(selectedIngredientsStrings) {
  let optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  let optionsExist = false;
  dishes.forEach((dish) => {
    let hasAllIngredients = dish.ingredients.every(v => selectedIngredientsStrings.includes(v.toLowerCase()));
    if (hasAllIngredients) {
      let optionDiv = document.createElement('div');
      optionDiv.classList.add('option');

      let nameP = document.createElement('p');
      nameP.innerText = dish.name;
      optionDiv.appendChild(nameP);

      optionsContainer.appendChild(optionDiv);

      optionsExist = true;
    }
  });

  if (optionsExist) {
    let message = document.createElement('p');
    message.innerText = 'You may order any of the below:';
    optionsContainer.insertBefore(message, optionsContainer.firstChild);
  }
}
   // to display matching ingredients
    displaySelectedIngredients() {
      const availableIngredientsList = document.querySelector('#available-ingredients');
      const selectedIngredientsList = document.querySelector('#selected-ingredients');
      const selectedIngredients = [...availableIngredientsList.querySelectorAll('li'), ...selectedIngredientsList.querySelectorAll('li')];
     // console.log(selectedIngredients)

      let selectedIngredientsStrings = selectedIngredients.filter(ingredient => selectedIngredientsList.contains(ingredient)).map((li) => li.textContent.toLowerCase())
      //  console.log(selectedIngredientsStrings);
      this.displayRecipes(selectedIngredientsStrings);
      const selectedIngredientsListContent = selectedIngredients.filter(ingredient => selectedIngredientsList.contains(ingredient)).map(ingredient => `<li>${ingredient.textContent}</li>`).join('');
      selectedIngredientsList.innerHTML = selectedIngredientsListContent;
      console.log (selectedIngredientsListContent)
    }
  }
  
  const ingredientList = new IngredientList();
  

// Get a reference to the reset button element
const resetBtn = document.getElementById('reset-button');

// Add an event listener to the reset button
resetBtn.addEventListener('click', () => {
  // Get a reference to the selected ingredients list element
  const selectedList = document.querySelector('#selected-ingredients');

  // Clear the list of selected ingredients
  selectedList.innerHTML = '';

  // Get a reference to the list of displayed options element
  const optionsList = document.querySelector('#options-list');

  // Clear the list of displayed options
  optionsContainer.innerHTML = '';
});