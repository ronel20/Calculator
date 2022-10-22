let CalculatorUI = {
    allButtonsList: document.querySelectorAll('button.calculator-button, button.calculator-button-disabled'),
    calculatorDisplay: document.querySelector('input.screen'),
    dotButton: document.querySelector('button#dot-btn'),
    plusButton: document.querySelector('button#plus-btn'),
    minusButton: document.querySelector('button#minus-btn'),
    multiplyButton: document.querySelector('button#multiply-btn'),
    divideButton: document.querySelector('button#divide-btn'),
    equalButton: document.querySelector('button#equal-btn'),
    cancelButton: document.querySelector('button#cancel-button'),
    backspaceButton: document.querySelector('button#backspace-button'),
    numberButtons: [document.querySelector('button#digit0'),
                    document.querySelector('button#digit1'),
                    document.querySelector('button#digit2'),
                    document.querySelector('button#digit3'),
                    document.querySelector('button#digit4'),
                    document.querySelector('button#digit5'),
                    document.querySelector('button#digit6'),
                    document.querySelector('button#digit7'),
                    document.querySelector('button#digit8'),
                    document.querySelector('button#digit9')],
    BUTTON_ONE: '1',
    BUTTON_TWO: '2',
    BUTTON_THREE: '3',
    BUTTON_FOUR: '4',
    BUTTON_FIVE: '5',
    BUTTON_SIX: '6',
    BUTTON_SEVEN: '7',
    BUTTON_EIGHT: '8',
    BUTTON_NINE: '9',
    BUTTON_ZERO: '0',
    BUTTON_DOT: '.',
    BUTTON_PLUS: '+',
    BUTTON_MINUS: '-',
    BUTTON_MULTIPLY: 'X',
    BUTTON_DIVIDE: '÷',
    KEY_DIVIDE: '/',
    BUTTON_EQUALS: '=',
    KEY_ENTER: 'Enter',
    KEY_NAMPAD_ENTER: 'NumpadEnter', 
    BUTTON_CANCEL: 'C',
    BUTTON_BACKSPACE: '⌫',
    KEY_BACKSPACE: 'Backspace',
    KEY_ESCAPE: 'Escape',
    BUTTON_ON_CLASS: "calculator-button",
    BUTTON_OFF_CLASS: "calculator-button-disabled",
    MAX_DISPLAY_LENGTH: 10,
    ERROR_MESSAGE: "Err",
    EMPTY_DISPLAY: ""
    

                    

}

let CalculatorLogic = {
    MAX_VALUE: 9999999999,
    MIN_VALUE: -9999999999,
    arg1: undefined,
    arg2: undefined,
    operator: undefined,
    shouldClearDisplay: true
}

//add event listeners
CalculatorUI.allButtonsList.forEach((button) => {
    if (button.textContent>=CalculatorUI.BUTTON_ZERO && button.textContent<=CalculatorUI.BUTTON_NINE){
        button.addEventListener('click',() => numberButtonEventListener(button));
    }
    else if (button.textContent==CalculatorUI.BUTTON_DOT) {
        button.addEventListener('click',() => dotButtonEventListener(button));
    }
    else if (button.textContent==CalculatorUI.BUTTON_CANCEL){
        button.addEventListener('click',() => cancelButtonEventListener());
    }
    else if (button.textContent == CalculatorUI.BUTTON_PLUS || button.textContent == CalculatorUI.BUTTON_MINUS || button.textContent == CalculatorUI.BUTTON_MULTIPLY || button.textContent == CalculatorUI.BUTTON_DIVIDE){
        button.addEventListener('click',() => operatorButtonEventListener(button));
    }
    else if (button.textContent == CalculatorUI.BUTTON_EQUALS){
        button.addEventListener('click',() => equalButtonEventListener());
    }
    else if (button.textContent == CalculatorUI.BUTTON_BACKSPACE){
        button.addEventListener('click',() => backspaceButtonEventListener());
    }
})

// integrate keyboard
document.addEventListener('keyup', (e) => {
    switch(e.key){
        case CalculatorUI.BUTTON_ZERO:
        case CalculatorUI.BUTTON_ONE:
        case CalculatorUI.BUTTON_TWO:
        case CalculatorUI.BUTTON_THREE:
        case CalculatorUI.BUTTON_FOUR:
        case CalculatorUI.BUTTON_FIVE:
        case CalculatorUI.BUTTON_SIX:
        case CalculatorUI.BUTTON_SEVEN:
        case CalculatorUI.BUTTON_EIGHT:
        case CalculatorUI.BUTTON_NINE:    
            CalculatorUI.numberButtons[Number.parseInt(e.key)].click();
            break;
        case CalculatorUI.BUTTON_PLUS:
            CalculatorUI.plusButton.click();
            break;
        case CalculatorUI.BUTTON_MINUS:
            CalculatorUI.minusButton.click();
            break;
        case CalculatorUI.BUTTON_MULTIPLY:
            CalculatorUI.multiplyButton.click();
            break;
        case CalculatorUI.BUTTON_DIVIDE:
        case CalculatorUI.KEY_DIVIDE:    
            CalculatorUI.divideButton.click();
            break;
        case CalculatorUI.BUTTON_EQUALS:
        case CalculatorUI.KEY_ENTER:
        case CalculatorUI.KEY_NAMPAD_ENTER:    
            CalculatorUI.equalButton.click();
            break;
        case CalculatorUI.BUTTON_DOT:
            CalculatorUI.dotButton.click();
            break;
        case CalculatorUI.KEY_ESCAPE:
            CalculatorUI.cancelButton.click();
            break;
        case CalculatorUI.KEY_BACKSPACE:
            CalculatorUI.backspaceButton.click();
            break;
        default:
            break;    

    }

})

/**
 * runs when the backspace button is clicked
 * @returns undefined
 */
function backspaceButtonEventListener() {
    
    //display has text
    if (CalculatorUI.calculatorDisplay.value.length > 0) {
        CalculatorUI.calculatorDisplay.value = CalculatorUI.calculatorDisplay.value.slice(0, CalculatorUI.calculatorDisplay.value.length - 1);
        CalculatorLogic.shouldClearDisplay = false;
        
        //Toggle dot button
        if (!CalculatorUI.calculatorDisplay.value.includes(CalculatorUI.BUTTON_DOT)) {
            CalculatorUI.dotButton.className = CalculatorUI.BUTTON_ON_CLASS;
            CalculatorUI.dotButton.disabled = false;
        } else {
            CalculatorUI.dotButton.className = CalculatorUI.BUTTON_OFF_CLASS;
            CalculatorUI.dotButton.disabled = true;
        }

        //Toggle minus button. for negative numbers feature
        if (!CalculatorUI.calculatorDisplay.value.includes(CalculatorUI.BUTTON_MINUS) && CalculatorUI.minusButton.disabled) {
            CalculatorUI.minusButton.className = CalculatorUI.BUTTON_ON_CLASS;
            CalculatorUI.minusButton.disabled = false;
        }
    }

    //display doesn't have text
    if (CalculatorUI.calculatorDisplay.value.length == 0) {
        resetCalcUI();
        if (CalculatorLogic.arg1 != undefined) {
            CalculatorUI.cancelButton.className = CalculatorUI.BUTTON_ON_CLASS;
            CalculatorUI.cancelButton.disabled = false;
        }
    }
}

/**
 * runs when a number button is clicked
 * @returns undefined
 */
function numberButtonEventListener(button) {

    //new input
    if (CalculatorLogic.shouldClearDisplay) {
        CalculatorUI.calculatorDisplay.value = button.textContent;
        CalculatorLogic.shouldClearDisplay = false;
    }

    //current input
    else if (CalculatorUI.calculatorDisplay.value.length < CalculatorUI.MAX_DISPLAY_LENGTH) {
        CalculatorUI.calculatorDisplay.value += button.textContent;
    }

    //UI changes
    CalculatorUI.plusButton.disabled = false;
    CalculatorUI.minusButton.disabled = false;
    CalculatorUI.multiplyButton.disabled = false;
    CalculatorUI.divideButton.disabled = false;
    CalculatorUI.backspaceButton.disabled = false;
    CalculatorUI.cancelButton.disabled = false;
    CalculatorUI.plusButton.className = CalculatorUI.BUTTON_ON_CLASS;
    CalculatorUI.minusButton.className = CalculatorUI.BUTTON_ON_CLASS;
    CalculatorUI.multiplyButton.className = CalculatorUI.BUTTON_ON_CLASS;
    CalculatorUI.divideButton.className = CalculatorUI.BUTTON_ON_CLASS;
    CalculatorUI.cancelButton.className = CalculatorUI.BUTTON_ON_CLASS;
    CalculatorUI.backspaceButton.className = CalculatorUI.BUTTON_ON_CLASS;
    if (CalculatorLogic.arg1 != undefined) {
        CalculatorUI.equalButton.className = CalculatorUI.BUTTON_ON_CLASS;
        CalculatorUI.equalButton.disabled = false;
    }
}

/**
 * runs when the dot button is clicked
 * @returns undefined
 */
function dotButtonEventListener(button) {

    if (!button.disabled) {
        button.disabled = true;
        button.className = CalculatorUI.BUTTON_OFF_CLASS;

        //pressing dot on empty display or new input will add 0 first
        if (CalculatorLogic.shouldClearDisplay) {
            CalculatorUI.numberButtons[0].click()
            CalculatorUI.calculatorDisplay.value += button.textContent;
        }
        else if (CalculatorUI.calculatorDisplay.value.length < CalculatorUI.MAX_DISPLAY_LENGTH) {
            //dot press before numbers button
            if (CalculatorUI.calculatorDisplay.value == CalculatorUI.BUTTON_MINUS){
                CalculatorUI.numberButtons[0].click();
            }
            CalculatorUI.calculatorDisplay.value += button.textContent;
        }

        //UI Changes
        CalculatorLogic.shouldClearDisplay = false;
        CalculatorUI.backspaceButton.disabled = false;
        CalculatorUI.cancelButton.disabled = false;
        CalculatorUI.plusButton.disabled = false;
        CalculatorUI.minusButton.disabled = false;
        CalculatorUI.multiplyButton.disabled = false;
        CalculatorUI.divideButton.disabled = false;
        CalculatorUI.cancelButton.className = CalculatorUI.BUTTON_ON_CLASS;
        CalculatorUI.backspaceButton.className = CalculatorUI.BUTTON_ON_CLASS;
        CalculatorUI.plusButton.className = CalculatorUI.BUTTON_ON_CLASS;
        CalculatorUI.minusButton.className = CalculatorUI.BUTTON_ON_CLASS;
        CalculatorUI.multiplyButton.className = CalculatorUI.BUTTON_ON_CLASS;
        CalculatorUI.divideButton.className = CalculatorUI.BUTTON_ON_CLASS;
    }
}

/**
 * runs when the cancel button is clicked
 * @returns undefined
 */
function cancelButtonEventListener() {
    CalculatorUI.calculatorDisplay.value = CalculatorUI.EMPTY_DISPLAY;
    CalculatorUI.dotButton.disabled = false;
    CalculatorUI.dotButton.className = CalculatorUI.BUTTON_ON_CLASS;
    reset();
    resetCalcUI();
}

/**
 * runs when an operator button is clicked
 * @returns undefined
 */
function operatorButtonEventListener(button) {
    //allow minus at begining of number
    //if calculator is showing a vaild result on display (after '=' operation), minus is considered an operator input
    if (button.textContent == CalculatorUI.BUTTON_MINUS && (CalculatorUI.calculatorDisplay.value == CalculatorUI.EMPTY_DISPLAY || CalculatorUI.calculatorDisplay.value == CalculatorUI.ERROR_MESSAGE || (CalculatorLogic.shouldClearDisplay && CalculatorLogic.arg1 != undefined))){
        CalculatorUI.calculatorDisplay.value = button.textContent;
        CalculatorUI.minusButton.className = CalculatorUI.BUTTON_OFF_CLASS;
        CalculatorUI.minusButton.disabled = true;
        CalculatorUI.backspaceButton.className = CalculatorUI.BUTTON_ON_CLASS;
        CalculatorUI.backspaceButton.disabled = false;
        CalculatorLogic.shouldClearDisplay = false;
        return;
    }

    //set first argument
    if (CalculatorLogic.arg1 == undefined) {
        CalculatorLogic.arg1 = +CalculatorUI.calculatorDisplay.value;
        CalculatorLogic.operator = button.textContent;
        resetCalcUI();
    }

    //set second argument
    else {
        CalculatorLogic.arg2 = +CalculatorUI.calculatorDisplay.value;
        CalculatorLogic.arg1 = operate(CalculatorLogic.operator, CalculatorLogic.arg1, CalculatorLogic.arg2);
        
        // division by 0. or number out of range 
        if (CalculatorLogic.arg1 > CalculatorLogic.MAX_VALUE || CalculatorLogic.arg1 < CalculatorLogic.MIN_VALUE) {
            CalculatorUI.calculatorDisplay.value = CalculatorUI.ERROR_MESSAGE;
            reset();
            resetCalcUI();
        }

        //result is integer
        else if (Number.isInteger(CalculatorLogic.arg1)) {
            CalculatorUI.calculatorDisplay.value = CalculatorLogic.arg1;
        }

        //result is float
        else {
            CalculatorUI.calculatorDisplay.value = Number.parseFloat(CalculatorLogic.arg1).toFixed(3);
        }
        CalculatorLogic.operator = button.textContent;
        resetCalcUI();         
    }
    if (CalculatorLogic.arg1 != undefined) {
        CalculatorUI.cancelButton.className = CalculatorUI.BUTTON_ON_CLASS;
        CalculatorUI.cancelButton.disabled = false;
    }
}

/**
 * runs when the equal button is clicked
 * @returns undefined
 */
function equalButtonEventListener() {
        let result = undefined;
        CalculatorLogic.arg2 = +CalculatorUI.calculatorDisplay.value;
        result = operate(CalculatorLogic.operator, CalculatorLogic.arg1, CalculatorLogic.arg2);
        if (result > CalculatorLogic.MAX_VALUE || result < CalculatorLogic.MIN_VALUE) {
            CalculatorUI.calculatorDisplay.value = CalculatorUI.ERROR_MESSAGE;
            resetCalcUI();
        }
        else if (Number.isInteger(result)) {
            CalculatorUI.calculatorDisplay.value = result;
        }
        else {
            CalculatorUI.calculatorDisplay.value = Number.parseFloat(result).toFixed(3);
        }
        reset();
        CalculatorUI.equalButton.disabled = true;
        CalculatorUI.equalButton.className = CalculatorUI.BUTTON_OFF_CLASS;
        CalculatorUI.dotButton.disabled = false;
        CalculatorUI.dotButton.className = CalculatorUI.BUTTON_ON_CLASS;
}

/**
 * Reset calculator logical status 
 */
function reset() {
    CalculatorLogic.shouldClearDisplay = true;
    CalculatorLogic.arg1 = undefined;
    CalculatorLogic.arg2 = undefined;
    CalculatorLogic.operator = undefined;
}

/**
 * Reset calculator visual status 
 */
function resetCalcUI() {
    CalculatorLogic.shouldClearDisplay = true;
    CalculatorUI.dotButton.disabled = false;
    CalculatorUI.plusButton.disabled = true;
    CalculatorUI.multiplyButton.disabled = true;
    CalculatorUI.divideButton.disabled = true;
    CalculatorUI.equalButton.disabled = true;
    CalculatorUI.cancelButton.disabled = true;
    CalculatorUI.backspaceButton.disabled = true;
    CalculatorUI.dotButton.className = CalculatorUI.BUTTON_ON_CLASS;
    CalculatorUI.plusButton.className = CalculatorUI.BUTTON_OFF_CLASS;
    CalculatorUI.multiplyButton.className = CalculatorUI.BUTTON_OFF_CLASS;
    CalculatorUI.divideButton.className = CalculatorUI.BUTTON_OFF_CLASS;
    CalculatorUI.equalButton.className = CalculatorUI.BUTTON_OFF_CLASS;
    CalculatorUI.cancelButton.className = CalculatorUI.BUTTON_OFF_CLASS;
    CalculatorUI.backspaceButton.className = CalculatorUI.BUTTON_OFF_CLASS;
}

/**
 * apply basic math functions
 * @param {string} operator operator to apply on argumunts
 * @param {number} num1 first argument
 * @param {number} num2 second argument
 * @returns result of math operation
 */
function operate(operator, num1, num2){
    if (operator == CalculatorUI.BUTTON_PLUS){
        return add(num1,num2);
    }
    else if (operator == CalculatorUI.BUTTON_MINUS){
        return subtract(num1,num2);
    }
    else if (operator == CalculatorUI.BUTTON_MULTIPLY){
        return multiply(num1,num2);
    }
    else if (operator == CalculatorUI.BUTTON_DIVIDE){
        return divide(num1,num2);
    }
}

/**
 * add second number to the first number
 * @param {number} num1 first number
 * @param {number} num2 second number
 * @returns sum of the numbers
 */
function add(num1,num2){
    return num1+num2;
}

/**
 * subtract second number from the first number
 * @param {number} num1 first number
 * @param {number} num2 second number
 * @returns subtraction of the numbers
 */
function subtract(num1,num2){
    return num1-num2;
}

/**
 * multiply second number and the first number
 * @param {number} num1 first number
 * @param {number} num2 second number
 * @returns mutiplication of the numbers
 */
function multiply(num1,num2){
    return num1*num2;
}

/**
 * divide first number by the second number number
 * @param {number} num1 first number
 * @param {number} num2 second number
 * @returns devition of the first number by the second
 */
function divide(num1,num2){
    return num1/num2;
}