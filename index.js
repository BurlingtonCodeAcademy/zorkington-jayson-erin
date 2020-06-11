const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines
let states = {
  'roomOne': {
    canChangeTo: ['roomTwo', 'roomFour']
  },
  'roomTwo': {
    canChangeTo: ['roomThree', 'roomFive']
  },
  'roomThree': {
    canChangeTo: ['roomFour', 'roomFive']
  },
  'roomFour': {
    canChangeTo: ['roomFive', 'room2']
  },
  'roomFive': { canChangeTo: []}
}

let currentState = "green";

function enterState(newState) {
  let validTransitions = states[currentState].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentState = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign. Would you like to enter Room 1?`;
  let answer = await ask(welcomeMessage);
  if (answer.toLowerCase() === "yes") {
    console.log("Entering Room 1...")
  } else if (answer.toLowerCase() === "no") {
    console.log("Ok! You don't have to play. See you next time.")
    process.exit()
  } else {
    console.log("Your answer is invalid. Try again.")
    start()
  }
}

while (userAnswer !== exit)

