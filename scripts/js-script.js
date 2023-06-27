const add = (a, b) => { return a + b };
const subract = (a, b) => { return a - b };
const multiply = (a, b) => { return a * b };
const divide = (a, b) => { return a / b };
let firstInput = 0,
    secondInput = 0,
    operator = "";

function handleClick(e) {
    console.log(e.target.dataset.key);
};

// function operate(aNum, bNum, oper) {

// };

const calcButtons = document.querySelectorAll('button');

calcButtons.forEach(key => key.addEventListener('click', handleClick));

console.log(calcButtons);
