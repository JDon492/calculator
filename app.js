//Links to all page data
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const positiveNegativeButton = document.querySelector("[data-positive-negative]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]")

//Calculator Class
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    //Clears Display & Operations

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    //Deletes singulator numbers from display

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //Appends numbers to the end of the display text

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    //Moves current operand to previous operand when selecting a operation button

    chooseOperation(operation) {

        //Disables moving the text if no numbers have been entered
        if (this.currentOperand === "") return

        //Will compute the already selected text & operation if another operation key is entered
        if (this.previousOperand !== "") {
            this.compute()
        }

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    //Changes value to negative or positive 

    posiNegative() {
        if (this.currentOperand == "") return
        if (this.currentOperand.toString().includes("-")) {
            this.currentOperand = this.currentOperand.substring(1)
        } else {
        this.currentOperand = "-" + this.currentOperand
        }
    }
    
    //Computes the numbers with the operation selected

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break
            case "%":
                computation = prev % current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ""
        this.operation = undefined
    }

    //Will convert to locale string, adding commas for better readability
    //Will also allow functionality to use a decimal point as the first key entered and multiple zeroes

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    //Updates Calculator Display Text

    updateDisplay() {
        this.currentOperandText.innerText = 
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandText.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerText = ""
        }
    }
}

//Calculator Button Operations

const calculator = new Calculator(previousOperandText, currentOperandText);

//Number Buttons

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//Operation Buttons

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

//Equals Button

equalsButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

//All Clear Button

allClearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

//Delete Button

deleteButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})

//Positive Negative Button

positiveNegativeButton.addEventListener("click", () => {
    calculator.posiNegative()
    calculator.updateDisplay()
})