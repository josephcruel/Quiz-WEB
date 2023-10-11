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

    updateCurrentText() 
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

