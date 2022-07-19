export type Player = 1 | 2;
export type Board = Array<Array<number>>;

const prompt = require('prompt-sync')();
const rows = 6;
const columns = 7;

export class Game {
  private _board: Board;
  private _turn: Player;
  private _moveCount: number;

  constructor(private _winningSequenceLength: number) {
    this._board = Array(rows)
      .fill(0)
      .map((row) => Array(columns).fill(0));
    this._turn = 1;
    this._moveCount = 0;
  }

  startGame(): void {
    console.log(
      "Let's play! The first player to get 2 pieces of the same color vertically, horizontally, or diagonally wins.\n"
    );
    this.printBoard();
    this.takeTurn();
  }

  private printBoard(): void {
    for (let i = 0; i < rows; i++) {
      let line = '';
      for (let j = 0; j < columns; j++) {
        line += `${this._board[i][j]} `;
      }
      console.log(line.trim());
    }
    console.log('\n');
  }

  private takeTurn(): void {
    let slot = prompt(`Player ${this._turn}'s turn: `);
    slot = this.isValidMove(slot)
      ? slot
      : prompt(`Invalid Move! Player ${this._turn}'s turn: `);

    this.move(parseInt(slot));
  }

  private isValidMove(slot: string): Boolean {
    return parseInt(slot) < columns && this._board[0][parseInt(slot)] === 0;
  }

  private move(slot: number): void {
    let row: number = 0;

    for (let i = 0; i < rows; i++) {
      row = rows - 1 - i;
      if (this._board[row][slot] === 0) {
        this._board[row][slot] = this._turn;
        break;
      }
    }
    this.printBoard();
    this._moveCount++;

    if (this.checkForWin(row, slot)) {
      console.log(`Player ${this._turn} wins!`);
      process.exit();
    }

    if (this.checkForDraw()) {
      console.log(`Game ends in a draw!`);
      process.exit();
    }

    this._turn = this._turn === 1 ? 2 : 1;
    this.takeTurn();
  }

  private checkForDraw() {
    return this._moveCount >= 42;
  }

  private checkForWin(row: number, column: number): Boolean {
    return (
      this.horizontalCheck(row, column) ||
      this.verticalCheck(row, column) ||
      this.diagonalUpCheck(row, column) ||
      this.diagonalDownCheck(row, column)
    );
  }

  private horizontalCheck(row: number, column: number): Boolean {
    for (
      let j = Math.max(0, column + 1 - this._winningSequenceLength);
      j < Math.min(columns, column - 1 + this._winningSequenceLength);
      j++
    ) {
      let results: Boolean[] = [];

      for (let k = 0; k < this._winningSequenceLength; k++) {
        if (this._board[row][j + k] === this._turn) results.push(true);
      }

      if (results.length === this._winningSequenceLength) return true;
    }

    return false;
  }

  private verticalCheck(row: number, column: number): Boolean {
    for (
      let i = row;
      i <
      Math.min(
        rows + 1 - this._winningSequenceLength,
        row - 1 + this._winningSequenceLength
      );
      i++
    ) {
      let results: Boolean[] = [];

      for (let k = 0; k < this._winningSequenceLength; k++) {
        if (this._board[i + k][column] === this._turn) results.push(true);
      }

      if (results.length === this._winningSequenceLength) return true;
    }

    return false;
  }

  private diagonalUpCheck(row: number, column: number): Boolean {
    for (let i = 0; i < rows + 1 - this._winningSequenceLength; i++) {
      for (let j = rows - 1; j > rows + 2 - this._winningSequenceLength; j--) {
        let results: Boolean[] = [];

        for (let k = 0; k < this._winningSequenceLength; k++) {
          if (this._board[i + k][j - k] === this._turn) results.push(true);
        }

        if (results.length === this._winningSequenceLength) return true;
      }
    }
    return false;
  }

  private diagonalDownCheck(row: number, column: number): Boolean {
    for (let i = 0; i < rows + 1 - this._winningSequenceLength; i++) {
      for (let j = 0; j < columns + 1 - this._winningSequenceLength; j++) {
        let results: Boolean[] = [];

        for (let k = 0; k < this._winningSequenceLength; k++) {
          if (this._board[i + k][j + k] === this._turn) results.push(true);
        }

        if (results.length === this._winningSequenceLength) return true;
      }
    }

    return false;
  }
}
