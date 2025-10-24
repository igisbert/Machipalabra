import { LETTER_STATUS } from "@/utils/constants.js";

export const selectRandomQuestions = (questions) => {
  return questions.map((letterData) => {
    const randomIndex = Math.floor(Math.random() * letterData.preguntas.length);
    return {
      ...letterData,
      pregunta: {
        ...letterData.preguntas[randomIndex],
        status: LETTER_STATUS.UNANSWERED,
      },
    };
  });
};

const levenshtein = (a, b) => {
  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i += 1) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  return matrix[b.length][a.length];
};

export const checkAnswer = (userInput, correctAnswersArray) => {
  const normalizedUserInput = userInput.toLowerCase();

  for (const correctAnswer of correctAnswersArray) {
    const normalizedCorrectAnswer = correctAnswer.toLowerCase();
    const distance = levenshtein(normalizedUserInput, normalizedCorrectAnswer);

    let allowedDistance = 1;
    if (normalizedCorrectAnswer.length >= 12) {
      allowedDistance = 3;
    } else if (normalizedCorrectAnswer.length >= 6) {
      allowedDistance = 2;
    }

    if (distance <= allowedDistance) {
      return true;
    }
  }

  return false;
};
