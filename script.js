const MAX_VALUE = 9999999999;
const MIN_VALUE = -9999999999;


let CalculatorUI = {
    allButtonsList:document.querySelectorAll('button.calculator-button, button.calculator-button-disabled'),
    calculatorDisplay:document.querySelector('input.screen'),
    dotButton:document.querySelector('button#dot-btn'),
    plusButton:document.querySelector('button#plus-btn'),
    minusButton:document.querySelector('button#minus-btn'),
    multiplyButton:document.querySelector('button#multiply-btn'),
    divideButton:document.querySelector('button#divide-btn'),
    equalButton:document.querySelector('button#equal-btn')
}

let CalculatorLogic = {
    arg1: undefined,
    arg2: undefined,
    operator: undefined,
    shouldClearDisplay: true
}

console.log(CalculatorUI.calculatorDisplay);

CalculatorUI.allButtonsList.forEach((button) => {
    if (button.textContent>='0' && button.textContent<='9'){
        button.addEventListener('click',numberButtonEventListener(button));
    }
    else if (button.textContent=='.') {
        button.addEventListener('click',dotButtonEventListener(button));
    }
    else if (button.textContent=='C'){
        button.addEventListener('click',cancelButtonEventListener());
    }
    else if (button.textContent == '+' || button.textContent == '-' || button.textContent == 'X' || button.textContent == '÷'){
        button.addEventListener('click',operatorButtonEventListener(button));
    }
    else if (button.textContent == '='){
        button.addEventListener('click',equalButtonEventListener());
    }
})

function numberButtonEventListener(button) {
    return () => {
        if (CalculatorLogic.shouldClearDisplay) {
            CalculatorUI.calculatorDisplay.value = button.textContent;
            CalculatorLogic.shouldClearDisplay = false;
        }
        else if (CalculatorUI.calculatorDisplay.value.length < 10) {
            CalculatorUI.calculatorDisplay.value += button.textContent;
        }
        CalculatorUI.plusButton.disabled = false;
        CalculatorUI.minusButton.disabled = false;
        CalculatorUI.multiplyButton.disabled = false;
        CalculatorUI.divideButton.disabled = false;
        CalculatorUI.plusButton.className = "calculator-button";
        CalculatorUI.minusButton.className = "calculator-button";
        CalculatorUI.multiplyButton.className = "calculator-button";
        CalculatorUI.divideButton.className = "calculator-button";
        if (CalculatorLogic.arg1 != undefined) {
            CalculatorUI.equalButton.className = "calculator-button";
            CalculatorUI.equalButton.disabled = false;
        }

    };
}

function dotButtonEventListener(button) {
    return () => {
        if (!button.disabled) {
            button.disabled = true;
            button.className = "calculator-button-disabled";
            if (CalculatorLogic.shouldClearDisplay) {
                CalculatorUI.calculatorDisplay.value = "0" + button.textContent;
            }
            else if (CalculatorUI.calculatorDisplay.value.length < 10) {
                CalculatorUI.calculatorDisplay.value += button.textContent;
            }
            CalculatorLogic.shouldClearDisplay = false;
        }
    };
}

function cancelButtonEventListener() {
    return () => {
        CalculatorUI.calculatorDisplay.value = "0";
        CalculatorUI.dotButton.disabled = false;
        CalculatorUI.dotButton.className = "calculator-button";
        reset();
        resetCalcUI();
    };
}

function operatorButtonEventListener(button) {
    return () => {
        if (CalculatorLogic.arg1 == undefined) {
            CalculatorLogic.arg1 = +CalculatorUI.calculatorDisplay.value;
            CalculatorLogic.operator = button.textContent;
            CalculatorLogic.shouldClearDisplay = true;
            CalculatorUI.dotButton.disabled = false;
            CalculatorUI.dotButton.className = "calculator-button";
        }
        else {
            CalculatorLogic.arg2 = +CalculatorUI.calculatorDisplay.value;
            CalculatorLogic.arg1 = operate(CalculatorLogic.operator, CalculatorLogic.arg1, CalculatorLogic.arg2);
            if (CalculatorLogic.arg1 > MAX_VALUE || CalculatorLogic.arg1 < MIN_VALUE) {
                CalculatorUI.calculatorDisplay.value = "Err";
                reset();
            }
            else if (Number.isInteger(CalculatorLogic.arg1)) {
                CalculatorUI.calculatorDisplay.value = CalculatorLogic.arg1;
            }
            else {
                CalculatorUI.calculatorDisplay.value = Number.parseFloat(CalculatorLogic.arg1).toPrecision(3);
            }
            CalculatorLogic.operator = button.textContent;
            resetCalcUI();
        }
    };
}

function equalButtonEventListener() {
    return () => {
        if (CalculatorLogic.arg1 == undefined) {
            return;
        }
        else {
            let result = undefined;
            CalculatorLogic.arg2 = +CalculatorUI.calculatorDisplay.value;
            result = operate(CalculatorLogic.operator, CalculatorLogic.arg1, CalculatorLogic.arg2);
            if (result > MAX_VALUE || result < MIN_VALUE) {
                CalculatorUI.calculatorDisplay.value = "Err";
            }
            else if (Number.isInteger(result)) {
                CalculatorUI.calculatorDisplay.value = result;
            }
            else {
                CalculatorUI.calculatorDisplay.value = Number.parseFloat(result).toPrecision(3);
            }

            reset();
            resetCalcUI();
        }
    };
}

function reset() {
    CalculatorLogic.shouldClearDisplay = true;
    CalculatorLogic.arg1 = undefined;
    CalculatorLogic.arg2 = undefined;
    CalculatorLogic.operator = undefined;
}

function resetCalcUI() {
    CalculatorLogic.shouldClearDisplay = true;
    CalculatorUI.dotButton.disabled = false;
    CalculatorUI.plusButton.disabled = true;
    CalculatorUI.minusButton.disabled = true;
    CalculatorUI.multiplyButton.disabled = true;
    CalculatorUI.divideButton.disabled = true;
    CalculatorUI.equalButton.disabled = true;
    CalculatorUI.dotButton.className = "calculator-button";
    CalculatorUI.plusButton.className = "calculator-button-disabled";
    CalculatorUI.minusButton.className = "calculator-button-disabled";
    CalculatorUI.multiplyButton.className = "calculator-button-disabled";
    CalculatorUI.divideButton.className = "calculator-button-disabled";
    CalculatorUI.equalButton.className = "calculator-button-disabled";
}

function operate(operator, num1, num2){
    if (operator == '+'){
        return add(num1,num2);
    }
    else if (operator == '-'){
        return subtract(num1,num2);
    }
    else if (operator == 'X'){
        return multiply(num1,num2);
    }
    else if (operator == '÷'){
        return divide(num1,num2);
    }

}

function add(num1,num2){
    return num1+num2;
}
function subtract(num1,num2){
    return num1-num2;
}
function multiply(num1,num2){
    return num1*num2;
}
function divide(num1,num2){
    if (num2 == 0){
        return "Err";
    }
    return num1/num2;
}