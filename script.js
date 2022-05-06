let userInputs = ['<strong>HISTORY</strong>'];
let numbersAndFrequencies = [];
const displayScreen = document.querySelector('.displayScreen');
const history = document.querySelector('.history');
const textBox = document.querySelector('.textBox');
const appInput = document.querySelector('.appInput');
const userInput = document.querySelector('.userInput');
const button = document.querySelector('.button');
let currentInterval;
const letters = /^[A-Za-z]+$/;
const numbers = /^[0-9]+$/;
let fibArray = [];

/**
 * Class for objects that store numbers entered and their frequencies.
 */
class numberAndFrequency {
  constructor(number, frequency) {
    this.number = number;
    this.frequency = frequency;
  }

  get getNumber() {
    return this.number;
  }
  get getFrequency() {
    return this.frequency;
  }

  setFrequency(frequency) {
    this.frequency = frequency;
  }
  setNumber(number) {
    this.frequency = number;
  }
}

// current user
let user = {
  name: '',
  timeInterval: -1,
  halt: false,
};

/**
 * Captures the user's input
 * @returns string
 */
function captureUserInput() {
  let text = userInput.value;
  userInput.value = '';
  return text;
}

/**
 * Initial function attached to the submit button
 * Sets the current user's name
 * Outputs a message to displyScreen
 * Changes the button's onclick property to setFrequency
 */
function nameEntered() {
  enteredName = captureUserInput();
  updateHistory(enteredName);
  if (!enteredName.match(letters)) {
    newComputerMessage(['>>Please only use Letters']);
  } else if (
    enteredName.toLowerCase() === 'halt' ||
    enteredName.toLowerCase() === 'resume' ||
    enteredName.toLowerCase() === 'quit'
  ) {
    newComputerMessage(['>>Please enter your name before issuing commands']);
  } else {
    user.name = enteredName;
    newComputerMessage([
      '>>Hello there ' + user.name + ',',
      'please input the amount of time in seconds',
      'between emitting numbers and their frequency:',
    ]);
    button.onclick = setFrequency;
  }
}

/**
 * Takes an array of strings and outputs them to displayScreen
 * Workarounds for adding/removing classes for the typing affect
 * Includes timeout function to ensure each message finishes before the next begins
 * @param {Array<T>} messages
 */
function newComputerMessage(messages) {
  for (let index = 0; index < messages.length; index++) {
    const newDivElement = document.createElement('div');
    newDivElement.setAttribute('class', 'individualTextContainer');
    const newPElement = document.createElement('p');
    newPElement.innerHTML = messages[index];
    newPElement.setAttribute('class', 'computerText');
    newDivElement.appendChild(newPElement);
    setTimeout(() => {
      textBox.lastElementChild.firstElementChild.classList.remove(
        'computerText'
      );
      textBox.lastElementChild.firstElementChild.classList.add(
        'computerTextNone'
      );
      textBox.appendChild(newDivElement);
    }, 2000 * index);
  }
}

/**
 * Takes a string as a parameter, adds and displays it in the history collumn
 * @param {String} userInputText
 */
function updateHistory(userInputText) {
  userInputs.push(userInputText);
  let historyString = '';
  for (let index = 0; index < userInputs.length; index++) {
    if (userInputs[index] === '') {
      historyString += 'null' + '<br />';
    } else {
      historyString += userInputs[index] + '<br />';
    }
  }

  history.innerHTML = historyString;
}

/**
 * Sets the frequency of displayUserInputs
 * Changes the button's onclick property to enterNumber
 */
function setFrequency() {
  let intervalTime = captureUserInput();
  if (
    intervalTime.toLowerCase() === 'halt' ||
    intervalTime.toLowerCase() === 'resume' ||
    intervalTime.toLowerCase() === 'quit'
  ) {
    newComputerMessage([
      '>>Please enter the interval time before issuing',
      'commands',
    ]);
  } else if (!intervalTime.match(numbers)) {
    newComputerMessage(['>>Please only use numbers']);
  } else {
    updateHistory(intervalTime);
    user.timeInterval = intervalTime;
    newComputerMessage(['>>Please enter the first number:']);
    button.onclick = enterNumber;
    intervals();
  }
}

/**
 * Main function
 * Takes in user's input (with validations)
 * Displaying a message depending on user input
 * Storing any numbers entered in the numbersAndFrequencies array
 * Checks for Fibonacci
 * @returns null
 */
function enterNumber() {
  let found = false;
  let enteredNumber = captureUserInput();
  updateHistory(enteredNumber);
  if (
    enteredNumber != 'halt' &&
    enteredNumber != 'resume' &&
    enteredNumber != 'quit' &&
    !enteredNumber.match(numbers)
  ) {
    newComputerMessage([
      '>>Please only enter numbers, or accepted commands ',
      '(halt, resume, quit)!',
      '>>Please enter the next number:',
    ]);
    return;
  } else if (enteredNumber === 'halt') {
    if (!user.halt) {
      user.halt = true;
      newComputerMessage(['>>Timer halted', '>>Please enter the next number:']);
    } else if (user.halt) {
      newComputerMessage([
        '>>Timer already halted',
        '>>Please enter the next number:',
      ]);
    }
    return;
  } else if (enteredNumber === 'resume') {
    if (user.halt) {
      user.halt = false;
      intervals();
      newComputerMessage([
        '>>Timer resumed',
        '>>Please enter the next number:',
      ]);
      return;
    } else {
      newComputerMessage([
        '>>Timer is already going',
        '>>Please enter the next number:',
      ]);
      return;
    }
  } else if (enteredNumber === 'quit') {
    user.intervalTime = -1;
    displayUserEntries();
    clearInterval(currentInterval);
    newComputerMessage(['>>Thank you for playing, press any key to exit.']);
    exitGame();
    return;
  } else {
    for (let index = 0; index < numbersAndFrequencies.length; index++) {
      if (numbersAndFrequencies[index].number === Number(enteredNumber)) {
        found = true;
        numbersAndFrequencies[index].setFrequency(
          numbersAndFrequencies[index].getFrequency + 1
        );
      }
    }
    if (!found) {
      numbersAndFrequencies.push(
        (newEntry = new numberAndFrequency(Number(enteredNumber), 1))
      );
    }
    if (fibArray.includes(Number(enteredNumber))) {
      newComputerMessage(['>>FIB']);
    }
    numbersAndFrequencies.sort((a, b) => (a.frequency > b.frequency ? -1 : 1));
    // checkFib(Number(enteredNumber));
  }
  newComputerMessage(['>>Please enter the next number:']);
}

/**
 * Sets the interval based on the current user's timeInterval
 */
function intervals() {
  currentInterval = setInterval(displayUserEntries, user.timeInterval * 1000);
}
/**
 * Displays the numbersAndFrequencies in a string
 * Clears interval if user enters 'halt'
 */
function displayUserEntries() {
  if (!user.halt && user.timeInterval > 0) {
    let entriesString = [];
    for (let index = 0; index < numbersAndFrequencies.length; index++) {
      entriesString.push(
        ' ' +
          numbersAndFrequencies[index].number +
          ':' +
          numbersAndFrequencies[index].frequency
      );
    }
    newComputerMessage(['>>' + entriesString]);
  } else {
    clearInterval(currentInterval);
  }
}

/**
 * Quits the game on keydown
 */
function exitGame() {
  document.addEventListener('keydown', () => {
    window.close();
  });
}

/**
 * Creates an array of Fibonacci numbers up to 1000 places
 */
function fibonacci() {
  fibArray[0] = 0;
  fibArray[1] = 1;
  for (i = 2; i < 1000; i++) {
    fibArray[i] = fibArray[i - 2] + fibArray[i - 1];
  }
  // console.log(fibArray.length);
}

fibonacci();

/**
 * Checks whether a number is in the first 1000 places of Fibonacci
 * @param {Number} n
 * @returns a boolean
 */
function checkFib(n) {
  let a = 0;
  let b = 1;
  if (n === a || n === b) {
    console.log(true);
    return true;
  }
  let c = a + b;
  while (c < 1000) {
    if (c == n) {
      console.log(true);
      return true;
    }
    a = b;
    b = c;
    c = a + b;
  }
  console.log(false);
  return false;
}
