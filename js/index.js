/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q${index+1} - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    let total = quizArray.length
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        if (quizItem.a == i) {
          //change background color of li element here
          liElement.style.backgroundColor = 'green'
        }

        if (radioElement.checked) {
          // code for task 1 goes here
          if (quizItem.a === i) {
            score += 1;
          }
        }
        if(radioElement.checked&&quizItem.a !== i){
          liElement.style.borderColor = 'red'
        }
      }
      console.log(`score is ${score}`)
      document.querySelector('#score').innerHTML = `Score :<strong>${score}/${total}</strong> correct`
      document.querySelector('#time').innerHTML=`Quiz Over.Your score :${score}`

    });
  };

  // call the displayQuiz function
  displayQuiz();

  // display score
  let submitBtn = document.querySelector('#btnSubmit')
  submitBtn.addEventListener('click', calculateScore)


  //add question function

  function addQuestion(question) {
    // console.log(Object.keys(question).length)
    // console.log(Object.values(question).length)

    if (!(typeof question === 'object' && Object.keys(question).length === 3 && Object.values(question).length === 3)) {
      console.log('question is not in correct format')
    }
    else {
      quizArray.push(question);
      displayQuiz();
    }
  }
  // question objects
  let question1 = {
    q: 'Which is the largest planet in solar system?',
    o: ['Saturn', 'Earth', 'Jupiter', 'Mars'],
    a: 2

  }
  let question2 = {
    q: 'Which is the largest State In Australia?',
    o: ['VIC', 'WA', 'NSW', 'SA'],
    a: 1
  }

  //call addQuestion function
  addQuestion(question1)
  addQuestion(question2)


  //reload window
  function resetQuiz() {
    window.location.reload()
  }
  document.querySelector('#btnReset').addEventListener('click', resetQuiz)

  ///   countdown timer

  let quizTime = 2   //in mins
  let newDate = new Date(new Date().getTime() + quizTime * 60000).getTime()  // in miliseconds

  function countDown() {
    let now = new Date().getTime()
    let counter = newDate - now
    let minutes = Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((counter % (1000 * 60)) / 1000);
    //  let time =`${date.getMinutes()}: ${date.getSeconds()}`
    console.log(minutes)
    console.log(`seconds are ${seconds}`)
    console.log(counter)

    document.querySelector('#time').innerHTML = ` ${minutes} mins:${seconds} seconds `
    if (counter <= 0) {
      document.querySelector('#time').innerHTML = `Time up `
      calculateScore();
      submitBtn.disabled = true

    }
  }
  const timer= setInterval(countDown, 1000);


  //reset quiz timer on submit
  function resetCountDown(){
    clearInterval(timer)
    document.querySelector('#time').innerHTML="Quiz Over"

  }
  submitBtn.addEventListener('click', resetCountDown)

})