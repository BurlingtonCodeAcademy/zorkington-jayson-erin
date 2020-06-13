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
    canChangeTo: ['roomFive', 'roomTwo']
  },
  'roomFive': {
    canChangeTo: []
  }
}


let player = {

  inventory: [], //anything in "[]" can be .pop() and .push() to it from other "[]". A function will send them there from another object's inventory.
  escape() {

  }
}

// let keypad = {
//   name: "keypad",
//   desc: "On the door to the main entrace to the building there is a keypad that requires a passcode to unlock.",
//   enter(code) {
//     if (code === '1234') {
//       console.log("You unlocked the door and entered the building.")
//       return true;
//     } else {
//       console.log("Wrong code, try again.")
//       return false;
//     }
//   }
// }

class Room {
  constructor(name, description, locked) {
    this.name = name
    this.description = description
    this.locked = locked
  }
}

// five rooms
let roomOne = new Room("Room 1", "There's a desk with a broken leg in the middle of the room.", false)
let roomTwo = new Room("Room 2", "There's a dusty carpet at your feet and a door on the opposite side of the room with a keypad on it.", false)
let roomThree = new Room("Room 3", "There's a grandfather clock on the wall.", false)
let roomFour = new Room("Room 4", "There's a janky cabinet falling off of the wall.", true)
let roomFive = new Room("Room 5", "There's an ax hanging from the ceiling.", true)



class Items {
  constructor(name, description, takeable) {
    this.name = name
    this.description = description
    this.takeable = takeable
  }
  examine() {
    console.log(this.description)
  }
  take() {
    if (this.takeable === true) {
      let item = this
      player.inventory.push(item)
      console.log(`You've added ${item.name} to your inventory!`)
    } else {
      console.log("You can't take this!")
    }
  }
}

function showInventory() {
  let inventoryArray = player.inventory.map((item) => {
    return item.name
  })
  console.log("You have the following items: ")
  inventoryArray.forEach((item) => console.log(item))
  return
}


// sign - room 1
let sign = new Items("sign", "There a code on the sign that reads, '1234'.", false)

// desk - room 1
let deskRoomOne = new Items("desk", "One of the drawers is halfway open and you see a key...", true)

// key - room 1
let keyRoomOne = new Items("key", "There's a key in the drawer...", true)

// carpet - room 2
let carpetRoomTwo = new Items("carpet", "You can see the corner of a piece of paper sticking out from underneath...", false)

// paper - under carpet in room 2
let paper = new Items("paper", "On the piece of paper there is a 5 digit code and instructions to enter '12345' onto the door's keypad...", true)

// keypad - on exit door from room 2 to room 3
let keypad = new Items("keypad", "The keypad has buttons labeled 1 - 9. Would you like to try to unlock the keypad?", false)
// answering no can lead you to an unlocked door?

// moltov cocktail - if you use it the building burns down and you die - process.exit()
let molotov = new Items("moltov cocktail", "There's a moltov cocktail in the middle of the room. What would you like to do with it?", true)

// rock (room 3) - throw it through the window to escape?
let rock = new Items("rock", "There's a rock on a window ledge.", true)

// clock (room 3) - Upon interaction the cuckoo bird pops out and scares you.
let clock = new Items("clock", "The time is stuck at 12.", false)

// old wooden cabinet (room 4)
let cabinet = new Items("cabinet", "It's covered in dust...", false)

// snickers bar (room 4)
let snickers = new Items("snickers", "There is a delicious snickers bar. Perfect timing because all this walking has made you hungry!", true)

// axe (room 5) - "You notice a large axe leaning against the wall. There are no other doors or windows in the room, but you give the wall a tap and notice that it's very thin..."
let axe = new Items("ax", "It's rusty, but sharp...", true)

//Lookup table for linking item(string) to item(object)
let lookupTable = {
  "take desk": deskRoomOne,
  "examine desk": deskRoomOne,
  "take key": keyRoomOne,
  "examine key": keyRoomOne,
  "take sign": sign,
  "examine sign": sign,
  "take carpet": carpetRoomTwo,
  "examine carpet": carpetRoomTwo,
  "take keypad": keypad,
  "examine keypad": keypad,
  "take molotov cocktail": molotov,
  "examine molotov cocktail": molotov,
  "take rock": rock,
  "examine rock": rock,
  "take clock": clock,
  "examine clock": clock,
  "take cabinet": cabinet,
  "examine cabinet": cabinet,
  "take snickers bar": snickers,
  "examine snickers bar": snickers,
  "take axe": axe,
  "examine axe": axe,
  "take paper": paper,
  "examine paper": paper
};


start()
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
  let answer = await ask("What would you like to do? ")
  if (answer === '1234') {
    console.log(`The door unlocked and you have entered the building. You're in Room 1. ${roomOne.description} What would you like to do?`)
    return gamePlay()
  } else if (answer.toLowerCase().includes("take")) {
    lookupTable[answer].take()
    return gamePlay()
  } else if (answer.toLowerCase().includes("examine")) {
    lookupTable[answer].examine()
    return gamePlay()
  } else if (answer.toLowerCase() === "show inventory") {
  showInventory()
  return gamePlay()
  } else if (answer.toLowerCase() === "open door") {
    if (player.inventory.includes(keyRoomOne)) {
      player.inventory.pop()
      console.log(`You're now in Room 2!\n${roomTwo.description}`)
      return gamePlay()
    } else {
      console.log("The door is locked!")
      return gamePlay()
    }
  } else {
  console.log("You've entered the wrong combo. Try again!")
  return gamePlay()
  }
}


// async function start() {
//   const welcomeMessage = `182 Main St.
// You are standing on Main Street between Church and South Winooski.
// There is a door here. A keypad sits on the handle.
// On the door is a handwritten sign. Would you like to read the sign? `;
//   let answer = await ask(welcomeMessage);

//   if (answer.toLowerCase() === "yes") {
//     let answer = await ask("The sign reads: Welcome to 182 Main St! If you'd like to come inside, enter '1234': ")

//     while (answer !== '1234') {
//       answer = await ask("Wrong code! Try again!: ")
//     }
//     if (answer === '1234') {
//       console.log(`The door unlocked and you have entered the building. You're in Room 1. ${roomOne.description}`)
//       let answer = await ask("What would you like to do? ")
//     }   if (answer === "take" && deskRoomOne.take() === true) {
//         console.log("You've added this item to your inventory!")
//     }

//   } else if (answer.toLowerCase() === "no") {
//     console.log("Ok! You don't have to play. See you next time.")
//     process.exit()
//   } else if (answer.toLowerCase() === "take" && this.item.takeable) {
//     console.log("item added")
//   } else {
//     console.log(`Sorry I don't know how to ${answer}.`)
//     start()
//   }
// }