import existingWords from "./datas/existingWords.json";
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
  private dictCheckEnabled: boolean;

  constructor(mysteryWord: string, dictCheckEnabled = true) {
    this.dictCheckEnabled = dictCheckEnabled;
    this.assertValidWord(mysteryWord);
    this.mysteryWord = mysteryWord.toUpperCase();
    this.currentAttempt = 0;
  }

  private isGameOver() {
    return this.currentAttempt > MAX_ATTEMPTS;
  }

  private assertValidWord(word: string): void {
    if (!word.length || word.length !== WORDS_LENGTH) {
      throw new Error("Words lengths should be 5");
    }

    if (this.dictCheckEnabled) {
      const isInDictionary = existingWords.includes(word.toUpperCase());
      if (isInDictionary === false) throw new Error("Words should exist");
    }

    if (/[^a-zA-Z]/.test(word)) {
      throw new Error("Words should only contain letters");
    }
  }

  /**
   * Makes a guess on the mystery word and returns a color-coded result.
   *
   * Prerequisite:
   * - The player must have remaining attempts (i.e., the game must not be over).
   *
   * Rules:
   * - The guessed word must have exactly 5 characters.
   * - Each letter is compared to the mystery word:
   *   - 🟢 Green: correct letter in the correct position.
   *   - 🟡 Yellow: correct letter but in the wrong position.
   *   - ⚪️ Grey: letter not in the word at all.
   *
   * @param proposition - The guessed word
   * @returns An array of Colors indicating correctness per letter
   * @throws Error if the game is over or the word lengths are invalid
   */
  public guess(proposition: string): Color[] {
    this.assertValidWord(proposition);

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
