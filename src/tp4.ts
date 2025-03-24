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

  const response: Reponse = Array(5);
  for (let i = 0; i < mysteryWord.length; i++) {
    const mysteryLetter = mysteryWord[i].toLowerCase();
    const propositionLetter = proposition[i].toLowerCase();

    const isValidLetter = mysteryLetter === propositionLetter;
    const containsThisLetter = () =>
      mysteryWord.toLowerCase().includes(propositionLetter);

    response[i] = isValidLetter
      ? Color.green
      : containsThisLetter()
      ? Color.yellow
      : Color.grey;
  }

  return response;
}
