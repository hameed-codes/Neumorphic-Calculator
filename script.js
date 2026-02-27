//DOM Elements
const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.btn');
const secondaryScreen = document.querySelector('.secondary-screen');
const themeBtn = document.querySelector("#toggle-mode");

//Variables
let num1 = null;
let num2 = null;
let operator = null;
let result = null;
let lightMode = true;

//Function for basic arthmatics 
let basicOperations = (num1, num2, operator) => {
    switch(operator) {
        case "add":
            return num1 + num2;
        
        case "subtract":
            return num1 - num2;
        
        case "multiply":
            return num1 * num2;
        
        case "divide":
            if(num2 === 0) {
                return "Error: Division by 0";
            } else {
                return num1 / num2; 
            }
        
    }
}

function getOperator(op) {
    const symbols = {
        add : "+",
        subtract : "-",
        multiply : "x",
        divide : "÷"
    }

    return symbols[op];
}

//Event Listeners for buttons + Main Logic of calculation
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        //Digit and Point Functionality
        if (button.classList.contains("digit")) {
            screen.innerText += button.innerText;
        }
        else if(button.id === "point")
        {
            if(screen.innerText === "" || screen.innerText === "-")
            {
                screen.innerText += "0.";
            } 
            else if (screen.innerText.includes("."))
            {
                return;
            }
            else {
                screen.innerText += ".";
            }
        }
        //Clear and Delete Functionality
        else if(button.id === "clear") {
            screen.innerText = "";
            secondaryScreen.innerText = "";
            num1 = null;
            num2 = null;
            result = null;
            operator = null;
        }
        else if(button.id === "delete" && screen.innerText.length > 0) {
            screen.innerText = screen.innerText.slice(0, -1);
        }
        //Operator Functionality
        else if (button.classList.contains("operator")) {
            if(screen.innerText.length === 0 && secondaryScreen.innerText.length === 0)
            {
                if(button.id === "subtract") {
                    screen.innerText += "-";
                } else {
                    return;
                }
            }
            else {
                if(secondaryScreen.innerText.slice(-1) === "+" || secondaryScreen.innerText.slice(-1) === "-" || secondaryScreen.innerText.slice(-1) === "x" || secondaryScreen.innerText.slice(-1) === "÷")
                {
                    if(screen.innerText.length === 0) {
                    operator = button.id;
                    secondaryScreen.innerText = secondaryScreen.innerText.slice(0, -1) + `${getOperator(operator)}`;
                    return;
                    }
                }
                if (num1 === null) {
                    if(screen.innerText === "-")
                    {
                        screen.innerText = "";
                        return
                    }
                    num1 = parseFloat(screen.innerText);
                    operator = button.id;
                    secondaryScreen.innerText = `${num1} ${getOperator(operator)}`;
                    screen.innerText = "";
                } else {
                    if(button.id === operator && screen.innerText.length === 0) {
                        return;
                    }
                    num2 = parseFloat(screen.innerText);
                    result = basicOperations(num1, num2, operator);
                    num1 = result;
                    operator = button.id;
                    secondaryScreen.innerText = `${num1} ${getOperator(operator)}`;
                    screen.innerText = "";
                    num2 = null;
                }
                    
            }   
        
        }

        //Equals Functionality
        else if (button.id === "equals" && num1 !== null && operator !== null && screen.innerText.length > 0) {
            num2 = parseFloat(screen.innerText);
            result = basicOperations(num1, num2, operator);
            secondaryScreen.innerText = "";
            screen.innerText = result;
            num1 = null;
            operator = null;
            num2 = null;

        }

        //Square Functionality
        else if(button.id === "square" && screen.innerText.length > 0) {
            if(secondaryScreen.innerText.slice(-1) === "+" || secondaryScreen.innerText.slice(-1) === "-" || secondaryScreen.innerText.slice(-1) === "x" || secondaryScreen.innerText.slice(-1) === "÷")
            {
                num2 = parseFloat(screen.innerText) ** 2;
                result = basicOperations(num1, num2, operator);
                secondaryScreen.innerText = "";
                screen.innerText = result;
                num1 = null;
                result = null;
                num2 = null;
                
            }
            else {
                num1 = parseFloat(screen.innerText);
                screen.innerText = num1 ** 2;
                num1 = null;
            }
        }
    })
})

//Keyboard Support
function handleKeyboardInput(key) {
    if(!isNaN(key)){
        screen.innerText += key;
    }

    else if(key === ".") {
        document.getElementById("#point").click();
    }

    else if (key === "Backspace") {
        document.getElementById("delete").click();
    }

    else if(key === "Enter") {
        document.getElementById("equals").click();
    }

    else if(key === "Escape") {
        document.getElementById("clear").click();
    }

    else if(key === "+" || key === "-" || key === "*" || key === "/") {
        const operatorMap = {
            "+" : "add",
            "-" : "subtract",
            "*" : "multiply",
            "/" : "divide"
        }
        const id = operatorMap[key];
        document.getElementById(id).click();
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key;
    handleKeyboardInput(key);
    
})

//Theme Toggle Functionality
function toggleMode() {
    if(lightMode)
    {
        document.body.classList.add("darkTheme");
        lightMode = false;
    } else {
        document.body.classList.remove("darkTheme");
        lightMode = true;
    }
}

themeBtn.addEventListener("click", () => {
    toggleMode();
})