export enum Color {
  grey,
  yellow,
  green,
}

export type Reponse = Color[];

export function wordleLine(mysteryWord: string, proposition: string): Reponse {
  if (
    !mysteryWord.length ||
    !proposition.length ||
    mysteryWord.length !== 5 ||
    proposition.length !== 5
  ) {
    throw new Error("Words lengths should be 5");
  }

  mysteryWord = mysteryWord.toLowerCase();
  proposition = proposition.toLowerCase();

  const response: Reponse = Array(5);
  for (let i = 0; i < mysteryWord.length; i++) {
    const mysteryLetter = mysteryWord[i];
    const propositionLetter = proposition[i];

    const isValidLetter = mysteryLetter === propositionLetter;

    response[i] = isValidLetter
      ? Color.green
      : mysteryWord.includes(propositionLetter)
      ? Color.yellow
      : Color.grey;
  }

  return response;
}
