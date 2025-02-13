/* -------------------------------------------------------------------------- */
/*                                   BOWLING                                  */
/* -------------------------------------------------------------------------- */

function tail(rolls: number[], n = 0): number | null {
  return rolls[rolls.length - 1 - n];
}

/**
 *
 * @warning doesn't handle the case where rolls are unsufficient for the number of frames
 */
export function getScore(rolls: number[], framesNumber: number): number {
  let score = 0;
  let frameNumber = 1;
  let frame = [];
  while (true) {
    const roundScore = rolls.shift();
    if (roundScore === undefined) {
      break;
    }
    frame.push(roundScore);

    if (frameNumber > framesNumber) {
      throw new DOMException("Too many rolls for the number of frames");
    }

    const previousRoll = tail(frame, 1);
    const sumWithPrevious = (previousRoll ?? 0) + roundScore;
    const isLastFrame = frameNumber === framesNumber;
    const isSecondThrow = isLastFrame
      ? false /** @warning doesn't handle throw errors in last frame */
      : frame.length === 2;

    if (isSecondThrow && sumWithPrevious > 10) {
      throw new DOMException(
        "Too many points in a frame. Frame score: " + sumWithPrevious
      );
    }

    score += roundScore;

    const isStrike = roundScore === 10;
    const isSpare = frame.length === 2 && sumWithPrevious === 10;

    // Giving bonus
    if (!isLastFrame && (isStrike || isSpare)) {
      score += rolls[0] ?? 0;

      if (isStrike) {
        score += rolls[1] ?? 0;
      }
    }

    const isLastFrameRoll = isLastFrame
      ? (frame.length === 2 && !isSpare && !isStrike) || frame.length === 3
      : frame.length === 2 || isStrike;
    if (isLastFrameRoll) {
      frame = [];
      frameNumber++;
    }
  }
  return score;
}

// const result = getScore([10, 4, 4, 4], 2);
// console.log(result);

const ab = [8];
const a = [8, 1];
const b = [7, 1, 2];

console.log(tail(b, 0));
console.log(tail(b, 1));

console.log(tail(a, 0));
console.log(tail(a, 1));
console.log(tail(a, 2));
