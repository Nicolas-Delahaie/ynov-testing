/* -------------------------------------------------------------------------- */
/*                                   BOWLING                                  */
/* -------------------------------------------------------------------------- */
/**
 *
 * @warning doesn't handle the case where rolls are unsufficient for the number of frames
 */
export function getScore(rolls: number[], framesNumber: number): number {
  let totalScore = 0;
  let currentFrameNumber = 1;
  let frame = [];
  while (true) {
    const roundScore = rolls.shift();
    if (roundScore === undefined) {
      break;
    }
    frame.push(roundScore);

    if (currentFrameNumber > framesNumber) {
      throw new DOMException("Too many rolls for the number of frames");
    }

    const previousRoll: number | undefined = frame[frame.length - 2];
    const sumWithPrevious = (previousRoll ?? 0) + roundScore;
    const isLastFrame = currentFrameNumber === framesNumber;
    const isSecondThrow = isLastFrame
      ? false /** @warning doesn't handle throw errors in last frame */ //TODO
      : frame.length === 2;

    if (isSecondThrow && sumWithPrevious > 10) {
      throw new DOMException(
        "Too many points in a frame. Frame score: " + sumWithPrevious
      );
    }

    totalScore += roundScore;

    const isStrike = roundScore === 10;
    const isSpare = frame.length === 2 && sumWithPrevious === 10;

    // Giving bonus
    if (!isLastFrame && (isStrike || isSpare)) {
      totalScore += rolls[0] ?? 0;

      if (isStrike) {
        totalScore += rolls[1] ?? 0;
      }
    }

    // Checking frame is achieved
    const isLastFrameRoll = isLastFrame
      ? (frame.length === 2 && frame[0] != 10 && frame[0] + frame[1] != 10) ||
        frame.length === 3
      : frame.length === 2 || isStrike;
    if (isLastFrameRoll) {
      frame = [];
      currentFrameNumber++;
    }
  }
  return totalScore;
}
