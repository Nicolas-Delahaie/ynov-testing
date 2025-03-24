const WORDS_LENGTH = 5;
export enum Color {
  grey = "⚪️",
  yellow = "🟡",
  green = "🟢",
}
export type Reponse = Color[];

export function wordleLine(mysteryWord: string, proposition: string): Reponse {
  if (
    !mysteryWord.length ||
    !proposition.length ||
    mysteryWord.length !== WORDS_LENGTH ||
    proposition.length !== WORDS_LENGTH
  ) {
    throw new Error("Words lengths should be 5");
  }

  mysteryWord = mysteryWord.toLowerCase();
  proposition = proposition.toLowerCase();

  const uniqueLetters = new Set(mysteryWord);
  const lettersPool: Record<string, number> = {};
  for (const letter of uniqueLetters) {
    const charCounter = mysteryWord.split(letter).length - 1;
    lettersPool[letter] = charCounter;
  }

  const response: Reponse = Array(WORDS_LENGTH).fill(Color.grey);

  // Removing green letters from the pool
  for (let i = 0; i < WORDS_LENGTH; i++) {
    const mysteryLetter = mysteryWord[i];
    const propositionLetter = proposition[i];
    if (mysteryLetter === propositionLetter) {
      response[i] = Color.green;
      lettersPool[propositionLetter]--;
      console.log(propositionLetter + " matches " + mysteryLetter);
    }
  }

  // Putting remaining is yellow
  for (let i = 0; i < WORDS_LENGTH; i++) {
    if (response[i] === Color.green) {
      continue;
    }

    const propositionLetter = proposition[i];
    const letterIsRemaining =
      lettersPool[propositionLetter] !== undefined &&
      lettersPool[propositionLetter] > 0;

    if (letterIsRemaining) {
      response[i] = Color.yellow;
      lettersPool[propositionLetter]--;
    }
  }

  return response;
}
