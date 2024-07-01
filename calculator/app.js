document.addEventListener("DOMContentLoaded", () => {
  const getHistory = () => document.getElementById("history-value").innerText;
  const printHistory = (num) =>
    (document.getElementById("history-value").innerText = num);

  const getOutput = () => document.getElementById("output-value").innerText;
  const printOutput = (num) => {
    document.getElementById("output-value").innerText =
      num === "" ? num : getFormattedNumber(num);
  };

  const getFormattedNumber = (num) => {
    if (num === "-") return "";
    return Number(num).toLocaleString("en");
  };

  const reverseNumberFormat = (num) => Number(num.replace(/,/g, ""));

  const operatorElements = document.getElementsByClassName("operator");
  Array.from(operatorElements).forEach((operator) => {
    operator.addEventListener("click", () => handleOperatorClick(operator.id));
  });

  const numberElements = document.getElementsByClassName("number");
  Array.from(numberElements).forEach((number) => {
    number.addEventListener("click", () => handleNumberClick(number.id));
  });

  let lastOperator = null;
  let isOperatorClicked = false;

  const handleOperatorClick = (operator) => {
    let output = getOutput();
    let history = getHistory();

    if (operator === "clear") {
      printHistory("");
      printOutput("");
      lastOperator = null;
    } else if (operator === "backspace") {
      if (output) {
        output = reverseNumberFormat(output).toString().slice(0, -1);
        printOutput(output);
      }
    } else {
      if (output !== "" && !isOperatorClicked) {
        output = reverseNumberFormat(output);
        history += output;
        printHistory(history);
        history += operator;
        printHistory(history);
        isOperatorClicked = true;
      } else if (lastOperator && isOperatorClicked) {
        history = history.slice(0, -1) + operator;
        printHistory(history);
      }
      lastOperator = operator !== "=" ? operator : null;
      if (operator === "=") {
        try {
          const result = eval(history.slice(0, -1));
          printOutput(result);
          printHistory("");
          isOperatorClicked = false;
        } catch (error) {
          printOutput("Error");
          printHistory("");
        }
      } else {
        printOutput("");
      }
    }
  };

  const handleNumberClick = (number) => {
    let output = getOutput();
    if (isOperatorClicked) {
      output = "";
      isOperatorClicked = false;
    }
    output = reverseNumberFormat(output);
    if (!isNaN(output)) {
      output = output + number;
      printOutput(output);
    }
  };
});
