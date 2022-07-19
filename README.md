# Connect N
#### A console-based game built with TypeScript

## Getting Started

In order to get started, these steps must be followed:

1. Install dependencies
2. Run the app in the development mode

### Installing dependencies

In the project directory, you can run:

```sh
yarn install
```

or

```sh
npm install
```
### Run the app in the development mode

In the project directory, you can run:

```sh
yarn start
```

or

```sh
npm start
```

The app will load in the console, and you will be able to play the game. Enjoy it!

## Dev Notes
- The runtime complexity of the algorithm you use to determine if a player has won at the end of each turn is the following:
    - Horizontal Check: O(n ^ 2)
    - Vertical Check: O(n ^ 2)
    - Diagonal Checks: O(n ^ 3)
