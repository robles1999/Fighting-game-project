//----------------- PLAYER CLASS DECLARATION ----------------------------------

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  //----------- ATTACK AN ENEMY WITH A RANDOM NUMBER --------------------------

  strike(player, enemy, attackDmg) {
    // Get random number between 1 - 10 and that is damageAmount
    let damageAmt = Math.ceil(Math.random() * attackDmg);

    // Subtract the enemy health with the damageAmount
    enemy.health -= damageAmt;

    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, gameState);

    //  Return a message of 'player name attacks enemy name for damageAmount'
    return `${player.name} attacked ${enemy.name} with a damage power of ${damageAmt}!`;
  }

  //----------- HEAL PLAYER WITH A RANDOM NUMBER FROM 1 TO 5 ------------------

  heal(player) {
    // Get random number between 1 - 5 and store that in hpAmount
    let healAmt = Math.ceil(Math.random() * 5);

    // Add hpAmount to players health
    player.health += healAmt;

    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, gameState);
    //  Return a message of 'player name heals for hpAmount HP'
  }
}

//----------------------- GAME CLASS DECLARATION ------------------------------

class Game {
  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver, p1, p2) {
    if (isOver && p2.health <= 0) {
      result.innerHTML = `${p1.name}` + " Wins!";
    } else {
      // Else if isOver is true AND p2 health is <= 0 then update message variable  to 'p2 WINS!'
      result.innerText = `${p2.name}` + " Wins!";
    }

    // Play victory sound
    document.getElementById("victory").play();
    // Return message variable
  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1, p2) {
    p1.health = p2.health = 100;
    game.isOver = false;
    gameState = game.isOver;
    result.innerText = "";
    updateGame(p1, p2, gameState);
  }

  //---------------------------- SIMULATION -----------------------------------

  simulate(p1, p2) {
    this.reset(p1, p2);
    let count = 0;
    // while (this.isOver === false) {
    while (!this.isOver) {
      count++;
      // Make sure both players get strike() and heal() once each loop
      if (p2.health > 0 && !this.isOver) {
        p2.heal(p2);
        p1.strike(p1, p2, p1.attackDmg);
      }
      if (p1.health > 0 && !this.isOver) {
        p1.heal(p1);
        p2.strike(p2, p1, p2.attackDmg);
      }
    }
    console.log(count);
  }
}

//---------------------- DOM ELEMENTS TO BE USED ------------------------------

let simulateButton = document.getElementById("simulate");
let resultDiv = document.getElementById("result");
let p1NameDiv = document.getElementById("p1Name");
let p2NameDiv = document.getElementById("p2Name");
let p1HealthDiv = document.getElementById("p1Health");
let p2HealthDiv = document.getElementById("p2Health");

//-------------------------- UPDATE THE DOM -----------------------------------

const updateGame = (p1, p2, gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerText = p1.name;
  p1HealthDiv.innerText = p1.health;
  p2NameDiv.innerText = p2.name;
  p2HealthDiv.innerText = p2.health;

  // IF either player health is <= 0 then set isOver to true and declareWinner
  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver;
    game.declareWinner(gameState, p1, p2);
  }
};

//--------- CREATE 2 PLAYERS USING THE PLAYER CLASS ----------------------

let p1 = new Player("Eli", 100, 7);
let p2 = new Player("Luis", 100, 7);

//-------- CREATE GAME OBJECT USING THE GAME CLASS --------------------

const game = new Game();

// ** Save inItial isOver from the game object inside this variable **
let gameState = game.isOver;

// ** Initialize the game by calling updateGame() **
updateGame(p1, p2, gameState);

alert("Make sure CAPS LOCK is off before beginning the game.");

// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
simulateButton.addEventListener("click", () => game.simulate(p1, p2));

//--------------------- PLAYER 1 CONTROLS -------------------------------------

document.addEventListener("keydown", function (e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if (e.key === "q" && p2.health > 0 && game.isOver == false) {
    console.log(p1.strike(p1, p2, p1.attackDmg));
    // After striking then play attack sound
    document.getElementById("p1attack").play();
  }
});

document.addEventListener("keydown", function (e) {
  // if you press a AND the player health is greater than 0 AND isOver is still false then heal()
  if (e.key === "a" && p1.health > 0 && game.isOver == false) {
    p1.heal(p1);
    // After healing then play heal sound
    document.getElementById("p1heal").play();
  }
});

//--------------------- PLAYER 2 CONTROLS -------------------------------------

document.addEventListener("keydown", function (e) {
  // if you press p AND enemy health is greater than 0 AND isOver is still false then strike()
  if (e.key === "p" && p1.health > 0 && !game.isOver) {
    console.log(p2.strike(p2, p1, p2.attackDmg));
    // After striking then play attack sound
    document.getElementById("p2attack").play();
  }
});

document.addEventListener("keydown", function (e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  if (e.key === "l" && p2.health > 0 && !game.isOver) {
    p2.heal(p2);
    // After healing then play heal sound
    document.getElementById("p2heal").play();
  }
});
