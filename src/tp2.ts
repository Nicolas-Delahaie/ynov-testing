/* -------------------------------------------------------------------------- */
/*                                   BOWLING                                  */
/* -------------------------------------------------------------------------- */
export function getScore(rolls: number[], framesNumber: number): number {
  let score = 0;
  let frame = 1;
  let previousScore: number | null = null;
  let rollNumber = 0;
  while (true) {
    const roundScore = rolls.shift();
    rollNumber++;

    if (roundScore === undefined) {
      break;
    }

    if (frame > framesNumber) {
      throw new DOMException("Too many frames");
    }

    score += roundScore;

    const isStrike = roundScore === 10;
    const isSpare = rollNumber === 2 && previousScore! + roundScore === 10;
    const isLastFrame = frame === framesNumber;
    const hasBonus = !isLastFrame && (isStrike || isSpare);

    if (hasBonus) {
      score += rolls[0] ?? 0;

      if (isStrike) {
        score += rolls[1] ?? 0;
      }
    }

    const isLastRoll = isLastFrame
      ? rollNumber === 3
      : rollNumber === 2 || isStrike;
    if (isLastRoll) {
      rollNumber = 0;
      frame++;
    }
    previousScore = roundScore;
  }

  return score;
}
