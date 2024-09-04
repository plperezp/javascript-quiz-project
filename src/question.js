class Question {
     constructor (text, choices, answer, difficulty){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
     }

    // 2. shuffleChoices()
    shuffleChoices(){
       for (let i = this.choices.length - 1; i > 0; i--) {
            let indiceAleatorio = Math.floor(Math.random() * (i + 1));
            let temporal = this.choices[i];
            this.choices[i] = this.choices[indiceAleatorio];
            this.choices[indiceAleatorio] = temporal;
        } 
    }


}