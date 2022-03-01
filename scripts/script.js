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

//operators and button
const numpad = document.querySelectorAll(".numpad");
const operatorButtons = document.querySelectorAll(".operatorButton");
const equalSign = document.querySelector(".equalSign");
const plusSign = document.querySelector(".plusSign");
const clear = document.querySelector(".cls");
const deletus = document.querySelector(".del");
const dot = document.querySelector(".dot");

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

function includeDot() {
    if (
        !userInput.textContent.split(" ")[0].includes(".") &&
        !userInput.textContent.split(" ")[2]
    ) {
        userInput.textContent += dot.textContent;
    } else if (!userInput.textContent.split(" ")[2].includes(".")) {
        userInput.textContent += dot.textContent;
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
    result = Math.round(result * 1000000) / 1000000;
    return result;
}

function checkLastOperator() {
    if (
        // checks if theres an operator at the end of the input.textcontent, if there is then repace it else continue normal append to the string;
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

function checkStringForOperator() {
    //performs a series of checks to see if the following operators are present in the end of the input.
    let operatorMagic = userInput.textContent.slice(0, -2).split(" ")[1];
    if (
        (operatorMagic == "+" ||
            operatorMagic == "-" ||
            operatorMagic == "*" ||
            operatorMagic == "÷") &&
        userInput.textContent.slice(0, -2).split(" ")[2] != " "
    ) {
        return true;
    } else {
        return false;
    }
}
function determineResult() {
    if (checkLastOperator() || userInput.textContent.slice(-1) == ".") {
        checkoperateStack();
        return;
    } else {
        checkoperateStack();
        calculate();
        //  update the display with the ‘solution’ to the operation.
        userInput.textContent = result;
    }
}

clear.addEventListener("click", () => {
    operateStack = [];
    input = "";
    userInput.textContent = "";
    result = "";
});

deletus.addEventListener("click", () => {
    userInput.textContent = userInput.textContent.trim();
    if (checkLastOperator) {
        userInput.textContent = userInput.textContent.slice(0, -1);
    } else {
        userInput.textContent = userInput.textContent.slice(0, -1);
    }
    userInput.textContent = userInput.textContent.trim();
});

numpad.forEach((num) => {
    num.addEventListener("click", () => {
        userInput.textContent += num.textContent;
        input = userInput.textContent;
    });
});

dot.addEventListener("click", includeDot);

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        checkStringForOperator();
        // if theres no other input then dont do anything else there will be errors.

        if (
            !input ||
            !userInput.textContent ||
            userInput.textContent.slice(-1) == "."
        ) {
            return;
        } else if (checkLastOperator()) {
            // checks if theres an operator at the end of the input.textcontent, if there is then repace it else continue normal append to the string;
            let replaceOperator = userInput.textContent.slice(-2);
            // template literals `` are  specifically used to manipulate the operations
            userInput.textContent = userInput.textContent.replace(
                replaceOperator,
                `${operatorButton.textContent} `
            );
        } else if (checkStringForOperator()) {
            determineResult();
            userInput.textContent += ` ${operatorButton.textContent} `;
        } else {
            userInput.textContent += ` ${operatorButton.textContent} `;
        }
    });
});

equalSign.addEventListener("click", () => {
    // check if the display is empty and do nothing if it is avoiding a NAN error
    if (!input || !userInput.textContent) {
        return;
    }
    determineResult();
});
