/* -------------------------------------------------------------------------- */
/*                                   BOWLING                                  */
/* -------------------------------------------------------------------------- */

export type Frame = number | "X" | "/";
export type Game = { frames: Frame[]; extra: number };

const getFrameNumber = (frame: Frame) => {
  return frame === "X" || frame === "/" ? 10 : frame;
};

// From every roll to frames. [10, 4, 6, 3, 4] becomes [X, /, 7]
export function rollsToFrame(rolls: number[], roundNumber: number): Game {
  let frames: Frame[] = [];
  let extra = 0;

  for (let n = 0; n < roundNumber; n++) {
    const score = rolls.shift();

    if (score === undefined) {
      throw new DOMException("Not enough rolls");
    }

    // Counting score
    if (score === 10) {
      // Single shot
      frames.push("X");
    } else {
      // Double shot
      const secondScore = rolls.shift();

      if (secondScore === undefined) {
        throw new DOMException("Not enough rolls");
      }

      const sumScore = score! + secondScore!;

      frames.push(sumScore === 10 ? "/" : sumScore);
    }

    // Adding extras
    if (n === roundNumber - 1) {
      while (rolls.length > 0) {
        extra += rolls.shift()!;
      }
    }
  }

  return { frames, extra };
}

export function getScore(game: Game) {
  let score = 0;
  while (true) {
    const roundScore = game.frames.shift();

    if (roundScore === undefined) {
      break;
    }

    // Adding scores
    score += getFrameNumber(roundScore);
    if (getFrameNumber(roundScore) === 10) {
      score += getFrameNumber(game.frames[0] ?? 0);

      if (roundScore === "X") {
        score += getFrameNumber(game.frames[1] ?? 0);
      }
    }
  }

  // Adding last round score
  score += game.extra;

  return score;
}
