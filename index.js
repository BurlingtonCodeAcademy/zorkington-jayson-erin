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
  'roomFive': {
    canChangeTo: []
  }
}



let player = {

  inventory: [], //anything in "[]" can be .pop() and .push() to it from other "[]". A function will send them there from another object's inventory.
  trapped: true,
  facing: 'north',
  escape() {
      
}
}

let keypad = {
  name: "keypad",
  desc: "On the door to the main entrace to the building there is a keypad that requires a passcode to unlock.",
  enter(code) {
    if (code === '1234') {
      console.log("You unlocked the door and entered the building.")
      return true;
    } else {
      console.log("Wrong code, try again.")
      return false;
    }
  }
}

let desk = {
  name: "desk",
  desc: "There's a desk in the entryway. One of the drawers is halfway open..."
}

let carpet = {

}


start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign. Would you like to read the sign? `;
  let answer = await ask(welcomeMessage);
  
  if (answer.toLowerCase() === "yes") {
    let answer = await ask("Welcome to 182 Main St! If you'd like to come inside, enter '1234': ") {
      if (answer === '1234')
      console.log("The door unlocked and you have entered the building. Inside the room you notice a desk" )


  } else if (answer.toLowerCase() === "no") {
    console.log("Ok! You don't have to play. See you next time.")
    process.exit()
  } else {
    console.log(`Sorry I don't know how to ${answer}.`)
    start()
  }
}
