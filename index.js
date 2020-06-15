const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let states = {
  outsideRoom: {
    canChangeTo: ["roomOne"],
  },
  roomOne: {
    canChangeTo: ["roomTwo"],
  },
  roomTwo: {
    canChangeTo: ["roomThree"],
  },
  roomThree: {
    canChangeTo: ["roomFour"],
  },
  roomFour: {
    canChangeTo: ["roomFive"],
  },
  roomFive: {
    canChangeTo: [],
  },
};

let player = {
  inventory: [],
  currentRoom: "outsideRoom",
};

class Room {
  constructor(name, description, locked, inventory) {
    this.name = name;
    this.description = description;
    this.locked = locked;
    this.inventory = inventory;
  }
}

// five rooms + outside
let outsideRoom = new Room(
  "Outside",
  "You are outside looking at the spooky house.",
  false,
  ["sign"]
);
let roomOne = new Room(
  "Room 1",
  "You look around.\nThere's a locked door on the opposite wall. There's also a desk with a broken leg in the middle of the room.",
  false,
  ["desk", "key"]
);
let roomTwo = new Room(
  "Room 2",
  "There's a dusty carpet at your feet and a door on the opposite side of the room with a keypad on it.",
  false,
  ["carpet", "paper", "keypad"]
);
let roomThree = new Room(
  "Room 3",
  "There are no doors in the room, but you notice a window on the far wall with a rock sitting on the ledge.\nThrough the window you can see there's another room.",
  false,
  ["rock"]
);
let roomFour = new Room(
  "Room 4",
  "There's an Ogre drooling with hunger blocking your exit. He demands to be fed to open the door.\nYou notice a snickers bar on the floor....",
  true,
  ["snickers bar"]
);
let roomFive = new Room(
  "Room 5",
  "You look around the room and notice a locked door, but the only objects in the room are a molotov cocktail and an axe.",
  true,
  ["axe", "molotov cocktail"]
);

//allows tracking of room the player's in
function changeRoom(room) {
  if (states[player.currentRoom].canChangeTo.includes(room)) {
    player.currentRoom = room;
  }
}

class Items {
  constructor(name, description, takeable, dropable) {
    this.name = name;
    this.description = description;
    this.takeable = takeable;
    this.dropable = dropable;
  }

  examine() {
    console.log(this.description);
  }
  take() {
    if (this.takeable === true) {
      let item = this;
      player.inventory.push(item);
      console.log(`You've added ${item.name} to your inventory!`);
    } else {
      console.log("You can't take this!");
    }
  }
  drop() {
    if (this.dropable === true) {
      let item = this;
      player.inventory.pop(item);
      lookupTable[player.currentRoom].inventory.push(item.name);
      console.log(`You've dropped ${item.name} from your inventory.`);
    } else {
      console.log("You can't drop this.");
    }
  }
}

//show inventory function
function showInventory() {
  let inventoryArray = player.inventory.map((item) => {
    return item.name;
  });
  console.log("You have the following items: ");
  inventoryArray.forEach((item) => console.log(item));
  return;
}

// door - any room you could "inspect" a door - without it game will break.
let door = new Items(
  "door",
  "The door is locked. Look around the room for a way to unlock it.",
  false,
  false
);

// sign - room 1
let sign = new Items(
  "sign",
  "Building condemned, use caution. If you'd like to come in, enter '1234'.",
  false,
  true
);

// desk - room 1
let deskRoomOne = new Items(
  "desk",
  "One of the drawers is halfway open and you see a key inside...",
  true,
  true
);

// key - room 1
let keyRoomOne = new Items(
  "key", 
  "An old, rusty key.", 
  true, 
  true
  );

// carpet - room 2
let carpetRoomTwo = new Items(
  "carpet",
  "You can see the corner of a piece of paper sticking out from underneath...",
  false,
  true
);

// paper - under carpet in room 2
let paper = new Items(
  "paper",
  "On the piece of paper there is a 5 digit code and instructions to enter '12345' onto the door's keypad...",
  true,
  true
);

// keypad - on exit door from room 2 to room 3
let keypad = new Items(
  "keypad",
  "The keypad has buttons labeled 1 - 9. The keypad must be 'used' to unlock the door.",
  false,
  true
);

// rock (room 3) - throw it through the window to escape
let rock = new Items(
  "rock", 
  "There's a rock on a window ledge.", 
  true, 
  true
);

// clock (room 3) - Upon interaction the cuckoo bird pops out and scares you. - NOT IN STORY YET!
let clock = new Items(
  "clock", 
  "The time is stuck at 12.", 
  false, 
  true
);

// old wooden cabinet (room 4) - NOT IN STORY YET!
let cabinet = new Items(
  "cabinet", 
  "It's covered in dust...", 
  false, 
  true
);

// snickers bar (room 4)
let snickers = new Items(
  "snickers bar",
  "There is a delicious snickers bar. I hear ogres love snickers bars...",
  true,
  true
);

// moltov cocktail - room 5 if you use it the building burns down and you die - process.exit()
let molotov = new Items(
  "moltov cocktail",
  "There's a moltov cocktail in the middle of the room. What would you like to do with it?",
  true,
  true
);

// axe (room 5) - "You notice a large axe leaning against the wall. There are no other doors or windows in the room, but you give the wall a tap and notice that it's very thin..."
let axe = new Items(
  "axe", 
  "It's rusty, but sharp...", 
  true, 
  true
);

//Lookup table for linking item(string) to item(object)
let lookupTable = {
  
  //item section of lookup table
  "examine door": door,
  "look at door": door,
  "inspect door": door,
  "view door": door,

  "take desk": deskRoomOne,
  "pick up desk": deskRoomOne,
  "grab desk": deskRoomOne,
  "drop desk": deskRoomOne,
  "examine desk": deskRoomOne,
  "look at desk": deskRoomOne,
  "inspect desk": deskRoomOne,
  "view desk": deskRoomOne,

  "take key": keyRoomOne,
  "pick up key": keyRoomOne,
  "grab key": keyRoomOne,
  "drop key": keyRoomOne,
  "examine key": keyRoomOne,
  "look at key": keyRoomOne,
  "inspect key": keyRoomOne,
  "view key": keyRoomOne,

  "take sign": sign,
  "pick up sign": sign,
  "grab sign": sign,
  "drop sign": sign,
  "examine sign": sign,
  "look at sign": sign,
  "inspect sign": sign,
  "view sign": sign,

  "take carpet": carpetRoomTwo,
  "pick up carpet": carpetRoomTwo,
  "grab carpet": carpetRoomTwo,
  "drop carpet": carpetRoomTwo,
  "examine carpet": carpetRoomTwo,
  "look at carpet": carpetRoomTwo,
  "inspect carpet": carpetRoomTwo,
  "view carpet": carpetRoomTwo,

  "take paper": paper,
  "pick up paper": paper,
  "grab paper": paper,
  "drop paper": paper,
  "examine paper": paper,
  "look at paper": paper,
  "inspect paper": paper,
  "view paper": paper,

  "take keypad": keypad,
  "pick up keypad": keypad,
  "grab keypad": keypad,
  "drop keypad": keypad,
  "examine keypad": keypad,
  "look at keypad": keypad,
  "inspect keypad": keypad,
  "view keypad": keypad,

  "take rock": rock,
  "pick up rock": rock,
  "grab rock": rock,
  "drop rock": rock,
  "examine rock": rock,
  "look at rock": rock,
  "inspect rock": rock,
  "view rock": rock,
  "throw rock": rock,

  "take clock": clock,
  "pick up clock": clock,
  "grab clock": clock,
  "drop clock": clock,
  "examine clock": clock,
  "look at clock": clock,
  "inspect clock": clock,
  "view clock": clock,

  "take cabinet": cabinet,
  "pick up cabinet": cabinet,
  "grab cabinet": cabinet,
  "drop cabinet": cabinet,
  "examine cabinet": cabinet,
  "look at cabinet": cabinet,
  "inspect cabinet": cabinet,
  "view cabinet": cabinet,

  "take snickers bar": snickers,
  "pick up snickers bar": snickers,
  "grab snickers bar": snickers,
  "drop snickers bar": snickers,
  "examine snickers bar": snickers,
  "look at snickers bar": snickers,
  "inspect snickers bar": snickers,
  "view snickers bar": snickers,
  "use snickers bar": snickers,
  "feed the ogre": snickers,

  "take molotov cocktail": molotov,
  "pick up molotov cocktail": molotov,
  "grab molotov cocktail": molotov,
  "drop molotov cocktail": molotov,
  "examine molotov cocktail": molotov,
  "look at molotov cocktail": molotov,
  "inspect molotov cocktail": molotov,
  "view molotov cocktail": molotov,

  "take axe": axe,
  "pick up axe": axe,
  "grab axe": axe,
  "drop axe": axe,
  "examine axe": axe,
  "look at axe": axe,
  "inspect axe": axe,
  "view axe": axe,

  //room section of lookup table
  "outsideRoom": outsideRoom,
  "roomOne": roomOne,
  "roomTwo": roomTwo,
  "roomThree": roomThree,
  "roomFour": roomFour,
  "roomFive": roomFive,
};

async function useKeyPad() {
  let code = await ask("Enter code: ");
  if (code.includes("12345")) {
    return true;
  } else {
    return false;
  }
}

//starts game
start();
async function start() {
  let answer = await ask(
    `You are standing at the front door of a creepy old house.\nA keypad sits on the handle.\nOn the door is a handwritten sign. Would you like to read the sign?\n`
  );
  if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
    console.log(
      "The sign reads: Building condemned, use caution. If you'd like to come in, enter '1234': "
    );
    gamePlay();
  } else {
    console.log("Are you sure you don't want to read the sign?...");
    start();
  }
}

//recurring prompt
async function gamePlay() {
  let answer = await ask("What would you like to do?\n");
  if (answer.includes("1234")) {
    changeRoom("roomOne");
    console.log(
      `The door unlocked and you have entered the building. You're in Room 1. ${roomOne.description}`
    );
    return gamePlay();
  } else if (
    answer.toLowerCase().includes("take") ||
    answer.toLowerCase().includes("pick up") ||
    answer.toLowerCase().includes("grab")
  ) {
    if (
      lookupTable[player.currentRoom].inventory.includes(
        lookupTable[answer].name
      )
    ) {
      lookupTable[answer].take();
      return gamePlay();
    } else {
      console.log("This item isn't in the room you are currently in.");
      return gamePlay();
    }
  } else if (
    answer.toLowerCase().includes("examine") ||
    answer.toLowerCase().includes("look at") ||
    answer.toLowerCase().includes("inspect") ||
    answer.toLowerCase().includes("view")
  ) {
    lookupTable[answer].examine();
    return gamePlay();
  } else if (answer.toLowerCase().includes("drop")) {
    lookupTable[answer].drop();
    return gamePlay();
  } else if (answer === "xyzzy") {
    //cheat code
    console.log(
      "You entered the cheat code! Unfortunately in this game that means you die!!!....."
    );
    process.exit();
  } else if (answer.toLowerCase().includes("inventory")) {
    showInventory();
    return gamePlay();
  } else if (
    answer.toLowerCase() === "open door" ||
    answer.toLowerCase() === "use key" ||
    answer.toLowerCase() === "unlock door"
  ) {
    if (player.inventory.includes(keyRoomOne)) {
      player.inventory.pop();
      changeRoom("roomTwo");
      console.log(`You're now in Room 2!\n${roomTwo.description}`);
      return gamePlay();
    } else {
      console.log("The door is locked!");
      return gamePlay();
    }
  } else if (answer.toLowerCase() === "use keypad") {
    let canOpen = await useKeyPad();
    if (canOpen) {
      changeRoom("roomThree");
      console.log(`You're now in room 3!\n${roomThree.description}`);
    } else {
      console.log("Wrong combo. Try again.");
    }
    return gamePlay();
  } else if (
    answer.toLowerCase() === "throw rock" ||
    answer.toLowerCase() === "use rock"
  ) {
    if (player.inventory.includes(rock) && player.currentRoom === "roomThree") {
      player.inventory.pop();
      changeRoom("roomFour");
      console.log(
        `You smashed the window and crawled through.\nYou have entered Room 4!\n${roomFour.description}`
      );
      return gamePlay();
    }
  } else if (
    answer.toLowerCase() === "use snickers bar" ||
    answer.toLowerCase() === "feed ogre"
  ) {
    if (
      player.inventory.includes(snickers) &&
      player.currentRoom === "roomFour"
    ) {
      player.inventory.pop();
      changeRoom("roomFive");
      console.log(
        `You've fed the Ogre.\nNow that his hunger has been satisfied he opens the door for you and you enter room 5!\n${roomFive.description}`
      );
      return gamePlay();
    } else {
      console.log(
        "You have nothing to feed the ogre! Find something quick before he eats you!"
      );
      return gamePlay();
    }
  } else if (answer.toLowerCase() === "use molotov cocktail") {
    console.log(
      "You burned down the building and died inside... Better luck next time."
    );
    process.exit();
  } else if (answer.toLowerCase() === "use axe") {
    console.log(
      "You broke down the door and escaped!! Congratulations you escaped!"
    );
    process.exit();
  } else {
    console.log("Invalid input. Try again!");
    return gamePlay();
  }
}
