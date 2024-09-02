class Quiz {
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining =timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    // 2. getQuestion()
    getQuestion(){
    return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion(){
        this.currentQuestionIndex++;
    }

    // 4. shuffleQuestions()
    shuffleQuestions(){
        for (let i = this.questions.length - 1; i > 0; i--) {
            let indiceAleatorio = Math.floor(Math.random() * (i + 1));
            let temporal =this.questions[i];
            this.questions[i] = this.questions[indiceAleatorio];
            this.questions[indiceAleatorio] = temporal;
        } 
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer){
        if(answer){
            this.correctAnswers++;
        }
    }

    // 6. hasEnded()
    hasEnded(){
        if(this.currentQuestionIndex < this.questions.length){
            return false;
        }else{
            return true;
        }
    }
}