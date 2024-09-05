class Quiz {
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  // 2. getQuestion()
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      let indiceAleatorio = Math.floor(Math.random() * (i + 1));
      let temporal = this.questions[i];
      this.questions[i] = this.questions[indiceAleatorio];
      this.questions[indiceAleatorio] = temporal;
    }
  }

  // 5. checkAnswer(answer)  
  checkAnswer(answer) {
    if (answer === this.questions[this.currentQuestionIndex].answer) {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else {
      return true;
    }
  }

  filterQuestionsByDifficulty(userSelectedDifficulty) {
    if (
      userSelectedDifficulty !== 1 &&
      userSelectedDifficulty !== 2 &&
      userSelectedDifficulty !== 3
    ) {
      return null;
    }

    let filteredQuestion = this.questions.filter((question) => {
      if (question.difficulty === userSelectedDifficulty) {
        return true;
      } else {
        return false;
      }
    });
    this.questions = filteredQuestion;
    return filteredQuestion;

  }

  averageDifficulty(){
    let prov = 0;
    prov = this.questions.reduce((acc, elem)=>{
        return acc + elem.difficulty;
    },0)
    return prov / this.questions.length;
  }
}
