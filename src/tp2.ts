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

    const sumWithPrevious = (previousScore ?? 0) + roundScore;
    const isSecondThrow = isLastFrame
      ? false /** @warning doesn't handle throw errors in last frame */
      : rollNumber === 2;

    if (isSecondThrow && sumWithPrevious > 10) {
      throw new DOMException(
        "Too many points in a frame. Frame score: " + sumWithPrevious
      );
    }

    score += roundScore;

    const isStrike = roundScore === 10;
    const isSpare = rollNumber === 2 && sumWithPrevious === 10;

    // Giving bonus
    if (!isLastFrame && (isStrike || isSpare)) {
      score += rolls[0] ?? 0;

      if (isStrike) {
        score += rolls[1] ?? 0;
      }
    }

    const isLastFrameRoll = isLastFrame
      ? (rollNumber === 2 && !isSpare && !isStrike) || rollNumber === 3
      : rollNumber === 2 || isStrike;
    if (isLastFrameRoll) {
      rollNumber = 0;
      frame++;
    }
    previousScore = roundScore;
  }
  return score;
}
