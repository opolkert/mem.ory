 let cardImages = [
  '1.png', '2.png', '3.png', '4.png',
  '5.png', '6.png', '7.png', '8.png',
  '1.png', '2.png', '3.png', '4.png',
  '5.png', '6.png', '7.png', '8.png'
];

const board = document.querySelector('.game-board');
const startButton = document.getElementById('startButton');
const triesCounter = document.getElementById('triesCounter');

let canClick = false;
let allCards = [];
let firstCard = null;
let secondCard = null;
let matchedPairs = 0;
let tries = 0;

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

const updateTries = () => {
  tries++;
  triesCounter.textContent = `Попытки: ${tries}`;
};

const checkMatch = () => {
  const [img1, img2] = [
    firstCard.querySelector('img').src,
    secondCard.querySelector('img').src,
  ];

  if (img1 === img2) {
    matchedPairs++;
    [firstCard, secondCard] = [null, null];
    canClick = true;

    if (matchedPairs === cardImages.length / 2) {
      setTimeout(() => {
        alert(`Поздравляю! Ты нашёл все пары за ${tries} попыток.`);
      }, 300);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      [firstCard, secondCard] = [null, null];
      canClick = true;
    }, 1000);
  }
};

const handleCardClick = card => {
  if (!canClick 
    || card.classList.contains('flipped') 
    || secondCard) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    canClick = false;
    updateTries();
    checkMatch();
  }
};

const createCard = imgSrc => {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = 'images/' + imgSrc;
  img.alt = imgSrc;
  card.appendChild(img);

  card.addEventListener('click', () => handleCardClick(card));

  return card;
};

const createCards = () => {
  board.innerHTML = '';
  allCards = [];
  const shuffled = shuffle([...cardImages]);

  shuffled.forEach(imgSrc => {
    const card = createCard(imgSrc);
    board.appendChild(card);
    allCards.push(card);
  });
};

const startGame = () => {
  [tries, matchedPairs, firstCard, secondCard] = [0, 0, null, null];
  triesCounter.textContent = 'Попытки: 0';
  canClick = false;

  createCards();

  allCards.forEach(card => card.classList.add('flipped'));
  setTimeout(() => {
    allCards.forEach(card => card.classList.remove('flipped'));
    canClick = true;
  }, 3000);
};

startButton.addEventListener('click', startGame);
