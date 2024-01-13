// quiz_display2.js

import questions from "../quiz_data/quiz_data2.js";
let currentQuestionIndex = 0;
let correctAnswers = 0;
let questionResults = []; // 新しい変数を追加
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const returnHomeButton = document.getElementById('returnHome');

const restartButton = document.createElement('button');
restartButton.id = 'restart';
restartButton.style.display = 'none';
restartButton.textContent = 'やり直す';
restartButton.onclick = restartQuiz;

const quizContainer = document.getElementById('quiz-container');
quizContainer.appendChild(restartButton);

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = "問題 " + (currentQuestionIndex + 1) + ": " + currentQuestion.question;


    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.onclick = function () {
            chooseAnswer(choice);
        };
        choicesElement.appendChild(choiceButton);
    });
}

function chooseAnswer(choice) {
    const currentQuestion = questions[currentQuestionIndex];
    if (choice === currentQuestion.correctAnswer) {
        resultElement.textContent = "正解！正解は「" + currentQuestion.correctAnswer + "」です。";
        correctAnswers++;
        questionResults.push(true); // 正解を配列に追加
    } else {
        resultElement.textContent = "不正解。正解は「" + currentQuestion.correctAnswer + "」です。";
        questionResults.push(false); // 不正解を配列に追加
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }


}

function showResult() {
   
    resultElement.textContent = "クイズ終了！";
    scoreElement.textContent = "正解数: " + correctAnswers + " / " + questions.length;
    restartButton.style.display = "block";
    returnHomeButton.style.display = "block";
    choicesElement.innerHTML = "";

   
        // 成績表の追加
        let gradingTable = "<table border='2'><caption>成績発表</caption>";
        gradingTable += "<tr><th>問題</th>";
    
        // 問題番号を追加
        for (let i = 0; i < questions.length; i++) {
            gradingTable += "<th>" + (i + 1) + "</th>";
        }
        gradingTable += "</tr>";
    
        // 成績を追加
        gradingTable += "<tr><th>成績</th>";
        for (let i = 0; i < questions.length; i++) {
            gradingTable += "<td>" + (questionResults[i]? "○" : "×") + "</td>";
        }
        gradingTable += "</tr>";
        gradingTable += "</table>";
    
        // 成績表を表示
        document.getElementById("score").innerHTML = gradingTable;

        // 問題と正誤
        for (let i = 0; i < questions.length; i++) {
            const currentQuestion = questions[i];
            const result = document.createElement('p');
            const isCorrect = questionResults[i]; // 現在の問題が正解かどうかの判定
        
            result.textContent = "問題 " + (i + 1) + ": 問題文: " + currentQuestion.question + (isCorrect ? " ○ " : " × ") + " 正解は「" + currentQuestion.correctAnswer + "」です。";
            choicesElement.appendChild(result);
        }


}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    questionResults = []; // 初期化
    choicesElement.innerHTML = "";
    resultElement.textContent = "";
    scoreElement.textContent = "";
    restartButton.style.display = "none";
    returnHomeButton.style.display = "none";
    loadQuestion();
    
  }



// 最初の質問を読み込む
loadQuestion();