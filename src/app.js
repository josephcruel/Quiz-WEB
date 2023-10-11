//DOM Selector

const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentElement = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionElement = document.getElementById('question')
const answerElement = document.getElementById('answer')
const addQuestionBtn = document.getElementById('add-question')
const clearBtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')


// Keep track of current card

let currentActive = 0;

//Store DOM Cards
const cardsElement = []

//Store card data
const cardData = getCardData()

function createCards() {
    cardsData.forEach((data, index) => createCards(data, index)); //loop through the 
}

function createCard(data, index) { //Each cars will contain a question and answer
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
      <div class="inner-card-back">
      <p>
      ${data.answer}
      </p>
    </div>
    </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    //Add to DOM cards
    cardsElement.push(card);

    cardsContainer.appendChild(card); // Put in the container

    updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
    currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`; // Add 1 to it because it's 0 by default
}

// Get cards from local storage
function getCardData() {
    //local storage only store string so we will take the array fetch back as an array by using parse
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards; // if the cards are null return an empty array
}

// Add card to local storage
function setCardData(cards) {
    // Adding a card to the array and overwrite the array in storage
    localStorage.setItem('cards', JSON.stringify(cards)); // We want to return it into a string
    window.location.reload(); // To reflect on the DOM
}

createCards();

// Event listeners

// Next Buttom 
nextBtn.addEventListener('click', () => {
    cardsElement[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1; // If we are at 1 it will 2 and so on 

    // We need to set the index on the last card.
    if (currentActiveCard > cardsElement.length - 1) {  // -1 because the array base is 0
        currentActiveCard = cardsElement.length - 1; 
    }

    cardsElement[currentActiveCard].className = 'card active';  // Set the next card active by overwriting class name and gives the event   

    updateCurrentText(); // To update the card numbers
});

// Previous Button
prevBtn.addEventListener('click', () => {
    currentElement[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1; // -1 for going back
    
    if (currentActiveCard < 0) {  // To prevent going pass 0
      currentActiveCard = 0; // Set current to 0
    }

    cardsElement[currentActiveCard].className = 'card active';  // Set the next card active by overwriting class name and gives the event   

    updateCurrentText(); // To update the card numbers
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show')); // Add show class which will present out form ca
// Hide add container 
hideBtn.addEventListener('click', () => addContainer.classList.remove('show')); // Add the hide cointainer CSS style.

// Add new card
addQuestionBtn.addEventListener('click', () => {
    const question = questionElement.value; // Getting values from the form
    const answer = answerElement.value; //Getting values from the form
    console.log(question , answer)

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer }; // Create a new card object

        createCard(newCard);
        
        questionElement.value = ''; // Clear the form inputs
        answerElement.value = ''; // Clear the form inputs

        addContainer.classList.remove('show'); // Hide class container

        cardsData.push(newCard); // Add new card to the array 
        setCardsData(cardsData); // Passing to storage
    }
});

// Clear cards button 
clearBtn.addEventListener('click', () => {
    localStorage.clear(); // Using clear method
    cardsContainer.innerHTML = ''; // Take the cards out of the DOM
    window.location.reload(); // Then reloadiong to update the page 
})