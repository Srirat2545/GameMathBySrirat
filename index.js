document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const scoreElement = document.getElementById('score');
    const operand1Input = document.getElementById('operand1');
    const operand2Input = document.getElementById('operand2');
    const userAnswerInput = document.getElementById('userAnswer');
    const answerButton = document.getElementById('answerButton');
    const resultText = document.getElementById('resultText');

    const operatorRadios = document.getElementsByName('operator');
    const radioText = document.getElementById('radioText');

    let score = 0;
    let totalQuestions = 0;
    let selectedOperator = "+";
    let canGenerateQuestion = false;

    function generateQuestion() {
        if (canGenerateQuestion) {
            operand1Input.value = Math.floor(Math.random() * 100);
            operand2Input.value = Math.floor(Math.random() * 100);
        }
    }

    function checkAnswer() {
        
        if (userAnswerInput.value === '') {
            alert('กรุณากรอกคำตอบก่อน');
            return;
        }

        const num1 = parseFloat(operand1Input.value);
        const num2 = parseFloat(operand2Input.value);
        const userAnswer = parseFloat(userAnswerInput.value);

        const precision = 2;
        const correctAnswer = (selectedOperator === 'add') ? (num1 + num2) :
                             (selectedOperator === 'subtract') ? (num1 - num2) :
                             (selectedOperator === 'multiply') ? (num1 * num2) :
                             (selectedOperator === 'divide') ? (num1 / num2) : 0;
        const correctAnswerRounded = correctAnswer.toFixed(precision);
        const userAnswerRounded = userAnswer.toFixed(precision);

        if (userAnswerRounded === correctAnswerRounded) {
            resultText.textContent = 'ถูกต้อง!';
            score++;
        } else {
            resultText.textContent = 'ผิดพลาด เอาใหม่!';
        }

        totalQuestions++;
        scoreElement.textContent = `${score}/${totalQuestions}`;
        generateQuestion();
        userAnswerInput.value = '';
    }

    startButton.addEventListener('click', function () {
        score = 0;
        totalQuestions = 0;
        scoreElement.textContent = '0/0';
        canGenerateQuestion = true;
        generateQuestion();
        resultText.textContent = '';
        setDefaultOperator();
    });

    function setDefaultOperator() {
        operatorRadios[0].checked = true;
        selectedOperator = operatorRadios[0].value;
        radioText.textContent = '+';
    }

    for (let i = 0; i < operatorRadios.length; i++) {
        operatorRadios[i].addEventListener('change', function () {
            selectedOperator = operatorRadios[i].value;
            radioText.textContent = operatorRadios[i].nextSibling.textContent.trim();

            if (userAnswerInput.value !== '') {
                generateQuestion();
                resultText.textContent = '';
            }
        });
    }

    answerButton.addEventListener('click', checkAnswer);

    setDefaultOperator();

    generateQuestion();
});
