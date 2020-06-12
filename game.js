const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

async function start() {
  let answer = await ask(`182 Main St.
  You are standing on Main Street between Church and South Winooski.
  There is a door here. A keypad sits on the handle.
  On the door is a handwritten sign. Would you like to read the sign? `)
  if (answer.toLowerCase() === "yes") {
    console.log("The sign reads: Welcome to 182 Main St! If you'd like to come inside, enter '1234': ")
    gamePlay()
  } else {
    start()
  }
}

async function gamePlay() {
  let answer = await ask(">")
    if (answer === '1234') {
      console.log(`The door unlocked and you have entered the building. You're in Room 1. ${roomOne.description} What would you like to do?`)
      return gamePlay()
      

    }
  
}