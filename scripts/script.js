const add = function (a, b) {
    return a + b;
};

const subtract = function (a, b) {
    return a - b;
};

const multiply = function (a, b) {
    return a * b;
};

const divide = function (a, b) {
    return a / b;
};

const operate = function (operator, num1, num2) {
    return operator(num1, num2);
};

// Create the functions that populate the display when you click the number buttons… you should be storing the ‘display value’ in a variable somewhere for use in the next step.

// display portion
const userInput = document.querySelector(".userinput");
const resultsDisplay = document.querySelector(".display");

//operators and button
const numpad = document.querySelectorAll(".numpad");
const operatorButtons = document.querySelectorAll(".operatorButton");
const equalSign = document.querySelector(".equalSign");
const plusSign = document.querySelector(".plusSign");
const clear = document.querySelector(".cls");
const deletus = document.querySelector(".del");

let val1;
let val2;
let input = "";
let result;
let operator;
let operateStack = [];

function checkoperateStack() {
    //perform a check on the operateStack stack
    if (operateStack.length < 1) {
        operateStack.push(...userInput.textContent.split(" "));
        val1 = +operateStack.shift();
        operator = operateStack.shift();
        val2 = +operateStack.shift();
    } else {
        val1 = +operateStack.shift();
        operator = operateStack.shift();
        val2 = +operateStack.shift();
    }
}

function calculate() {
    // checks which operator to use
    switch (operator) {
        case "+":
            result = operate(add, val1, val2);
            break;
        case "-":
            result = operate(subtract, val1, val2);
            break;
        case "*":
            result = operate(multiply, val1, val2);
            break;
        case "÷":
            result = operate(divide, val1, val2);
            break;
    }
    result = Math.round(result * 10000) / 10000;
    return result;
}

function checkLastOperator() {
    if (
        //performs a series of checks to see if the following operators are present in the end of the input.
        userInput.textContent.slice(-2).includes("+") ||
        userInput.textContent.slice(-2).includes("-") ||
        userInput.textContent.slice(-2).includes("*") ||
        userInput.textContent.slice(-2).includes("÷")
    ) {
        return true;
    } else {
        return false;
    }
}

clear.addEventListener("click", () => {
    operateStack = [];
    input = "";
    userInput.textContent = "";
    result = "";
    resultsDisplay.textContent = "";
});

deletus.addEventListener("click", () => {
    if (checkLastOperator) {
        userInput.textContent = userInput.textContent.slice(-2, -1);
    } else {
        userInput.textContent = userInput.textContent.slice(0, -1);
    }
});

numpad.forEach((num) => {
    num.addEventListener("click", () => {
        userInput.textContent += num.textContent;
        input = userInput.textContent;
    });
});

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        //if theres no other input then dont do anything else there will be errors.
        if (!input) {
            return;
        } else if (checkLastOperator()) {
            // checks if theres an operator at the end of the input.textcontent, if there is then replace it else continue normal append to the string
            let replaceOperator = userInput.textContent.slice(-2);
            // template literals `` are used specifically to manipulate the operations spaces as thats the only way
            userInput.textContent = userInput.textContent.replace(
                replaceOperator,
                `${operatorButton.textContent} `
            );
        } else {
            userInput.textContent += ` ${operatorButton.textContent} `;
        }
    });
});

equalSign.addEventListener("click", () => {
    if (checkLastOperator()) {
        checkoperateStack();
        return;
    } else {
        checkoperateStack();
        calculate();
        //  update the display with the ‘solution’ to the operation.
        userInput.textContent = result;
    }
});

// This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

// Gotchas: watch out for and fix these bugs if they show up in your code:
// Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42.

// Your calculator should not evaluate more than a single pair of numbers at a time. Example: you press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-). Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).

// Display a snarky error message if the user tries to divide by 0… don’t let it crash your calculator!
