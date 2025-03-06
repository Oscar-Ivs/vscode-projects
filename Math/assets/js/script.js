document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    const rangeButton = document.getElementById('change-range');
    const rangeDisplay = document.getElementById('max-range');
    let maxRange = 25;

    rangeButton.addEventListener('click', () => {
        const newRange = prompt('Enter new range (1-99):', maxRange);
        if (newRange && !isNaN(newRange) && newRange > 0 && newRange < 100) {
            maxRange = newRange;
            rangeDisplay.textContent = maxRange;
        }
    });

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let gameType = this.getAttribute("data-type");
            console.log("Button clicked:", this);
            console.log("Game type:", gameType);

            if (gameType) {
                runGame(gameType);
            } else if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                alert("Unknown game type: null");
            }
        });
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame("addition");

    function runGame(gameType) {
        document.getElementById("answer-box").value = "";
        document.getElementById("answer-box").focus();

        let num1 = Math.floor(Math.random() * maxRange) + 1;
        let num2 = Math.floor(Math.random() * maxRange) + 1;

        if (gameType === "addition") {
            displayAdditionQuestion(num1, num2);
        } else if (gameType === "multiply") {
            displayMultiplyQuestion(num1, num2);
        } else if (gameType === "subtract") {
            displaySubtractQuestion(num1, num2);
        } else {
            alert(`Unknown game type: ${gameType}`);
            throw `Unknown game type: ${gameType}. Aborting!`;
        }
    }

    function checkAnswer() {
        let userAnswer = parseInt(document.getElementById("answer-box").value);
        let calculatedAnswer = calculateCorrectAnswer();
        let isCorrect = userAnswer === calculatedAnswer[0];

        if (isCorrect) {
            alert("Hey! You got it right! :D");
            incrementScore();
        } else {
            alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
            incrementWrongAnswer();
        }

        runGame(calculatedAnswer[1]);
    }

    function calculateCorrectAnswer() {
        let operand1 = parseInt(document.getElementById('operand1').innerText);
        let operand2 = parseInt(document.getElementById('operand2').innerText);
        let operator = document.getElementById("operator").innerText;

        if (operator === "+") {
            return [operand1 + operand2, "addition"];
        } else if (operator === "x") {
            return [operand1 * operand2, "multiply"];
        } else if (operator === "-") {
            return [operand1 - operand2, "subtract"];
        } else {
            alert(`Unimplemented operator ${operator}`);
            throw `Unimplemented operator ${operator}. Aborting!`;
        }
    }

    function incrementScore() {
        let oldScore = parseInt(document.getElementById("score").innerText);
        document.getElementById("score").innerText = ++oldScore;
    }

    function incrementWrongAnswer() {
        let oldScore = parseInt(document.getElementById("incorrect").innerText);
        document.getElementById("incorrect").innerText = ++oldScore;
    }

    function displayAdditionQuestion(operand1, operand2) {
        document.getElementById('operand1').textContent = operand1;
        document.getElementById('operand2').textContent = operand2;
        document.getElementById('operator').textContent = "+";
    }

    function displaySubtractQuestion(operand1, operand2) {
        document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
        document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
        document.getElementById('operator').textContent = "-";
    }

    function displayMultiplyQuestion(operand1, operand2) {
        document.getElementById('operand1').textContent = operand1;
        document.getElementById('operand2').textContent = operand2;
        document.getElementById('operator').textContent = "x";
    }
});
