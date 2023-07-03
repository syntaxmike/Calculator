const clearButton = document.querySelector('#clearBtn');
const currentScreen = document.querySelector('#currentScreen');
const deleteButton = document.querySelector('#delBtn');
const decimalButton = document.querySelector('#decimalBtn');
const equalButton = document.querySelector('#equalBtn');
const signButton = document.querySelector('#signBtn');
const percentButton = document.querySelector('#percentBtn')
const previousScreen = document.querySelector('#previousScreen');

const digitButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');

const ADD = (a, b) => { return a + b };
const DIVIDE = (a, b) => { return a / b };
const MULTIPLY = (a, b) => { return a * b };
const SUBTRACT = (a, b) => { return a - b };
let firstInput = 0,
    secondInput = 0,
    currentOperator = '',
    boolResetScreen = false;


// Event-Listeners for buttons
digitButtons.forEach(digit => {
    digit.addEventListener('click', () => {
        addDigitToScreen(digit.textContent);
    })
});

operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        setOperation(operator.textContent);
    })
});

clearButton.addEventListener('click', clearAllScreens);
deleteButton.addEventListener('click', deleteDigit);
decimalButton.addEventListener('click', addDecimal);
equalButton.addEventListener('click', evaluate);
signButton.addEventListener('click', changeSign);
percentButton.addEventListener('click', calcPercent);


// Functions
function addDigitToScreen(digit) {
    if(currentScreen.textContent === '0' || boolResetScreen) clearScreen();
    currentScreen.textContent += digit;
}

function addDecimal() {
    if(!currentScreen.textContent.includes('.')){
        currentScreen.textContent += '.';
    }
}

function calculateResult(op, a, b) {
    a = +a;
    b = +b;
    switch(op) {
        case '+':
            return ADD(a, b);
        case '-':
            return SUBTRACT(a, b);
        case '/':
            return (b === 0) ? null : DIVIDE(a, b);
        case '*':
            return MULTIPLY(a, b);
    }
}

function calcPercent() {
    const num = +currentScreen.textContent;
    currentScreen.textContent = num / 100;
}

function changeSign() {
    if(!currentScreen.textContent.includes('-')) {
        const textLength = currentScreen.textContent.length + 1;
        currentScreen.textContent = currentScreen.textContent.padStart(textLength, '-')
    } else {
        currentScreen.textContent = currentScreen.textContent.slice(1);
    }
}

function clearScreen() {
    currentScreen.textContent = '';
    boolResetScreen = false;
}

function clearAllScreens() {
    currentScreen.textContent = '0';
    previousScreen.textContent = '';
    currentOperator = '';
    boolResetScreen = false;
}

function continueWithCurrentOperation() {
    boolResetScreen = true;
    firstInput = currentScreen.textContent;
}

function deleteDigit() {
    currentScreen.textContent = currentScreen.textContent.slice(0, -1);
    if(currentScreen.textContent === ''){
        currentScreen.textContent = '0';
    }
}

function evaluate() {
    if(currentOperator === null || boolResetScreen) return;
    if(currentOperator === '/' && currentScreen.textContent === '0') {
        alert("Error: Division by 0");
        return;
    }

    secondInput = currentScreen.textContent;
    currentScreen.textContent = calculateResult(currentOperator, firstInput, secondInput);
    previousScreen.textContent = `${firstInput} ${currentOperator} ${secondInput}`;
    continueWithCurrentOperation();
}


function setOperation(operator) {
    if(currentOperator === ''){
        firstInput = currentScreen.textContent;
        currentOperator = operator;
        previousScreen.textContent = `${firstInput} ${currentOperator}`;
        boolResetScreen = true;
    } else {
        currentOperator = operator;
        previousScreen.textContent = `${firstInput} ${currentOperator}`;
    }
    
}