import { Game } from './Game';

function main() {
  const prompt = require('prompt-sync')();

  let n = prompt(
    'You are playing Connect 2! Please, enter the amount of pieces needed to connect for winning a match '
  );

  n =
    n < 2 || n > 5
      ? prompt(
          'The number you entered is invalid. Please, enter a number between 2 and 5 '
        )
      : n;

  const game = new Game(parseInt(n));
  game.startGame();
}

main();
