type ProbabilityQuestion = {
  answerIndex: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  explanation: string;
  id: string;
  options: [string, string, string, string, string];
  prompt: string;
};

const probabilityQuestionBank: ProbabilityQuestion[] = [
  {
    id: "p01",
    difficulty: 1,
    prompt: "A fair coin is flipped once. What is the probability of heads?",
    options: ["0", "1/4", "1/2", "3/4", "1"],
    answerIndex: 2,
    explanation: "A fair coin has two equally likely outcomes, and one of them is heads: 1/2."
  },
  {
    id: "p02",
    difficulty: 1,
    prompt: "A fair six-sided die is rolled. What is the probability of an even result?",
    options: ["1/6", "1/3", "1/2", "2/3", "5/6"],
    answerIndex: 2,
    explanation: "The even outcomes are 2, 4, and 6, so 3 of the 6 equally likely outcomes work: 3/6 = 1/2."
  },
  {
    id: "p03",
    difficulty: 1,
    prompt: "One card is drawn from a standard 52-card deck. What is the probability that it is red?",
    options: ["1/4", "1/3", "1/2", "2/3", "3/4"],
    answerIndex: 2,
    explanation: "There are 26 red cards among 52 cards, so the probability is 26/52 = 1/2."
  },
  {
    id: "p04",
    difficulty: 1,
    prompt: "What probability is assigned to an event that is certain to happen?",
    options: ["0", "1/4", "1/2", "3/4", "1"],
    answerIndex: 4,
    explanation: "A certain event has probability 1."
  },
  {
    id: "p05",
    difficulty: 1,
    prompt: "What probability is assigned to an impossible event?",
    options: ["0", "1/5", "1/2", "4/5", "1"],
    answerIndex: 0,
    explanation: "An impossible event has probability 0."
  },
  {
    id: "p06",
    difficulty: 1,
    prompt: "If P(A) = 0.30, what is P(not A)?",
    options: ["0.30", "0.40", "0.50", "0.70", "1.00"],
    answerIndex: 3,
    explanation: "An event and its complement add to 1, so P(not A) = 1 − 0.30 = 0.70."
  },
  {
    id: "p07",
    difficulty: 1,
    prompt: "How many outcomes are in the sample space for two coin flips?",
    options: ["2", "3", "4", "6", "8"],
    answerIndex: 2,
    explanation: "The outcomes are HH, HT, TH, and TT, for a total of 4."
  },
  {
    id: "p08",
    difficulty: 1,
    prompt: "A fair spinner has 8 equal sections, 2 of which are blue. What is the probability of blue?",
    options: ["1/8", "1/4", "3/8", "1/2", "3/4"],
    answerIndex: 1,
    explanation: "Two of eight equally likely sections are blue, so 2/8 = 1/4."
  },
  {
    id: "p09",
    difficulty: 1,
    prompt: "Which interval contains every possible probability value?",
    options: ["Less than 0", "Greater than 1", "From −1 to 1", "From 0 to 1, inclusive", "Any real number"],
    answerIndex: 3,
    explanation: "Probabilities cannot be negative or exceed certainty, so they lie from 0 through 1."
  },
  {
    id: "p10",
    difficulty: 1,
    prompt: "Events A and B cannot happen together. If P(A) = 0.20 and P(B) = 0.30, what is P(A or B)?",
    options: ["0.06", "0.10", "0.20", "0.50", "0.60"],
    answerIndex: 3,
    explanation: "Mutually exclusive events have no overlap, so P(A or B) = 0.20 + 0.30 = 0.50."
  },
  {
    id: "p11",
    difficulty: 2,
    prompt: "Two fair coins are flipped. What is the probability of getting two heads?",
    options: ["1/8", "1/4", "1/3", "1/2", "3/4"],
    answerIndex: 1,
    explanation: "Only HH works among HH, HT, TH, and TT, so the probability is 1/4."
  },
  {
    id: "p12",
    difficulty: 2,
    prompt: "Two fair coins are flipped. What is the probability of getting at least one head?",
    options: ["1/4", "1/2", "2/3", "3/4", "1"],
    answerIndex: 3,
    explanation: "Use the complement: P(at least one head) = 1 − P(TT) = 1 − 1/4 = 3/4."
  },
  {
    id: "p13",
    difficulty: 2,
    prompt: "Two fair six-sided dice are rolled. What is the probability that their sum is 7?",
    options: ["1/12", "1/9", "1/6", "1/4", "1/3"],
    answerIndex: 2,
    explanation: "Six of the 36 ordered outcomes sum to 7, so the probability is 6/36 = 1/6."
  },
  {
    id: "p14",
    difficulty: 2,
    prompt: "One card is drawn from a standard deck. What is the probability of drawing an ace?",
    options: ["1/52", "1/26", "1/13", "4/13", "1/4"],
    answerIndex: 2,
    explanation: "There are 4 aces among 52 cards, so 4/52 = 1/13."
  },
  {
    id: "p15",
    difficulty: 2,
    prompt: "Two cards are drawn without replacement. What is the probability that both are red?",
    options: ["1/4", "13/51", "1/2", "25/102", "25/51"],
    answerIndex: 3,
    explanation: "P(two red) = (26/52)(25/51) = 25/102. The second probability changes because the first card is not replaced."
  },
  {
    id: "p16",
    difficulty: 2,
    prompt: "Independent events A and B have probabilities 0.40 and 0.50. What is P(A and B)?",
    options: ["0.10", "0.15", "0.20", "0.45", "0.90"],
    answerIndex: 2,
    explanation: "For independent events, multiply: 0.40 × 0.50 = 0.20."
  },
  {
    id: "p17",
    difficulty: 2,
    prompt: "What is the expected value of one roll of a fair six-sided die?",
    options: ["2.5", "3", "10/3", "3.5", "4"],
    answerIndex: 3,
    explanation: "The mean is (1 + 2 + 3 + 4 + 5 + 6) / 6 = 21/6 = 3.5."
  },
  {
    id: "p18",
    difficulty: 2,
    prompt: "If P(A) = 0.60, P(B) = 0.50, and P(A and B) = 0.30, what is P(A or B)?",
    options: ["0.30", "0.50", "0.60", "0.70", "0.80"],
    answerIndex: 4,
    explanation: "Use inclusion–exclusion: 0.60 + 0.50 − 0.30 = 0.80."
  },
  {
    id: "p19",
    difficulty: 2,
    prompt: "Given that a drawn card is a face card, what is the probability that it is a king?",
    options: ["1/4", "1/3", "4/13", "1/2", "2/3"],
    answerIndex: 1,
    explanation: "There are 12 face cards and 4 kings, so the conditional probability is 4/12 = 1/3."
  },
  {
    id: "p20",
    difficulty: 2,
    prompt: "A fair coin is flipped 3 times. What is the probability of exactly 2 heads?",
    options: ["1/8", "1/4", "3/8", "1/2", "5/8"],
    answerIndex: 2,
    explanation: "There are C(3,2) = 3 successful sequences, each with probability 1/8, giving 3/8."
  },
  {
    id: "p21",
    difficulty: 3,
    prompt: "A disease affects 10% of a population. A test has 90% sensitivity and 80% specificity. Given a positive result, what is the probability the person has the disease?",
    options: ["1/5", "1/4", "1/3", "1/2", "9/10"],
    answerIndex: 2,
    explanation: "Bayes’ rule gives 0.10×0.90 / (0.10×0.90 + 0.90×0.20) = 0.09/0.27 = 1/3."
  },
  {
    id: "p22",
    difficulty: 3,
    prompt: "A factory gets 60% of its parts from supplier A, whose defect rate is 2%, and 40% from B, whose defect rate is 5%. What is the overall defect rate?",
    options: ["2.0%", "2.8%", "3.2%", "3.5%", "7.0%"],
    answerIndex: 2,
    explanation: "Use total probability: 0.60×0.02 + 0.40×0.05 = 0.012 + 0.020 = 0.032, or 3.2%."
  },
  {
    id: "p23",
    difficulty: 3,
    prompt: "If P(A | B) = 0.25 and P(B) = 0.40, what is P(A and B)?",
    options: ["0.0625", "0.10", "0.16", "0.25", "0.65"],
    answerIndex: 1,
    explanation: "By definition, P(A and B) = P(A | B)P(B) = 0.25×0.40 = 0.10."
  },
  {
    id: "p24",
    difficulty: 3,
    prompt: "P(A) = 0.30, P(B) = 0.20, and P(A and B) = 0.06. What does this show?",
    options: ["A and B are mutually exclusive", "A contains B", "B contains A", "The probabilities are invalid", "A and B are independent"],
    answerIndex: 4,
    explanation: "Because 0.30×0.20 = 0.06 = P(A and B), the multiplication criterion for independence holds."
  },
  {
    id: "p25",
    difficulty: 3,
    prompt: "A fair die is rolled twice. What is the probability of getting exactly one 6?",
    options: ["1/36", "1/6", "5/18", "5/12", "11/36"],
    answerIndex: 2,
    explanation: "The 6 can occur on either roll: 2×(1/6)(5/6) = 10/36 = 5/18."
  },
  {
    id: "p26",
    difficulty: 3,
    prompt: "Independent trials succeed with probability 0.20. What is the expected number of trials until the first success?",
    options: ["2", "3", "4", "5", "10"],
    answerIndex: 3,
    explanation: "A geometric random variable counting trials through the first success has mean 1/p = 1/0.20 = 5."
  },
  {
    id: "p27",
    difficulty: 3,
    prompt: "What is the variance of a Bernoulli random variable with success probability 0.30?",
    options: ["0.09", "0.18", "0.21", "0.30", "0.70"],
    answerIndex: 2,
    explanation: "A Bernoulli variable has variance p(1−p), so 0.30×0.70 = 0.21."
  },
  {
    id: "p28",
    difficulty: 3,
    prompt: "Given that a card drawn from a standard deck is red, what is the probability that it is a heart?",
    options: ["1/4", "1/3", "1/2", "2/3", "3/4"],
    answerIndex: 2,
    explanation: "Among the 26 red cards, 13 are hearts, so the probability is 13/26 = 1/2."
  },
  {
    id: "p29",
    difficulty: 3,
    prompt: "The odds in favor of an event are 3:2. What is the event’s probability?",
    options: ["2/5", "1/2", "2/3", "3/5", "3/2"],
    answerIndex: 3,
    explanation: "Three favorable parts and two unfavorable parts make five total parts, so the probability is 3/5."
  },
  {
    id: "p30",
    difficulty: 3,
    prompt: "A game pays $10 with probability 0.40 and loses $5 with probability 0.60. What is the expected net payoff?",
    options: ["−$2", "$0", "$1", "$2", "$4"],
    answerIndex: 2,
    explanation: "The expected payoff is 0.40×$10 + 0.60×(−$5) = $4 − $3 = $1."
  },
  {
    id: "p31",
    difficulty: 4,
    prompt: "One of three boxes is chosen equally likely. Box 1 has two gold coins, Box 2 has one gold and one silver, and Box 3 has two silver. A gold coin is drawn. What is the probability Box 1 was chosen?",
    options: ["1/3", "1/2", "3/5", "2/3", "3/4"],
    answerIndex: 3,
    explanation: "The gold likelihoods are 1, 1/2, and 0. Bayes’ rule gives (1/3×1) / (1/3×1 + 1/3×1/2) = 2/3."
  },
  {
    id: "p32",
    difficulty: 4,
    prompt: "In the standard Monty Hall problem, what is the probability of winning the car if you always switch doors?",
    options: ["1/4", "1/3", "1/2", "2/3", "3/4"],
    answerIndex: 3,
    explanation: "Your first choice is wrong with probability 2/3. Monty’s reveal then directs a switch to the remaining winning door."
  },
  {
    id: "p33",
    difficulty: 4,
    prompt: "Five independent components each fail with probability 0.10. What is the probability that at least one fails?",
    options: ["0.10000", "0.34390", "0.40951", "0.50000", "0.59049"],
    answerIndex: 2,
    explanation: "Use the complement: 1 − P(no failures) = 1 − 0.9⁵ = 1 − 0.59049 = 0.40951."
  },
  {
    id: "p34",
    difficulty: 4,
    prompt: "A bag contains 5 red and 5 blue balls. Three are drawn without replacement. What is the probability of exactly 2 red balls?",
    options: ["1/4", "1/3", "5/12", "1/2", "7/12"],
    answerIndex: 2,
    explanation: "The hypergeometric probability is C(5,2)C(5,1)/C(10,3) = 50/120 = 5/12."
  },
  {
    id: "p35",
    difficulty: 4,
    prompt: "If random variables X and Y are independent and have finite variances, what is Cov(X,Y)?",
    options: ["0", "1", "Var(X)Var(Y)", "E[X]E[Y]", "It must be negative"],
    answerIndex: 0,
    explanation: "Independence gives E[XY] = E[X]E[Y], so their covariance is 0."
  },
  {
    id: "p36",
    difficulty: 4,
    prompt: "Calls arrive according to a Poisson distribution with mean 2 per minute. What is the probability of no calls in one minute?",
    options: ["0.0677", "0.1353", "0.2707", "0.5000", "0.8647"],
    answerIndex: 1,
    explanation: "For a Poisson(2) variable, P(X=0) = e⁻²2⁰/0! = e⁻² ≈ 0.1353."
  },
  {
    id: "p37",
    difficulty: 4,
    prompt: "Daily sales average 100 units when it rains and 40 when it does not. If rain has probability 0.30, what is expected daily sales?",
    options: ["40", "52", "58", "70", "82"],
    answerIndex: 2,
    explanation: "Condition on the weather: 0.30×100 + 0.70×40 = 30 + 28 = 58."
  },
  {
    id: "p38",
    difficulty: 4,
    prompt: "X takes values 0, 1, and 2 with probabilities 0.20, 0.50, and 0.30. What is Var(X)?",
    options: ["0.21", "0.30", "0.49", "0.70", "1.10"],
    answerIndex: 2,
    explanation: "E[X]=1.1 and E[X²]=1.7, so Var(X)=1.7−1.1²=1.7−1.21=0.49."
  },
  {
    id: "p39",
    difficulty: 4,
    prompt: "20% of email is spam. A filter catches 95% of spam and falsely flags 10% of legitimate email. Given that an email is flagged, what is the probability it is spam?",
    options: ["1/2", "3/5", "2/3", "19/27", "19/20"],
    answerIndex: 3,
    explanation: "Bayes’ rule gives 0.20×0.95 / (0.20×0.95 + 0.80×0.10) = 0.19/0.27 = 19/27."
  },
  {
    id: "p40",
    difficulty: 4,
    prompt: "Ignoring leap days, what is the probability that three people all have different birthdays?",
    options: ["About 0.0082", "About 0.5000", "About 0.7500", "About 0.9836", "About 0.9918"],
    answerIndex: 4,
    explanation: "The first birthday is unrestricted; the next two must differ: (364/365)(363/365) ≈ 0.9918."
  },
  {
    id: "p41",
    difficulty: 5,
    prompt: "A condition has prevalence 0.1%. A test has 99% sensitivity and a 1% false-positive rate. Given a positive result, what is the approximate probability of the condition?",
    options: ["0.99%", "9.02%", "49.75%", "90.08%", "99.00%"],
    answerIndex: 1,
    explanation: "Bayes’ rule gives 0.001×0.99 / (0.001×0.99 + 0.999×0.01) ≈ 0.0902, or 9.02%."
  },
  {
    id: "p42",
    difficulty: 5,
    prompt: "A fair coin or a double-headed coin is chosen with equal probability. The chosen coin is flipped and shows heads. What is the probability it is the double-headed coin?",
    options: ["1/3", "1/2", "3/5", "2/3", "3/4"],
    answerIndex: 3,
    explanation: "Bayes’ rule gives (1/2×1) / (1/2×1 + 1/2×1/2) = 1/2 ÷ 3/4 = 2/3."
  },
  {
    id: "p43",
    difficulty: 5,
    prompt: "For repeated flips of a fair coin, what is the expected number of flips needed to see two consecutive heads for the first time?",
    options: ["3", "4", "5", "6", "8"],
    answerIndex: 3,
    explanation: "A two-state recurrence gives E₀ = 1 + (E₁+E₀)/2 and E₁ = 1 + E₀/2, whose solution is E₀ = 6."
  },
  {
    id: "p44",
    difficulty: 5,
    prompt: "In an unbiased random walk with absorbing barriers at 0 and 10, starting at 3, what is the probability of reaching 10 before 0?",
    options: ["0.10", "0.20", "0.30", "0.50", "0.70"],
    answerIndex: 2,
    explanation: "For an unbiased gambler’s-ruin walk, the probability of reaching N before 0 from i is i/N = 3/10 = 0.30."
  },
  {
    id: "p45",
    difficulty: 5,
    prompt: "P(A)=0.50, P(B)=0.40, P(C)=0.30; pairwise intersections are 0.20, 0.10, and 0.10; and P(A∩B∩C)=0.05. What is P(A∪B∪C)?",
    options: ["0.65", "0.75", "0.80", "0.85", "0.95"],
    answerIndex: 3,
    explanation: "Three-event inclusion–exclusion gives 1.20 − (0.20+0.10+0.10) + 0.05 = 0.85."
  },
  {
    id: "p46",
    difficulty: 5,
    prompt: "Independent X~Poisson(2) and Y~Poisson(3) satisfy X+Y=4. What is P(X=1 | X+Y=4)?",
    options: ["0.1536", "0.2304", "0.3456", "0.4000", "0.6000"],
    answerIndex: 2,
    explanation: "Conditioned on the total, X is Binomial(4, 2/5). Thus P(X=1)=C(4,1)(0.4)(0.6³)=0.3456."
  },
  {
    id: "p47",
    difficulty: 5,
    prompt: "A permutation of 3 distinct objects is chosen uniformly. What is the probability that no object remains in its original position?",
    options: ["1/6", "1/3", "1/2", "2/3", "5/6"],
    answerIndex: 1,
    explanation: "There are 2 derangements of 3 objects among 3! = 6 permutations, so the probability is 2/6 = 1/3."
  },
  {
    id: "p48",
    difficulty: 5,
    prompt: "Independent observations have variance 16. What is the variance of their sample mean when n=25?",
    options: ["0.16", "0.40", "0.64", "4.00", "10.00"],
    answerIndex: 2,
    explanation: "For independent observations, Var(sample mean) = σ²/n = 16/25 = 0.64."
  },
  {
    id: "p49",
    difficulty: 5,
    prompt: "A nonnegative random variable has mean 10. By Markov’s inequality, what is the strongest stated upper bound on P(X≥50)?",
    options: ["0.02", "0.10", "0.20", "0.50", "0.80"],
    answerIndex: 2,
    explanation: "Markov’s inequality gives P(X≥a) ≤ E[X]/a = 10/50 = 0.20."
  },
  {
    id: "p50",
    difficulty: 5,
    prompt: "A disease has 10% prevalence. A test has 80% sensitivity and 90% specificity. Assuming two test results are conditionally independent, what is P(disease | two positive results)?",
    options: ["8/17", "16/25", "4/5", "64/73", "8/9"],
    answerIndex: 3,
    explanation: "Two positives have likelihood 0.8² with disease and 0.1² without it. Bayes gives 0.1×0.64 / (0.1×0.64 + 0.9×0.01) = 64/73."
  }
];

const quizAnswerLetters = ["A", "B", "C", "D", "E"];
let activeProbabilityQuestions: ProbabilityQuestion[] = [];

function normalizeQuizQuestionCount(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) {
    return 10;
  }
  return Math.min(20, Math.max(1, Math.floor(parsed)));
}

function normalizeQuizDifficulty(value: unknown): 1 | 2 | 3 | 4 | 5 {
  const parsed = typeof value === "number" ? value : Number(value);
  const normalized = Number.isFinite(parsed) ? Math.min(5, Math.max(1, Math.round(parsed))) : 3;
  return normalized as 1 | 2 | 3 | 4 | 5;
}

function shuffleProbabilityQuestions(questions: ProbabilityQuestion[]): ProbabilityQuestion[] {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function selectProbabilityQuestions(count: number, difficulty: number): ProbabilityQuestion[] {
  const normalizedCount = normalizeQuizQuestionCount(count);
  const normalizedDifficulty = normalizeQuizDifficulty(difficulty);
  const rankedQuestions: ProbabilityQuestion[] = [];

  for (let distance = 0; distance <= 4; distance += 1) {
    const questionsAtDistance = probabilityQuestionBank.filter(
      (question) => Math.abs(question.difficulty - normalizedDifficulty) === distance
    );
    rankedQuestions.push(...shuffleProbabilityQuestions(questionsAtDistance));
  }

  return rankedQuestions.slice(0, normalizedCount);
}

function quizEscapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "\"":
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function renderProbabilityQuestion(question: ProbabilityQuestion, index: number): string {
  const options = question.options
    .map((option, optionIndex) => {
      const inputId = `quiz-${question.id}-${optionIndex}`;
      return `
        <label class="quiz-option" for="${inputId}">
          <input id="${inputId}" type="radio" name="quiz-${question.id}" value="${optionIndex}">
          <span class="quiz-option__letter">${quizAnswerLetters[optionIndex]}</span>
          <span>${quizEscapeHtml(option)}</span>
        </label>
      `;
    })
    .join("");

  return `
    <fieldset class="privacy-section quiz-question">
      <legend>
        <span>Question ${index + 1}</span>
        <span class="quiz-level">Level ${question.difficulty}</span>
      </legend>
      <p class="quiz-question__prompt">${quizEscapeHtml(question.prompt)}</p>
      <div class="quiz-options">${options}</div>
    </fieldset>
  `;
}

function updateQuizProgress(): void {
  const progressElement = document.getElementById("quizProgress");
  const answerForm = document.getElementById("quizAnswerForm");
  if (!progressElement || !(answerForm instanceof HTMLFormElement)) {
    return;
  }

  const answeredCount = activeProbabilityQuestions.filter((question) => {
    return answerForm.querySelector(`input[name="quiz-${question.id}"]:checked`) !== null;
  }).length;
  progressElement.textContent = `${answeredCount} of ${activeProbabilityQuestions.length} answered`;
}

function renderQuizSolutions(answers: Map<string, number>): { correctCount: number; markup: string } {
  let correctCount = 0;
  const markup = activeProbabilityQuestions
    .map((question, index) => {
      const selectedIndex = answers.get(question.id);
      const isCorrect = selectedIndex === question.answerIndex;
      if (isCorrect) {
        correctCount += 1;
      }

      const selectedAnswer = selectedIndex === undefined ? "Not answered" : question.options[selectedIndex];
      const optionReview = question.options
        .map((option, optionIndex) => {
          const classes = ["quiz-review-option"];
          const annotations: string[] = [];
          if (optionIndex === question.answerIndex) {
            classes.push("quiz-review-option--correct");
            annotations.push("Correct answer");
          }
          if (optionIndex === selectedIndex) {
            classes.push("quiz-review-option--selected");
            annotations.push("Your choice");
          }
          return `
            <li class="${classes.join(" ")}">
              <span class="quiz-option__letter">${quizAnswerLetters[optionIndex]}</span>
              <span>${quizEscapeHtml(option)}</span>
              ${annotations.length > 0 ? `<strong>${annotations.join(" · ")}</strong>` : ""}
            </li>
          `;
        })
        .join("");

      return `
        <article class="privacy-section quiz-solution ${isCorrect ? "quiz-solution--correct" : "quiz-solution--incorrect"}">
          <div class="quiz-solution__heading">
            <p>Question ${index + 1} · Level ${question.difficulty}</p>
            <strong>${isCorrect ? "Correct" : "Review"}</strong>
          </div>
          <h3>${quizEscapeHtml(question.prompt)}</h3>
          <p class="quiz-solution__selection">Your answer: ${quizEscapeHtml(selectedAnswer)}</p>
          <ol class="quiz-review-options">${optionReview}</ol>
          <div class="quiz-explanation">
            <strong>Solution</strong>
            <p>${quizEscapeHtml(question.explanation)}</p>
          </div>
        </article>
      `;
    })
    .join("");

  return { correctCount, markup };
}

function initializeProbabilityQuiz(): void {
  const builderForm = document.getElementById("probabilityQuizForm");
  const questionCountInput = document.getElementById("quizQuestionCount");
  const difficultyInput = document.getElementById("quizDifficulty");
  const difficultyOutput = document.getElementById("quizDifficultyOutput");
  const workspace = document.getElementById("quizWorkspace");
  const answerForm = document.getElementById("quizAnswerForm");
  const questionsElement = document.getElementById("quizQuestions");
  const results = document.getElementById("quizResults");
  const scoreElement = document.getElementById("quizScore");
  const solutionsElement = document.getElementById("quizSolutions");
  const startOverButton = document.getElementById("quizStartOver");

  if (
    !(builderForm instanceof HTMLFormElement) ||
    !(questionCountInput instanceof HTMLInputElement) ||
    !(difficultyInput instanceof HTMLInputElement) ||
    !(difficultyOutput instanceof HTMLOutputElement) ||
    !workspace ||
    !(answerForm instanceof HTMLFormElement) ||
    !questionsElement ||
    !results ||
    !scoreElement ||
    !solutionsElement ||
    !(startOverButton instanceof HTMLButtonElement)
  ) {
    return;
  }

  const updateDifficultyOutput = (): void => {
    difficultyOutput.value = `${normalizeQuizDifficulty(difficultyInput.value)} / 5`;
  };

  difficultyInput.addEventListener("input", updateDifficultyOutput);
  updateDifficultyOutput();

  builderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const questionCount = normalizeQuizQuestionCount(questionCountInput.value);
    const difficulty = normalizeQuizDifficulty(difficultyInput.value);
    questionCountInput.value = String(questionCount);
    difficultyInput.value = String(difficulty);
    updateDifficultyOutput();

    activeProbabilityQuestions = selectProbabilityQuestions(questionCount, difficulty);
    questionsElement.innerHTML = activeProbabilityQuestions.map(renderProbabilityQuestion).join("");
    workspace.hidden = false;
    results.hidden = true;
    solutionsElement.innerHTML = "";
    updateQuizProgress();
    workspace.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  answerForm.addEventListener("change", updateQuizProgress);
  answerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const answers = new Map<string, number>();
    activeProbabilityQuestions.forEach((question) => {
      const selected = answerForm.querySelector<HTMLInputElement>(`input[name="quiz-${question.id}"]:checked`);
      if (selected) {
        answers.set(question.id, Number(selected.value));
      }
    });

    const review = renderQuizSolutions(answers);
    const percentage = Math.round((review.correctCount / activeProbabilityQuestions.length) * 100);
    scoreElement.textContent = `${review.correctCount} of ${activeProbabilityQuestions.length} correct · ${percentage}%`;
    solutionsElement.innerHTML = review.markup;
    workspace.hidden = true;
    results.hidden = false;
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  startOverButton.addEventListener("click", () => {
    results.hidden = true;
    workspace.hidden = true;
    activeProbabilityQuestions = [];
    builderForm.scrollIntoView({ behavior: "smooth", block: "center" });
    questionCountInput.focus({ preventScroll: true });
  });
}

document.addEventListener("DOMContentLoaded", initializeProbabilityQuiz);
