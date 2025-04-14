import existingWords from "./datas/existingWords.json";

const WORDS_LENGTH = 5;
const MAX_ATTEMPTS = 6;

export enum Color {
  grey = "⚪️",
  yellow = "🟡",
  green = "🟢",
}

export class Wordle {
  private mysteryWord: string;
  private currentAttempt: number;
  private dictCheckEnabled: boolean;
  private hasWon: boolean = false;

  /**
   * Creates a game.
   * @param mysteryWord If not provided, creates a random game.
   * @param dictCheckEnabled Enables or not dictionnary check
   */
  constructor(mysteryWord?: string, dictCheckEnabled = true) {
    this.dictCheckEnabled = dictCheckEnabled;
    if (!mysteryWord) {
      mysteryWord =
        existingWords[Math.floor(Math.random() * existingWords.length)];
    } else {
      this.assertValidWord(mysteryWord);
    }
    this.mysteryWord = mysteryWord.toUpperCase();
    this.currentAttempt = 0;
  }

  public isGameOver(): boolean {
    return this.hasWon || this.currentAttempt >= MAX_ATTEMPTS;
  }

  public isGameWon(): boolean {
    return this.hasWon;
  }

  public getMysteryWord(): string {
    return this.mysteryWord;
  }

  private assertValidWord(word: string): void {
    if (!word.length || word.length !== WORDS_LENGTH) {
      throw new Error("Words must be exactly 5 letters");
    }

    if (/[^a-zA-Z]/.test(word)) {
      throw new Error("Words should only contain letters");
    }

    if (this.dictCheckEnabled) {
      const isInDictionary = existingWords.includes(word.toUpperCase());
      if (!isInDictionary) throw new Error("Word " + word + " doesn't exist.");
    }
  }

  public guess(proposition: string): Color[] {
    if (this.isGameOver()) throw new Error("No remaining attempts");

    this.assertValidWord(proposition);
    this.currentAttempt++;

    const mysteryWord = this.mysteryWord.toLowerCase();
    proposition = proposition.toLowerCase();

    const uniqueLetters = new Set(mysteryWord);
    const lettersPool: Record<string, number> = {};
    for (const letter of uniqueLetters) {
      lettersPool[letter] = mysteryWord.split(letter).length - 1;
    }

    const response: Color[] = Array(WORDS_LENGTH).fill(Color.grey);

    for (let i = 0; i < WORDS_LENGTH; i++) {
      if (mysteryWord[i] === proposition[i]) {
        response[i] = Color.green;
        lettersPool[proposition[i]]--;
      }
    }

    for (let i = 0; i < WORDS_LENGTH; i++) {
      if (response[i] === Color.green) continue;
      const letter = proposition[i];
      if (lettersPool[letter]) {
        response[i] = Color.yellow;
        lettersPool[letter]--;
      }
    }

    if (response.every((c) => c === Color.green)) {
      this.hasWon = true;
    }

    return response;
  }
}
