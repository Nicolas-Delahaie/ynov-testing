/* -------------------------------------------------------------------------- */
/*                                   BOWLING                                  */
/* -------------------------------------------------------------------------- */
/**
 *
 * @warning doesn't handle the case where rolls are unsufficient for the number of frames
 */
export function getScore(rolls: number[], framesNumber: number): number {
  let score = 0;
  let frame = 1;
  let previousScore: number | null = null;
  let rollNumber = 0;
  while (true) {
    const roundScore = rolls.shift();
    const isLastFrame = frame === framesNumber;
    rollNumber++;

    if (roundScore === undefined) {
      break;
    }

    if (frame > framesNumber) {
      throw new DOMException("Too many rolls for the number of frames");
    }

    score += roundScore;

    const isStrike = roundScore === 10;
    const isSpare = rollNumber === 2 && previousScore! + roundScore === 10;

    console.log(
      "roundScore : ",
      roundScore,
      "previousScore : ",
      previousScore,
      "isLastFrame : ",
      isLastFrame,
      " frame : ",
      frame,
      " isStrike : ",
      isStrike,
      " isSpare : ",
      isSpare,
      " rollNumber : ",
      rollNumber
    );

    // Giving bonus
    if (!isLastFrame && (isStrike || isSpare)) {
      score += rolls[0] ?? 0;

      if (isStrike) {
        score += rolls[1] ?? 0;
      }
    }

    const isLastRoll = isLastFrame
      ? (rollNumber === 2 && !isSpare && !isStrike) || rollNumber === 3
      : rollNumber === 2 || isStrike;
    if (isLastRoll) {
      rollNumber = 0;
      frame++;
    }
    previousScore = roundScore;
  }

  return score;
}

// const result = getScore([10, 4, 4, 4], 2);
// console.log(result);
