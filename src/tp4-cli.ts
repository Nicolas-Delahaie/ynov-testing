import readline from "readline";
import { Wordle, Color } from "./tp4";

const game = new Wordle("CACAO");
let attempt = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n🎮 Welcome to Wordle!");
console.log("You have 5 attempts to guess the word.\n");

function ask() {
  if (game.isGameOver()) {
    if (!game.isGameWon()) {
      console.log(
        `\n💀 Game over. The word was: \x1b[1m${game.getMysteryWord()}\x1b[0m`
      );
    }
    rl.close();
    return;
  }

  const blue = "\x1b[34m";
  const reset = "\x1b[0m";

  rl.question(`${blue}Réponse [${attempt}] :${reset} `, (input) => {
    try {
      const result = game.guess(input);

      let line1 = "";
      let line2 = "";

      for (let i = 0; i < result.length; i++) {
        line1 += result[i] + " ";
        line2 += input[i]?.toUpperCase() + "  ";
      }

      console.log(line1.trimEnd());
      console.log(line2.trimEnd());

      if (game.isGameWon()) {
        console.log("🎉 You found the word!");
        rl.close();
      } else {
        attempt++;
        ask();
      }
    } catch (e: any) {
      console.error("❌", e.message);
      ask();
    }
  });
}

ask();
