document.title = "Trivia Quiz";

//each question has 4 choices. a correctAnswer value of 4 means any choice counts as correct
var allQuestions = [
  {question: "The 2014 Nobel Prize in Physics was awarded to Isamu Akasaki, Hiroshi Amano, and Shuji Nakamura for what contribution to the field?",
   choices: ["the discovery of R&ouml;ntgen rays", "the development of wireless telegraphy", "the invention of an imaging semiconductor circuit &mdash; the CCD sensor", "the invention of efficient blue light-emitting diodes"],
   correctAnswer:3},
  {question: "The  ebola virus epidemic in West Africa that began in December 2013 spread first from which country?",
   choices: ["Sierra Leone", "Guinea", "Liberia", "Nigeria"],
   correctAnswer:1},
  {question: "What does PewDiePie and the first human born to a recipient of a donated uterus have in common",
   choices: ["they both have their own YouTube channels", "they are both females", "they both have heterochromia iridum", "they are both from Sweden"],
   correctAnswer:3},
  {question: "Which quote is attributed to Alan Watts?",
   choices: ["&ldquo;It must be obvious... that there is a contradiction in wanting to be perfectly secure in a universe whose very nature is momentariness and fluidity.&rdquo;", "&ldquo;A person who thinks all the time has nothing to think about except thoughts. So he loses touch with reality, and lives in a world of illusion.&rdquo;", "&ldquo;I have nothing to sell. I'm an entertainer.&rdquo;", "&ldquo;Ego is a social institution with no physical reality. The ego is simply your symbol of yourself.&rdquo;"],
   correctAnswer:4},
  /*{question: "",
   choices: [""],
   correctAnswer:_}*/
];

var currentQ = 0;

var score = 0;

function writeQuestion(qIndex) {
  document.getElementById("question").innerHTML += allQuestions[qIndex].question;
}

function writeAnswer(qIndex, ansIndex) {
  document.getElementById("answers").innerHTML +=
    "<input type='radio' name='"+qIndex+"' value='"+ansIndex+"'/> "+allQuestions[qIndex].choices[ansIndex]+"<br />";
}

function writeAllAnswers(qIndex) {
  for (var i = 0; i < allQuestions[qIndex].choices.length; i++)
    writeAnswer(qIndex, i);
}

//following function taken from http://stackoverflow.com/a/1423868
function getCheckedRadio() {
  var radios = document.getElementsByTagName("input");
  var value;
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      value = radios[i].value;
    }
  }
  return value;
}

function checkAnswer() {
  var selected = getCheckedRadio();
  var correct = allQuestions[currentQ].correctAnswer;
  if (selected == null)
    return -1;
  if (selected == correct)
    score++;
  if (correct == 4) {
    score++;
  }
}

function nextButton() {
  document.getElementById("answers").innerHTML += "<input type='button' id='next' value='Next'/>";
}

function clear() {
  document.getElementById("question").innerHTML = null;
  document.getElementById("answers").innerHTML = null;
}

function buildQuiz() {
  if (currentQ == allQuestions.length) {
    finalScreen();
  } else {
    writeQuestion(currentQ);
    writeAllAnswers(currentQ);
    nextButton();
    document.getElementById("next").addEventListener("click", checkIfSelected);
  }
}

function checkIfSelected() {
  if (checkAnswer() != null) {
    alert("No answer selected");
  } else {
    clear();
    currentQ++;
    buildQuiz();
  }
}

function finalScreen() {
  document.getElementById("question").innerHTML += "Your final score: "+(score/allQuestions.length)*100+"%";
}
document.addEventListener("DOMContentLoaded", function() {
  buildQuiz();
});