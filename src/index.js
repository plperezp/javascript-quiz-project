document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");
  const titleNode = document.querySelector(".container header h1")

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    
    new Question(
      "¿En que año fue 1 +1?",
      ["God Age","El primer dia que entendí DOM", "La respuesta es: El fantastico Ralph", "Mi no saber"],
      "La respuesta es: El fantastico Ralph",
      3
    ),
    new Question("En que año se fundó Netflix",["1997", "2001", "2009", "2015"], "1997",1),
    new Question("¿A quién madruga?", ["Llegar pronto le ayuda", "Dios le ayuda", "Menos años dura", "Le amanece mas temprano"], "Dios le ayuda", 1),
    new Question("¿Cuántos signos astrológicos componen el zodíaco?", ["8", "10", "12", "14"], "12", 1),
    new Question("¿Cual es la iconica frase de Emma Penella en la sitcom 'La que se avecina?' ", ["Vayase señor Cuesta, vayase", "Dios mio, que follon", "Punto en boca, hombre ya", "Junta urgente"], "Vayase señor Cuesta, vayase", 1),
    new Question("¿Qué es el DOM?", ["El jefe de la mafia", "Es la representación del HTML que acepta cambios de manera temporal y local", "Un videojuego", "Es el enlace a una web"], "Es la representación del HTML que acepta cambios de manera temporal y local", 1),
    new Question("¿Que metodo podemos utilizar tanto en arrays como en los nodos?", [".map()", ".reverse()", ".forEach()", ".sort()"], ".forEach()", 1),
    






    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  //let timer = 120;
  let timerId = setInterval(() => {
    quiz.timeRemaining--;
    const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
   const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

    //console.log(quiz.timeRemaining)
    if (quiz.timeRemaining === 0) {
      clearInterval(timerId);
    }
  }, 1000);

  let restartButtonNode = document.querySelector("#restartButton");
  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButtonNode.addEventListener("click", () => {
    location.reload();
  });

  
    
  

 
  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered // LA BARRITA PASA DE 0 A 100%
    const progress = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    console.log(quiz.currentQuestionIndex);

    progressBar.style.width = `${progress}%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question ${quiz.currentQuestionIndex} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder

    let choicesHTML = "";

    question.choices.forEach((choice) => {
      choicesHTML += `
            <li>
                <input type="radio" name="choice" value="${choice}" id="choice-${choice}">
                <label for="choice-${choice}">${choice}</label>
            </li>
        `;
    });

    choiceContainer.innerHTML = choicesHTML;

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
  }

  function nextButtonHandler() {
    let selectedAnswer;

    const choices = document.querySelectorAll("#choices input[type='radio']");

    choices.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();

      if (quiz.hasEnded()) {
        showResults();
        clearInterval(timerId);
      } else {
        showQuestion();
      }
    }
  }

  // YOUR CODE HERE:
  //
  // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

  // 2. Loop through all the choice elements and check which one is selected
  // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
  //  When a radio input gets selected the `.checked` property will be set to true.
  //  You can use check which choice was selected by checking if the `.checked` property is true.

  // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
  // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
  // Move to the next question by calling the quiz method `moveToNextQuestion()`.
  // Show the next question by calling the function `showQuestion()`.

  function showResults() {
    //
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }
 


});
