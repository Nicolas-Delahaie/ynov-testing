const WORDS_LENGTH = 5;
export enum Color {
  grey = "⚪️",
  yellow = "🟡",
  green = "🟢",
}

const MAX_ATTEMPTS = 5;
export class Wordle {
  private mysteryWord: string;
  private currentAttempt: number;

  constructor(mysteryWord: string) {
    this.mysteryWord = mysteryWord;
    this.currentAttempt = 0;
  }

  public guess(proposition: string): Color[] {
    if (
      !this.mysteryWord.length ||
      !proposition.length ||
      this.mysteryWord.length !== WORDS_LENGTH ||
      proposition.length !== WORDS_LENGTH
    ) {
      throw new Error("Words lengths should be 5");
    }

    const mysteryWord = this.mysteryWord.toLowerCase();
    proposition = proposition.toLowerCase();

    const uniqueLetters = new Set(mysteryWord);
    const lettersPool: Record<string, number> = {};
    for (const letter of uniqueLetters) {
      const charCounter = mysteryWord.split(letter).length - 1;
      lettersPool[letter] = charCounter;
    }

    const response: Color[] = Array(WORDS_LENGTH).fill(Color.grey);

    for (let i = 0; i < WORDS_LENGTH; i++) {
      const mysteryLetter = mysteryWord[i];
      const propositionLetter = proposition[i];
      if (mysteryLetter === propositionLetter) {
        response[i] = Color.green;
        lettersPool[propositionLetter]--;
      }
    }

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
}
