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
